/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useGetReviewsQuery } from "@/redux/features/setting/setting";
import TestimonialCard from "./TestimonialCard";

interface ReviewAuthor {
  name?: string;
  role?: string;
  image?: string;
}

interface ReviewRating {
  value?: number;
  comment?: string;
}

interface Review {
  _id: string;
  author?: ReviewAuthor;
  rating?: ReviewRating;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
}

const WhatOurCommunitySays = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetReviewsQuery(page);

  const reviews = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const testimonials: Testimonial[] = reviews.map((review: Review) => ({
    id: review._id,
    name: review.author?.name || "Anonymous",
    role: review.author?.role || "User",
    rating: review.rating?.value || 0,
    text: review.rating?.comment || "",
    image: review.author?.image || "",
  }));

  const shouldAnimate = testimonials.length >= 10;

  return (
    <div className="responsive-padding py-10 lg:py-20">
      <h2
        className="text-2xl md:text-5xl font-bold text-white mb-6 text-center"
        style={{
          textShadow:
            '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000',
        }}
      >
        What Our Community Says
      </h2>

      <div className="flex justify-center ">
        <h1 className="text-center text-xs  lg:max-w-lg md:text-base lg:text-lg  py-3 text-gray-300 mb-10">
          Join thousands of satisfied users who have advanced their football careers with VISION STRIKER
        </h1>
      </div>

      <div className="w-full bg-black overflow-hidden">
        {/* Top Row - Left to Right */}
        <div className="mb-8 relative">
          <div className={`flex ${shouldAnimate ? "animate-marquee-left hover-pause" : ""}`}>
            {(shouldAnimate
              ? [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials]
              : testimonials
            ).map((testimonial, index) => (
              <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Right to Left - Only when 9+ reviews */}
        {shouldAnimate && (
          <div className="relative">
            <div className="flex animate-marquee-right hover-pause">
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700"
          >
            Next
          </button>
        </div>
      )}

      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
          width: max-content;
        }

        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
          width: max-content;
        }

        .hover-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default WhatOurCommunitySays;