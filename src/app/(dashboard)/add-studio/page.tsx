"use client";

import { useRouter } from "next/navigation";
import SectionTitle from "@/components/shared/SectionTitle";
import StudioForm from "@/components/forms/StudioForm";
import axiosSecure from "@/lib/axiosSecure";
import { toast } from "sonner";
import { Studio } from "@/types";

export default function AddStudioPage() {
  const router = useRouter();

  const handleCreateStudio = async (data: Partial<Studio>) => {
    try {
      const res = await axiosSecure.post("/studios", data);
      if (res.status === 201 || res.status === 200) {
        toast.success("Studio space successfully published!");
        router.push("/my-listings");
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to create studio listing. Please check required fields.";
      toast.error(msg);
      throw err;
    }
  };

  return (
    <div>
      <SectionTitle
        title="Host a New Creative Space"
        subtitle="Fill in the technical specifications, equipment roster, and rental rates for your studio."
      />

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        <StudioForm
          onSubmit={handleCreateStudio}
          submitButtonText="Publish Studio Listing"
        />
      </div>
    </div>
  );
}
