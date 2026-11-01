export type StudioCategory =
  | "Photo Studio"
  | "Sound Stage"
  | "Podcast Lounge"
  | "Music Suite"
  | "Art Workshop";

export interface HostInfo {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface StudioReview {
  id?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Studio {
  _id?: string;
  title: string;
  category: StudioCategory | string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  images: string[];
  primaryImage: string;
  amenities: string[];
  overview: string;
  rating: number;
  totalReviews?: number;
  reviews?: StudioReview[];
  host: HostInfo;
  ownerEmail: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Booking {
  _id?: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  hourlyRate: number;
  userEmail: string;
  userName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalAmount: number;
  securityDeposit: number;
  status: BookingStatus;
  specialRequests?: string;
  createdAt?: string;
}

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  image?: string;
}

export interface FilterParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "price-asc" | "price-desc" | "rating";
}
