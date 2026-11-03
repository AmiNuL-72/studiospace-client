"use client";

import { useEffect, useState } from "react";
import { Booking } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import SectionTitle from "@/components/shared/SectionTitle";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import InvoiceModal from "@/components/bookings/InvoiceModal";
import { toast } from "sonner";
import {
  FiCalendar,
  FiClock,
  FiXCircle,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400",
  Confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
  Completed: "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400",
};

const statusIcons: Record<string, React.ReactNode> = {
  Pending: <FiAlertCircle className="w-3.5 h-3.5" />,
  Confirmed: <FiCheckCircle className="w-3.5 h-3.5" />,
  Completed: <FiCheckCircle className="w-3.5 h-3.5" />,
  Cancelled: <FiXCircle className="w-3.5 h-3.5" />,
};

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      let res;
      try {
        res = await axiosSecure.get(`/my-bookings?email=${encodeURIComponent(user.email)}`);
      } catch {
        res = await axiosSecure.get(`/bookings/user/${encodeURIComponent(user.email)}`);
      }
      setBookings(res.data?.bookings || res.data?.data || (Array.isArray(res.data) ? res.data : []));
    } catch (err) {
      console.error("Failed to load bookings:", err);
      toast.error("Could not load your bookings. Please verify server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.email]);

  const handleCancelConfirm = async () => {
    if (!cancelId) return;
    try {
      await axiosSecure.patch(`/bookings/${cancelId}`, { status: "Cancelled" });
      toast.success("Booking cancelled successfully.");
      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancelId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch {
      toast.error("Failed to cancel this booking.");
    } finally {
      setCancelId(null);
    }
  };

  return (
    <div>
      <SectionTitle
        title="My Studio Bookings"
        subtitle="View all your reservation history, check current booking status, cancel upcoming sessions, or download invoices."
      />

      {loading ? (
        <SkeletonLoader count={4} type="table-row" />
      ) : bookings.length === 0 ? (
        <EmptyState
          title="No Bookings Yet"
          description="You haven't reserved any creative studio spaces yet. Explore available spaces to get started!"
          ctaText="Explore Studios"
          ctaLink="/studios"
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const canCancel =
              booking.status === "Pending" || booking.status === "Confirmed";

            return (
              <div
                key={booking._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition"
              >

                <div className="w-full sm:w-20 h-32 sm:h-20 rounded-xl bg-neutral-200 dark:bg-neutral-800 overflow-hidden shrink-0">

                  <img
                    src={booking.studioImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=200"}
                    alt={booking.studioTitle}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=200";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white line-clamp-1">
                    {booking.studioTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3.5 h-3.5 text-indigo-500" />
                      {booking.bookingDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3.5 h-3.5 text-indigo-500" />
                      {booking.startTime} – {booking.endTime} ({booking.totalHours}hrs)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        statusColors[booking.status] || statusColors["Pending"]
                      }`}
                    >
                      {statusIcons[booking.status]}
                      {booking.status}
                    </span>
                    <span className="text-sm font-extrabold text-neutral-900 dark:text-white">
                      ${booking.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setInvoiceBooking(booking)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <FiFileText className="w-3.5 h-3.5" />
                    <span>Invoice</span>
                  </button>
                  {canCancel && (
                    <button
                      onClick={() => booking._id && setCancelId(booking._id)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-100 dark:hover:bg-red-950/60 transition"
                    >
                      <FiXCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmationModal
        isOpen={!!cancelId}
        title="Cancel This Booking?"
        message="Are you sure you want to cancel this studio reservation? Cancellation policies may apply depending on the host."
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        isDanger={true}
        onConfirm={handleCancelConfirm}
        onClose={() => setCancelId(null)}
      />

      <InvoiceModal
        booking={invoiceBooking}
        isOpen={!!invoiceBooking}
        onClose={() => setInvoiceBooking(null)}
      />
    </div>
  );
}
