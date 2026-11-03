"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Studio } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import SectionTitle from "@/components/shared/SectionTitle";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiPlus, FiMapPin, FiEye } from "react-icons/fi";

export default function MyListingsPage() {
  const { user } = useAuth();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMyListings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      let res;
      try {
        res = await axiosSecure.get(`/my-studios?email=${encodeURIComponent(user.email)}`);
      } catch {
        res = await axiosSecure.get(`/studios/owner/${encodeURIComponent(user.email)}`);
      }
      setStudios(res.data?.studios || res.data?.data || (Array.isArray(res.data) ? res.data : []));
    } catch (err) {
      console.error("Failed to load my studios", err);
      toast.error("Could not load your listings. Please verify server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, [user?.email]);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await axiosSecure.delete(`/studios/${deleteId}`);
      toast.success("Studio listing removed successfully.");
      setStudios((prev) => prev.filter((s) => s._id !== deleteId));
    } catch {
      toast.error("Could not delete studio listing.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <SectionTitle
          title="My Studio Listings"
          subtitle="Manage, edit, or delete the creative production spaces you have listed on StudioSpace."
          className="mb-0"
        />
        <Link
          href="/add-studio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Studio</span>
        </Link>
      </div>

      {loading ? (
        <SkeletonLoader count={4} type="table-row" />
      ) : studios.length === 0 ? (
        <EmptyState
          title="No Studio Listings Yet"
          description="You haven't listed any creative workspaces yet. Start hosting your space to earn income!"
          ctaText="Add Your First Studio"
          ctaLink="/add-studio"
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
          <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-300">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-xs uppercase font-semibold text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="px-6 py-4">Studio Space</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Rate</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {studios.map((studio) => (
                <tr key={studio._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-800 overflow-hidden shrink-0">

                        <img
                          src={studio.primaryImage || studio.images?.[0] || studio.image || ""}
                          alt={studio.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-white line-clamp-1">
                        {studio.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {studio.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">
                    ${studio.hourlyRate}/hr
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-xs text-neutral-500 line-clamp-1">
                      <FiMapPin className="shrink-0 text-indigo-500" />
                      {studio.location}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/studios/${studio._id}`}
                        aria-label="View public page"
                        className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                      >
                        <FiEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/studios/edit/${studio._id}`}
                        aria-label="Edit studio"
                        className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => studio._id && setDeleteId(studio._id)}
                        aria-label="Delete studio"
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Studio Space?"
        message="Are you sure you want to delete this studio listing? This action cannot be reversed and all current information will be removed."
        confirmText="Yes, Delete Listing"
        cancelText="Keep Listing"
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
