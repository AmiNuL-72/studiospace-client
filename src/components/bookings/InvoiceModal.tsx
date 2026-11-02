"use client";

import { Booking } from "@/types";
import { FiDownload, FiX, FiPrinter } from "react-icons/fi";

interface InvoiceModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({
  booking,
  isOpen,
  onClose,
}: InvoiceModalProps) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto print:border-none print:shadow-none print:m-0 print:p-0">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white print:hidden"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
              Studio<span className="text-indigo-600">Space</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-1">Official Booking Invoice & Receipt</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
              {booking.status}
            </span>
            <p className="text-xs text-neutral-400 mt-1">Invoice ID: #{booking._id?.slice(-8) || "INV-001"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs mb-6">
          <div>
            <p className="text-neutral-400 font-semibold uppercase">Billed To</p>
            <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-1">{booking.userName}</p>
            <p className="text-neutral-500">{booking.userEmail}</p>
          </div>
          <div className="text-right">
            <p className="text-neutral-400 font-semibold uppercase">Booking Date</p>
            <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-1">{booking.bookingDate}</p>
            <p className="text-neutral-500">{booking.startTime} - {booking.endTime}</p>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 mb-6">
          <p className="text-xs text-neutral-400 uppercase font-semibold">Reserved Space</p>
          <h4 className="font-bold text-neutral-900 dark:text-white text-base mt-1">
            {booking.studioTitle}
          </h4>
          <div className="mt-4 border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Hourly Rate:</span>
              <span>${booking.hourlyRate} / hr</span>
            </div>
            <div className="flex justify-between">
              <span>Total Hours:</span>
              <span>{booking.totalHours} hrs</span>
            </div>
            {booking.securityDeposit ? (
              <div className="flex justify-between">
                <span>Refundable Deposit:</span>
                <span>${booking.securityDeposit}</span>
              </div>
            ) : null}
            <div className="flex justify-between font-extrabold text-base border-t border-neutral-200 dark:border-neutral-700 pt-2 text-indigo-600 dark:text-indigo-400">
              <span>Total Paid:</span>
              <span>${booking.totalAmount + (booking.securityDeposit || 0)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <FiPrinter className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
          >
            <FiDownload className="w-4 h-4" />
            <span>Download Receipt PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
