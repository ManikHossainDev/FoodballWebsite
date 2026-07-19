// types.ts
export interface LocateBusinessData {
  name: string;
  contactName: string;
  location: string;
  rating: number;
  image: string;
  photos: string[];
  buttons: string[];
}

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
}

export interface TCoach {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  isAvailable: boolean;
  avgRating: number;
  totalRating: number;
  role?: string;
  profile?: {
    about?: string;
    location?: string;
    experiences?: string;
    coachExperiences?: string;
    areaOfExpertise?: string[];
    coachingPhilosophy?: string;
    consultationFee?: number;
    videoReviewFee?: number;
    service?: {
      title?: string;
      description?: string;
    };
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      x?: string;
    };
  };
}

interface Coach {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}


export interface VideoRequestItem {
  _id: string;
  coach: Coach;
  title: string;
  description: string;
  areaOfFocus: string;
  status: string;
  coachFeedback: string;
  isReviewed: boolean;
  cancelledBy: string | null;
  content: {
    resource_type: string;
    duration: number;
    secure_url: string;
  };
}

export interface ConsultationItem {
  _id: string;
  coach: Coach;
  player: string;
  consultationTopic: string;
  bookingSlot: string;
  questions: string;
  status: string;
  coachFeedback: string;
  isReviewed: boolean;
  meetingLink?: string;
}