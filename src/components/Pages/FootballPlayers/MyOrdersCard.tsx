/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAddRateReviewConsultationMutation,
  useAddRateReviewVideoMutation,
  useGetConsultationQuery,
  useGetVideoRequestQuery,
} from '@/redux/features/player/MyOrders';
import { ConsultationItem, VideoRequestItem } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';

type OrderCategory = 'videoRequest' | 'consultations';

interface Tab {
  id: OrderCategory;
  label: string;
  count: number;
}

const STATUS_OPTIONS = ['pending', 'accept', 'decline', 'started', 'cancelled', 'completed'];

// ---------- Component ----------

const PAGE_LIMIT = 10;

const MyOrdersCard = () => {
  const [activeTab, setActiveTab] = useState<OrderCategory>('videoRequest');
  const [statusFilter, setStatusFilter] = useState<string>(STATUS_OPTIONS[0]);
  const [videoPage, setVideoPage] = useState(1);
  const [consultationPage, setConsultationPage] = useState(1);

  const currentPage = activeTab === 'videoRequest' ? videoPage : consultationPage;
  const setCurrentPage = activeTab === 'videoRequest' ? setVideoPage : setConsultationPage;

  const handleTabChange = (tab: OrderCategory) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setVideoPage(1);
    setConsultationPage(1);
  };

  // Rating modal state
  const [ratingModal, setRatingModal] = useState<{
    open: boolean;
    type: OrderCategory | null;
    id: string | null;
  }>({ open: false, type: null, id: null });
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState('');

  // Details modal state
  const [detailsModal, setDetailsModal] = useState<{
    open: boolean;
    type: OrderCategory | null;
    item: VideoRequestItem | ConsultationItem | null;
  }>({ open: false, type: null, item: null });

  const openDetailsModal = (type: OrderCategory, item: VideoRequestItem | ConsultationItem) => {
    setDetailsModal({ open: true, type, item });
  };

  const closeDetailsModal = () => {
    setDetailsModal({ open: false, type: null, item: null });
  };

  const { data: videoRequestData, isLoading: videoLoading } = useGetVideoRequestQuery({
    page: videoPage,
    limit: PAGE_LIMIT,
    status: statusFilter,
  });
  const { data: consultationData, isLoading: consultationLoading } = useGetConsultationQuery({
    page: consultationPage,
    limit: PAGE_LIMIT,
    status: statusFilter,
  });

  const videoRequests: VideoRequestItem[] = videoRequestData?.data ?? [];
  const consultations: ConsultationItem[] = consultationData?.data ?? [];
  

  // Adjust these two lines if your API's pagination meta uses different field names
  const videoMeta = videoRequestData?.meta ?? { total: videoRequests.length, totalPage: 1 };
  const consultationMeta = consultationData?.meta ?? { total: consultations.length, totalPage: 1 };
  const currentMeta = activeTab === 'videoRequest' ? videoMeta : consultationMeta;
  const totalPages = Math.max(1, currentMeta.totalPage ?? Math.ceil((currentMeta.total ?? 1) / PAGE_LIMIT));

  const [addRateReviewConsultation, { isLoading: submittingConsultationReview }] =
    useAddRateReviewConsultationMutation();
  const [addRateReviewVideo, { isLoading: submittingVideoReview }] =
    useAddRateReviewVideoMutation();

  const tabs: Tab[] = [
    { id: 'videoRequest', label: 'Video Request', count: videoRequests.length },
    { id: 'consultations', label: 'Consultation', count: consultations.length },
  ];

  const openRatingModal = (type: OrderCategory, id: string) => {
    setRatingValue(5);
    setRatingComment('');
    setRatingModal({ open: true, type, id });
  };

  const closeRatingModal = () => {
    setRatingModal({ open: false, type: null, id: null });
  };

  const submitRating = async () => {
    if (!ratingModal.id || !ratingModal.type) return;
    const body = { value: ratingValue, comment: ratingComment };

    try {
      if (ratingModal.type === 'videoRequest') {
        await addRateReviewVideo({ id: ratingModal.id, data: body }).unwrap();
      } else {
        await addRateReviewConsultation({ id: ratingModal.id, data: body }).unwrap();
      }
      closeRatingModal();
    } catch (err:any) {
      console.error('Failed to submit review', err?.data?.message);
      Swal.fire({
      title: "Something",
      text: `${err?.data?.message}`,
      icon: "error"
    });

    }
  };

  const isLoading = activeTab === 'videoRequest' ? videoLoading : consultationLoading;

  return (
    <div className="bg-[#303030] p-1 md:p-4 rounded-md">
      <div>
        {/* Tabs + filter */}
        <div className="flex justify-between mb-6 bg-[#1F1F1F]  py-3 px-1 md:px-3 rounded-lg">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-1 text-[10px] md:text-md md:px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-gray-800 text-gray-200 text-sm rounded-md px-1 md:px-3 py-2"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading...</p>
          </div>
        )}

        {/* Video Request cards */}
        {!isLoading && activeTab === 'videoRequest' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {videoRequests.map((item) => (
              <div
                key={item._id}
                className="bg-[#1F1F1F]  rounded-lg overflow-hidden border border-gray-700"
              >
                <div className="p-4 border-b border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">Coach: {item.coach?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm capitalize">{item.status}</p>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-gray-300 text-sm mt-2">{item.description}</p>
                  )}
                </div>

                <div className="p-4 space-x-2 flex">
                  <button
                    onClick={() => openDetailsModal('videoRequest', item)}
                    className="block w-full text-center bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded transition-colors"
                  >
                    View Details
                  </button>

                  {item.status === 'completed' &&
                      <button
                        onClick={() => openRatingModal('videoRequest', item._id)}
                        disabled={item.isReviewed}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500"
                      >
                        {item.isReviewed ? '★ Reviewed' : '★ Rate & Review'}
                      </button>
                    }
                </div>
              </div>
            ))}

            {videoRequests.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No video requests in this category</p>
              </div>
            )}
          </div>
        )}

        {/* Consultation cards */}
        {!isLoading && activeTab === 'consultations' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {consultations.map((item) => (
              <div
                key={item._id}
                className="bg-[#1F1F1F]  rounded-lg overflow-hidden border border-gray-700"
              >
                <div className="p-4 border-b border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {item.consultationTopic}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">Coach: {item.coach?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm capitalize">{item.status}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-400">Booking Slot</span>
                    <span className="text-white">
                      {new Date(item.bookingSlot).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-x-2 flex s">
                  <button
                    onClick={() => openDetailsModal('consultations', item)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded transition-colors"
                  >
                    View Details
                  </button>

                  {item.status === 'completed' &&
                      <button
                        onClick={() => openRatingModal('consultations', item._id)}
                        disabled={item.isReviewed}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500"
                      >
                        {item.isReviewed ? '★ Reviewed' : '★ Rate & Review'}
                      </button>
                  }
                </div>
              </div>
            ))}

            {consultations.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No consultations in this category</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  p === currentPage
                    ? 'bg-white text-red-500 shadow-[0_0_10px_rgba(255,0,0,0.4)]'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {detailsModal.open && detailsModal.item && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2">
          <div className="bg-[#1F1F1F]  rounded-lg p-4 w-full max-w-md max-h-[75vh] overflow-y-auto scroll-hide">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-semibold text-lg">
                {detailsModal.type === 'videoRequest' ? 'Video Request Details' : 'Consultation Details'}
              </h3>
              <button
                onClick={closeDetailsModal}
                className="text-gray-400 hover:text-white text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Image
                width={500}
                height={500}
                src={detailsModal.item.coach?.image}
                alt={detailsModal.item.coach?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-white text-sm font-medium">{detailsModal.item.coach?.name}</p>
                <p className="text-gray-400 text-xs">{detailsModal.item.coach?.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-white capitalize">{detailsModal.item.status}</span>
              </div>

              {detailsModal.type === 'videoRequest' ? (
                <>
                  <div>
                    <p className="text-gray-400 mb-1">Title</p>
                    <p className="text-white">{(detailsModal.item as VideoRequestItem).title}</p>
                  </div>
                  {(detailsModal.item as VideoRequestItem).description && (
                    <div>
                      <p className="text-gray-400 mb-1">Description</p>
                      <p className="text-white">{(detailsModal.item as VideoRequestItem).description}</p>
                    </div>
                  )}
                  {(detailsModal.item as VideoRequestItem).areaOfFocus && (
                    <div>
                      <p className="text-gray-400 mb-1">Area of Focus</p>
                      <p className="text-white">{(detailsModal.item as VideoRequestItem).areaOfFocus}</p>
                    </div>
                  )}
                  {(detailsModal.item as VideoRequestItem).content?.secure_url && (
                    <div className=''>
                      <p className="text-gray-400 mb-1">Video</p>
                      <video
                        src={(detailsModal.item as VideoRequestItem).content.secure_url}
                        controls
                        className="w-full  rounded-md"
                      />
                    </div>
                  )}
                  {(detailsModal.item as VideoRequestItem).coachFeedback && (
                    <div>
                      <p className="text-gray-400 mb-1">Coach Feedback</p>
                      <p className="text-white">{(detailsModal.item as VideoRequestItem).coachFeedback}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-400 mb-1">Topic</p>
                    <p className="text-white">{(detailsModal.item as ConsultationItem).consultationTopic}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Booking Slot</p>
                    <p className="text-white">
                      {new Date((detailsModal.item as ConsultationItem).bookingSlot).toLocaleString()}
                    </p>
                  </div>
                  {(detailsModal.item as ConsultationItem).questions && (
                    <div>
                      <p className="text-gray-400 mb-1">Questions</p>
                      <p className="text-white">{(detailsModal.item as ConsultationItem).questions}</p>
                    </div>
                  )}
                  {(detailsModal.item as ConsultationItem).coachFeedback && (
                    <div>
                      <p className="text-gray-400 mb-1">Coach Feedback</p>
                      <p className="text-white">{(detailsModal.item as ConsultationItem).coachFeedback}</p>
                    </div>
                  )}
                  {((detailsModal.item as ConsultationItem).meetingLink ?? '') && (
                    <Link
                      href={(detailsModal.item as ConsultationItem).meetingLink as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded transition-colors mt-2"
                    >
                      Join Meeting
                    </Link>
                  )}
                </>
              )}
            </div>

            <button
              onClick={closeDetailsModal}
              className="w-full mt-5 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {ratingModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1F1F1F]  rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold text-lg mb-4">Rate & Review</h3>

            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRatingValue(n)}
                  className={`text-2xl ${n <= ratingValue ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full bg-gray-800 text-white text-sm rounded-md p-3 mb-4 min-h-[100px]"
            />

            <div className="flex gap-2">
              <button
                onClick={closeRatingModal}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                disabled={submittingConsultationReview || submittingVideoReview}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded transition-colors disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersCard;


