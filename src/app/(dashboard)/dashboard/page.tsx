"use client";

import { useAuth } from "@/hooks/useAuth";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";
import { FiPlusCircle, FiList, FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle
          title={`Welcome back, ${user?.name || "Creator"}!`}
          subtitle="Here is an overview of your creative studio activity, active listings, and bookings."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase">My Listings</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <FiList className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">Active</p>
          <Link href="/my-listings" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-2 inline-block hover:underline">
            Manage spaces →
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase">My Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <FiCalendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">Sessions</p>
          <Link href="/my-bookings" className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2 inline-block hover:underline">
            View schedules →
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase">Pending Requests</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <FiClock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">Pending</p>
          <Link href="/my-bookings" className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-2 inline-block hover:underline">
            Check status →
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase">Quick Action</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <FiPlusCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">Host</p>
          <Link href="/add-studio" className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-2 inline-block hover:underline">
            Add new space →
          </Link>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Have an unused studio or photography stage?</h3>
          <p className="text-sm text-indigo-100 mt-1 max-w-xl">
            List your creative workspace on StudioSpace to connect with verified filmmakers, photographers, and audio engineers.
          </p>
        </div>
        <Link
          href="/add-studio"
          className="px-6 py-3 rounded-xl bg-white text-indigo-700 hover:bg-neutral-100 font-bold text-sm transition shrink-0"
        >
          Add New Studio
        </Link>
      </div>
    </div>
  );
}
