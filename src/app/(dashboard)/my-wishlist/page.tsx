"use client";

import { useEffect, useState } from "react";
import { Studio } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import SectionTitle from "@/components/shared/SectionTitle";
import StudioCard from "@/components/studios/StudioCard";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import EmptyState from "@/components/shared/EmptyState";
import { toast } from "sonner";

export default function MyWishlistPage() {
  const { user } = useAuth();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      setStudios(res.data?.studios || res.data?.data || (Array.isArray(res.data) ? res.data : []));
    } catch (err) {
      console.error("Failed to load wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.email]);

  const handleRemoveFromWishlist = async (studioId: string) => {
    try {
      await axiosSecure.delete(`/wishlist/${studioId}`);
      setStudios((prev) => prev.filter((s) => s._id !== studioId));
      toast.success("Studio removed from your wishlist.");
    } catch {
      toast.error("Failed to remove from wishlist.");
    }
  };

  return (
    <div>
      <SectionTitle
        title="Saved Wishlist"
        subtitle="Studios you've saved for later. Quick access to your favorite creative spaces."
      />

      {loading ? (
        <SkeletonLoader count={6} />
      ) : studios.length === 0 ? (
        <EmptyState
          title="Your Wishlist is Empty"
          description="You haven't saved any studios yet. Explore available spaces and tap the heart icon to add them here."
          ctaText="Explore Studios"
          ctaLink="/studios"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <StudioCard
              key={studio._id}
              studio={studio}
              isWishlisted={true}
              onToggleWishlist={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
