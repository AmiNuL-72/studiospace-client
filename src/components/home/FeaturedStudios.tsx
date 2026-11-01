"use client";

import { useEffect, useState } from "react";
import { Studio } from "@/types";
import SectionTitle from "@/components/shared/SectionTitle";
import StudioCard from "@/components/studios/StudioCard";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFeaturedStudios() {
      try {
        const res = await axiosPublic.get("/studios?limit=6&sortBy=rating");
        setStudios(res.data?.studios || res.data?.data || (Array.isArray(res.data) ? res.data : []));
      } catch (error) {
        console.error("Failed to fetch featured studios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedStudios();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <SectionTitle
          title="Featured Studio Spaces"
          subtitle="Top-rated creative facilities equipped with industry-standard production gear."
          className="mb-0"
        />
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all"
        >
          <span>Explore All Spaces</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <SkeletonLoader count={6} />
      ) : studios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500">
          No featured studios available at the moment.
        </div>
      )}
    </section>
  );
}
