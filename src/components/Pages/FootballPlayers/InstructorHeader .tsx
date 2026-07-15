/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, Check, X } from "lucide-react";
import { FaRegMessage } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import user from "@/assets/Authentication/user.jpg";
import { useGetReviewsForAUserQuery, useGetSingleCoachesQuery } from "@/redux/features/player/hireCoachs";
import { TCoach } from "@/types/types";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface Service {
  title: string;
  description?: string;
  duration?: string;
  price: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface SocialLink {
  url?: string;
  icon: React.JSX.Element;
  label: string;
}

/* -------------------------------------------------------------------------- */
/*  Static data                                                               */
/*  Reviews are intentionally the ONLY static data in this component.        */
/*  Everything else is rendered directly from the coach API response.        */
/*  Swap this for a real reviews endpoint (e.g. coach.profile.reviews) once  */
/*  the backend exposes one.                                                 */
/* -------------------------------------------------------------------------- */

const STATIC_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Alex W",
    rating: 5,
    comment:
      "Outstanding coach! Really helped me improve my explosiveness and finisher instinct.",
    date: "Oct 15, 2025",
  },
  {
    id: "2",
    name: "Jordan P",
    rating: 5,
    comment:
      "Very detailed analysis. The coach pointed out things I never noticed before.",
    date: "Oct 15, 2025",
  },
  {
    id: "3",
    name: "Jordan P",
    rating: 5,
    comment:
      "Very detailed analysis. The coach pointed out things I never noticed before.",
    date: "Oct 10, 2025",
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function buildServices(coach: TCoach): Service[] {
  const services: Service[] = [];

  if (coach.profile?.videoReviewFee != null) {
    services.push({
      title: "Video Review",
      description: coach.profile?.service?.description,
      price: `$${coach.profile.videoReviewFee}/session`,
    });
  }

  if (coach.profile?.service?.title) {
    services.push({
      title: "Consultation Fee",
      description: coach.profile?.service?.description,
      price: `$${coach.profile?.consultationFee ?? 0}/session`,
    });
  }

  return services;
}

/* -------------------------------------------------------------------------- */
/*  Presentational sub-components                                             */
/* -------------------------------------------------------------------------- */

const LoadingState = () => (
  <p className="text-gray-400 text-center py-10">Loading coach details...</p>
);

const ErrorState = () => (
  <p className="text-red-400 text-center py-10">Failed to load coach details.</p>
);

const CoachHeader = ({ coach }: { coach: TCoach }) => (
  <div className="bg-[#303030] px-6 py-4 lg:flex items-center justify-between rounded-lg mb-6">
    {/* Profile info */}
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
        <Image
          src={coach.image || user}
          fill
          alt={coach.name}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-white font-semibold text-lg">{coach.name}</h2>
        {coach.profile?.location && (
          <p className="text-gray-400 text-sm">{coach.profile.location}</p>
        )}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-medium">{coach.avgRating}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Actions */}
    <div>
      <div className="flex space-x-2 py-2 justify-end">
        <button
          type="button"
          aria-label="Message coach"
          className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
        >
          <FaRegMessage className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex items-center justify-between lg:justify-end gap-3">
        <Link href="/HireCoach/requestreview">
          <button
            type="button"
            className="border-red-500 border text-[10px] md:text-lg hover:bg-red-600 text-white font-medium px-2 md:px-6 py-2.5 rounded transition-colors"
          >
            Request Review
          </button>
        </Link>

        <Link href="/HireCoach/bookconsultation">
          <button
            type="button"
            className="text-[10px] md:text-lg bg-red-500 hover:bg-red-600 text-white font-medium px-2 md:px-6 py-2.5 rounded border border-gray-600 transition-colors"
          >
            Book Consultation
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const AboutSection = ({ coach }: { coach: TCoach }) => {
  const expertise: string[] = coach.profile?.areaOfExpertise ?? [];

  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">About</h3>
      {coach.profile?.about && (
        <p className="text-gray-300 text-sm md:text-lg lg:text-xl leading-relaxed mb-6">
          {coach.profile.about}
        </p>
      )}

      {expertise.length > 0 && (
        <>
          <h4 className="text-lg font-semibold mb-4">Areas of Expertise:</h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {expertise.map((skill) => (
              <div
                key={skill}
                className="flex bg-[#3F3F3F] rounded-md hover:shadow p-1 items-center gap-2 text-gray-300 text-sm md:text-lg lg:text-xl"
              >
                <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {coach.profile?.coachExperiences && (
        <>
          <h4 className="text-lg font-semibold mb-4">Coaching Experience:</h4>
          <ul className="space-y-2 text-gray-300 text-sm md:text-lg lg:text-xl list-disc list-inside mb-6">
            <li>{coach.profile.coachExperiences}</li>
          </ul>
        </>
      )}

      {coach.profile?.coachingPhilosophy && (
        <>
          <h4 className="text-lg font-semibold mb-4">Coaching Philosophy:</h4>
          <p className="text-gray-300 text-sm md:text-lg lg:text-xl leading-relaxed">
            {coach.profile.coachingPhilosophy}
          </p>
        </>
      )}

      <br />
       <SocialLinks coach={coach} />
    </div>
  );
};

const ServicesOffered = ({ services }: { services: Service[] }) => {
  if (services.length === 0) return null;

  return (
  <div className="pb-4">
    <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.title} className="bg-[#3F3F3F] rounded-md p-2 md:p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{service.title}</h4>
            <span className="text-white font-semibold">{service.price}</span>
          </div>
          {service.description && (
            <p className="text-gray-400 text-sm mb-2">{service.description}</p>
          )}
          <div className="flex items-center justify-between">
            {service.duration && (
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <Check className="w-3 h-3" />
                {service.duration}
              </span>
            )}
            {/* <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors ml-auto"
            >
              Book Now
            </button> */}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

const RecentReviews = ({ reviews }: { reviews: Review[] }) => (
  <div className="pb-4">
    <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-[#3F3F3F] p-2 rounded-md">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold">{review.name}</span>
            <span className="text-gray-500 text-xs">{review.date}</span>
          </div>
          <div className="flex gap-1 mb-2">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  </div>
);

const SocialLinks = ({ coach }: { coach: TCoach }) => {
  const socialMedia = coach.profile?.socialMedia;

  const links: SocialLink[] = [
    {
      url: socialMedia?.facebook,
      icon: <FaFacebookF className="w-5 h-5 text-white" />,
      label: "Facebook",
    },
    {
      url: socialMedia?.instagram,
      icon: <FaInstagram className="w-5 h-5 text-white" />,
      label: "Instagram",
    },
    {
      url: socialMedia?.linkedin,
      icon: <FaLinkedinIn className="w-5 h-5 text-white" />,
      label: "LinkedIn",
    },
    {
      url: socialMedia?.x,
      icon: <X className="w-5 h-5 text-white" />,
      label: "X",
    },
  ].filter((link): link is SocialLink & { url: string } => Boolean(link.url));

  if (links.length === 0) return null;

  return (
    <div className="flex justify-center gap-3 pb-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="w-10 h-10 bg-[#6b6969c2] hover:bg-gray-700 rounded flex items-center justify-center transition-colors"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

const InstructorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleCoachesQuery(id);
  const coach: TCoach | undefined = data?.data;
  const {data:Reviews} = useGetReviewsForAUserQuery(id);
  console.log(Reviews)

  if (isLoading) return <LoadingState />;
  if (isError || !coach) return <ErrorState />;

  const services = buildServices(coach);
  const reviews = STATIC_REVIEWS;

  return (
    <div className="text-white">
      <CoachHeader coach={coach} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6  rounded-lg ">
          <AboutSection coach={coach} />
        </div>

        <div className="space-y-6">
          <div className="bg-[#303030] rounded-lg p-6">
            <ServicesOffered services={services} />
            <RecentReviews reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;