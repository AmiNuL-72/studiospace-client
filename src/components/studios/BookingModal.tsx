"use client";

import { useState } from "react";
import { Studio } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import { toast } from "sonner";
import { FiX, FiClock, FiCalendar, FiDollarSign } from "react-icons/fi";

interface BookingModalProps {
  studio: Studio;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingModal({
  studio,
  isOpen,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const { user } = useAuth();
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("13:00");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const startHour = parseInt(startTime.split(":")[0], 10);
  const endHour = parseInt(endTime.split(":")[0], 10);
  const totalHours = Math.max(1, endHour - startHour);
  const totalAmount = totalHours * studio.hourlyRate;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first to reserve this studio space.");
      return;
    }

    if (!bookingDate) {
      toast.error("Please select a reservation date.");
      return;
    }

    if (endHour <= startHour) {
      toast.error("End time must be after start time.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        studioId: studio._id,
        studioTitle: studio.title,
        studioImage: studio.primaryImage || studio.images?.[0] || "",
        hourlyRate: studio.hourlyRate,
        userEmail: user.email,
        userName: user.name,
        bookingDate,
        startTime,
        endTime,
        totalHours,
        totalAmount,
        securityDeposit: studio.securityDeposit || 0,
        specialRequests,
        status: "Pending",
      };

      const res = await axiosSecure.post("/bookings", payload);
      if (res.status === 201 || res.status === 200) {
        toast.success("Reservation request submitted! Status is Pending.");
        onClose();
        if (onSuccess) onSuccess();
      }
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Booking collision or server error. Please choose a different slot.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
        >
          <FiX className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
          Reserve Studio Space
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          {studio.title} • ${studio.hourlyRate}/hr
        </p>

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4 text-indigo-500" />
              Shoot Date
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500 text-neutral-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <FiClock className="w-4 h-4 text-indigo-500" />
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500 text-neutral-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <FiClock className="w-4 h-4 text-indigo-500" />
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500 text-neutral-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Production Notes or Special Requests
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Need sound engineer, green screen setup, or gear load-in details..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500 text-neutral-900 dark:text-white"
            />
          </div>

          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <span>Duration:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">{totalHours} hours</span>
            </div>
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <span>Rate (${studio.hourlyRate} x {totalHours} hrs):</span>
              <span className="font-semibold text-neutral-900 dark:text-white">${totalAmount}</span>
            </div>
            {studio.securityDeposit ? (
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Refundable Deposit:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">${studio.securityDeposit}</span>
              </div>
            ) : null}
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 flex justify-between font-bold text-neutral-900 dark:text-white">
              <span>Total Estimated:</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                ${totalAmount + (studio.securityDeposit || 0)}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Confirm Reservation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
