"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Studio } from "@/types";
import axiosSecure from "@/lib/axiosSecure";
import SectionTitle from "@/components/shared/SectionTitle";
import StudioForm from "@/components/forms/StudioForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";

export default function EditStudioPage() {
  const params = useParams();
  const router = useRouter();
  const studioId = params.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudio() {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/studios/${studioId}`);
        setStudio(res.data?.data || res.data);
      } catch {
        toast.error("Failed to load studio details for editing.");
        router.push("/my-listings");
      } finally {
        setLoading(false);
      }
    }
    if (studioId) fetchStudio();
  }, [studioId, router]);

  const handleUpdateStudio = async (data: Partial<Studio>) => {
    try {
      const res = await axiosSecure.put(`/studios/${studioId}`, data);
      if (res.status === 200) {
        toast.success("Studio listing updated successfully!");
        router.push("/my-listings");
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to update studio. Please try again.";
      toast.error(msg);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading studio for editing..." />
      </div>
    );
  }

  if (!studio) return null;

  return (
    <div>
      <SectionTitle
        title="Edit Studio Listing"
        subtitle={`Update the details, pricing, and amenities for "${studio.title}".`}
      />

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        <StudioForm
          initialData={studio}
          onSubmit={handleUpdateStudio}
          submitButtonText="Update Studio"
          isEdit={true}
        />
      </div>
    </div>
  );
}
