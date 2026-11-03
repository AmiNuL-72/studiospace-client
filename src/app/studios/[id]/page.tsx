"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Studio } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import axiosPublic from "@/lib/axiosPublic";
import axiosSecure from "@/lib/axiosSecure";
import BookingModal from "@/components/studios/BookingModal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";
import {
  FiMapPin,
  FiStar,
  FiUsers,
  FiDollarSign,
  FiShield,
  FiCheckCircle,
  FiCalendar,
  FiHeart,
  FiShare2,
  FiArrowLeft,
} from "react-icons/fi";
import Link from "next/link";

export default function StudioDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const studioId = params.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    async function fetchStudio() {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/studios/${studioId}`);
        setStudio(res.data?.data || res.data);
      } catch {
        toast.error("Studio not found or failed to load.");
        router.push("/studios");
      } finally {
        setLoading(false);
      }
    }
    if (studioId) fetchStudio();
  }, [studioId, router]);

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.error("Please login to save studios.");
      return;
    }
    try {
      if (wishlisted) {
        await axiosSecure.delete(`/wishlist/${studioId}`);
        toast.success("Removed from wishlist.");
      } else {
        await axiosSecure.post("/wishlist", { studioId, userEmail: user.email });
        toast.success("Added to wishlist!");
      }
      setWishlisted(!wishlisted);
    } catch {
      toast.error("Failed to update wishlist.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to leave a review.");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please write a review comment.");
      return;
    }
    try {
      setSubmittingReview(true);
      await axiosSecure.post(`/studios/${studioId}/reviews`, {
        userId: user.id || user.email,
        userName: user.name,
        userAvatar: user.image || "",
        rating: reviewRating,
        comment: reviewComment,
      });
      toast.success("Review submitted successfully!");
      setReviewComment("");
      setReviewRating(5);

      const res = await axiosPublic.get(`/studios/${studioId}`);
      setStudio(res.data?.data || res.data);
    } catch {
      toast.error("Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: studio?.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading studio details..." />
      </div>
    );
  }

  if (!studio) return null;

  const isOwner = user?.email === studio.ownerEmail;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <Link
        href="/studios"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6 transition"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back to Explore</span>
      </Link>

      <div className="relative w-full h-64 sm:h-80 lg:h-[420px] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-8">

        <img
          src={studio.primaryImage || studio.images?.[0] || studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920"}
          alt={studio.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920";
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-neutral-900/70 text-white backdrop-blur-md border border-white/10">
            {studio.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleToggleWishlist}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-red-500 transition shadow"
          >
            <FiHeart className={`w-5 h-5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-indigo-600 transition shadow"
          >
            <FiShare2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">

          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
                <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{studio.rating?.toFixed(1) || "5.0"}</span>
              </div>
              {studio.totalReviews ? (
                <span className="text-xs text-neutral-500">({studio.totalReviews} reviews)</span>
              ) : null}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {studio.title}
            </h1>
            <p className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mt-3">
              <FiMapPin className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{studio.location}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
              <FiDollarSign className="w-5 h-5 mx-auto text-indigo-500 mb-1" />
              <p className="text-xl font-black text-neutral-900 dark:text-white">${studio.hourlyRate}</p>
              <p className="text-xs text-neutral-500">per hour</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
              <FiUsers className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <p className="text-xl font-black text-neutral-900 dark:text-white">{studio.maxCapacity}</p>
              <p className="text-xs text-neutral-500">max crew</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
              <FiShield className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <p className="text-xl font-black text-neutral-900 dark:text-white">${studio.securityDeposit || 0}</p>
              <p className="text-xs text-neutral-500">deposit</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
              <FiStar className="w-5 h-5 mx-auto text-yellow-500 mb-1" />
              <p className="text-xl font-black text-neutral-900 dark:text-white">{studio.rating?.toFixed(1) || "5.0"}</p>
              <p className="text-xs text-neutral-500">rating</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
              About This Studio
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
              {studio.overview || "No detailed description provided."}
            </p>
          </div>

          {studio.amenities && studio.amenities.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                Included Amenities & Gear
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {studio.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm"
                  >
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
              Hosted By
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl border-2 border-indigo-200 dark:border-indigo-800 overflow-hidden">
                {studio.host?.avatar ? (

                  <img src={studio.host.avatar} alt={studio.host.name} className="w-full h-full object-cover" />
                ) : (
                  studio.host?.name?.charAt(0).toUpperCase() || "H"
                )}
              </div>
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">{studio.host?.name || "Host"}</p>
                <p className="text-xs text-neutral-500">{studio.host?.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
              Reviews & Ratings
            </h2>

            {studio.reviews && studio.reviews.length > 0 ? (
              <div className="space-y-4 mb-8">
                {studio.reviews.map((review, idx) => (
                  <div
                    key={review.id || idx}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-300 overflow-hidden">
                          {review.userAvatar ? (

                            <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                          ) : (
                            review.userName?.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-900 dark:text-white">{review.userName}</p>
                          <p className="text-xs text-neutral-400">
                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                        <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 mb-6">No reviews yet. Be the first to review!</p>
            )}

            {user && !isOwner && (
              <form
                onSubmit={handleReviewSubmit}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4"
              >
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Leave a Review</h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <FiStar
                          className={`w-6 h-6 cursor-pointer transition ${
                            star <= reviewRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300 dark:text-neutral-700"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-neutral-500">{reviewRating}/5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience booking this studio..."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500 text-neutral-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-50"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-neutral-900 dark:text-white">${studio.hourlyRate}</span>
                <span className="text-sm text-neutral-500 font-medium">/ hour</span>
              </div>
              {studio.securityDeposit ? (
                <p className="text-xs text-neutral-400 mb-6">
                  + ${studio.securityDeposit} refundable security deposit
                </p>
              ) : (
                <p className="text-xs text-neutral-400 mb-6">No security deposit required</p>
              )}

              {isOwner ? (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 p-3 rounded-xl text-center">
                    You are the owner of this space. You cannot book your own studio.
                  </p>
                  <Link
                    href={`/studios/edit/${studio._id}`}
                    className="w-full block text-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition"
                  >
                    Edit Studio Details
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login to reserve this space.");
                      return;
                    }
                    setBookingOpen(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <FiCalendar className="w-4 h-4" />
                  <span>Reserve This Space</span>
                </button>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Category</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{studio.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Max Crew</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{studio.maxCapacity} people</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Amenities</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{studio.amenities?.length || 0} included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        studio={studio}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onSuccess={() => {
          setBookingOpen(false);
        }}
      />
    </div>
  );
}
