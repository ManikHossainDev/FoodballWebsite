/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { CreditCard, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useAddMoneyMutation, useGetProfileQuery, useGetWalletQuery } from '@/redux/features/Profile/Profile';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import Image from 'next/image';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  completed: 'bg-green-500/15 text-green-400 border-green-500/30',
  success: 'bg-green-500/15 text-green-400 border-green-500/30',
  failed: 'bg-red-500/15 text-red-400 border-red-500/30',
  cancelled: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

const CouchWallet = () => {
  const user = useSelector(selectCurrentUser);
  const UserId = user?._id;
  const { data: singleUser } = useGetProfileQuery({});
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isFetching } = useGetWalletQuery({ page, limit });
  const walletData = data as any;
  const allTransactions = walletData?.data?.data ?? [];
  const pagination = walletData?.data?.pagination;

  const transactions = allTransactions.filter(
    (tx: any) => tx.sender?._id === UserId || tx.receiver?._id === UserId
  );

  const goToPage = (p: number) => {
    if (!pagination) return;
    if (p < 1 || p > pagination.totalPages) return;
    setPage(p);
  };

  const [AddMoney, { isLoading: isAddingMoney }] = useAddMoneyMutation();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState<number>(20);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddMoney = async () => {
    setErrorMsg(null);
    if (!amount || amount <= 0) {
      setErrorMsg('Please enter a valid amount.');
      return;
    }
    try {
      const res: any = await AddMoney({ amount }).unwrap();
      const checkoutUrl = res?.data?.url;
      if (checkoutUrl) {
        // Redirect the browser to the Stripe checkout session
        window.location.href = checkoutUrl;
      } else {
        setErrorMsg('No checkout URL returned from server.');
      }
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="text-white">
      {/* Header: Balance + Add Balance card */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <p className="text-gray-400 text-sm mb-2">
            My Account <span className="text-gray-600">/</span>{' '}
            <span className="text-gray-300">Total Balance</span>
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-[2.25rem] font-bold text-white leading-none">
              ${singleUser?.data?.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h1>
            <span className="bg-violet-500/15 text-violet-300 border border-violet-500/30 text-xs font-medium px-3 py-1 rounded-full">
              USD
            </span>
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-5 py-4 flex items-center justify-between gap-6 w-full xl:w-[35%]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-red-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-semibold text-sm">Add Balance</h3>
              <p className="text-gray-400 text-xs mt-0.5 leading-snug">
                Add balance to your wallet to continue all the transactions
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setErrorMsg(null);
              setAmount(20);
              setShowModal(true);
            }}
            className="text-sm px-5 py-2.5 whitespace-nowrap transition-colors flex-shrink-0 rounded-md bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]"
          >
            Add Balance
          </button>
        </div>
      </div>

      {/* Add Balance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl w-full max-w-sm p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-white font-semibold text-lg mb-1">Add Balance</h3>
            <p className="text-gray-400 text-xs mb-5">
              Enter the amount you want to add to your wallet.
            </p>

            <label className="text-gray-400 text-xs mb-1 block">Amount (USD)</label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-[#111111] border border-[#2a2a2a] rounded-md px-3 py-2 text-white text-sm mb-2 outline-none focus:border-red-400"
            />

            {errorMsg && (
              <p className="text-red-400 text-xs mb-2">{errorMsg}</p>
            )}

            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 text-sm px-4 py-2.5 rounded-md border border-[#2a2a2a] text-gray-300 hover:bg-[#1a1a1a]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                disabled={isAddingMoney}
                className="flex-1 text-sm px-4 py-2.5 rounded-md bg-red-500/15 border border-red-500/30 text-red-400 font-semibold disabled:opacity-50"
              >
                {isAddingMoney ? 'Processing...' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-4">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2 w-12">Profile</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Name</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Service Type</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Amount</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Status</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-6 px-2 text-center text-gray-400 text-sm">
                    Loading transactions...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 px-2 text-center text-gray-400 text-sm">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx: any) => {
                  const isSender = tx.sender?._id === UserId;
                  const otherParty = isSender ? tx.receiver : tx.sender;

                  return (
                    <tr
                      key={tx._id}
                      className="border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <td className="py-4 px-2">
                        <div className="relative w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {otherParty?.image ? (
                            <Image
                              src={otherParty.image}
                              alt={otherParty?.name ?? 'user'}
                              fill
                              sizes="28px"
                              className="object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <CreditCard className="w-3.5 h-3.5 text-red-400" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-white text-sm">{otherParty?.name}</td>
                      <td className="py-4 px-2 text-gray-400 text-sm">{tx.description}</td>
                      <td
                        className={`py-4 px-2 text-sm font-medium ${
                          isSender ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        {isSender ? '-' : '+'}${tx.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                            statusStyles[tx.status] ?? 'bg-gray-500/15 text-gray-400 border-gray-500/30'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-gray-400 text-sm">{formatDate(tx.createdAt)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-end mt-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(pagination.page - 1)}
                disabled={pagination.page <= 1 || isFetching}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-[#2a2a2a] text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a1a1a]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  disabled={isFetching}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                    p === pagination.page
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : 'text-gray-300 border border-[#2a2a2a] hover:bg-[#1a1a1a]'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goToPage(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages || isFetching}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-[#2a2a2a] text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a1a1a]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouchWallet;