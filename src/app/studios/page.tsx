"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Studio } from "@/types";
import axiosPublic from "@/lib/axiosPublic";
import SectionTitle from "@/components/shared/SectionTitle";
import StudioCard from "@/components/studios/StudioCard";
import StudioFilters from "@/components/studios/StudioFilters";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import EmptyState from "@/components/shared/EmptyState";

function ExploreStudiosContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchStudios() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedCategory) params.append("category", selectedCategory);
        if (searchQuery) params.append("search", searchQuery);
        if (sortBy) params.append("sortBy", sortBy);

        const res = await axiosPublic.get(`/studios?${params.toString()}`);
        setStudios(res.data?.studios || res.data?.data || (Array.isArray(res.data) ? res.data : []));
      } catch (error) {
        console.error("Failed to fetch studios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudios();
  }, [selectedCategory, searchQuery, sortBy]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        title="Explore Creative Spaces"
        subtitle="Browse our curated collection of verified photography cycloramas, sound stages, podcast lounges, and production studios."
      />

      <StudioFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <SkeletonLoader count={6} />
      ) : studios.length === 0 ? (
        <EmptyState
          title="No Studios Found"
          description={
            searchQuery
              ? `No studios match "${searchQuery}". Try a different keyword or clear your filters.`
              : "No studios available in this category yet. Check back soon!"
          }
          ctaText="Clear Filters"
          onAction={() => {
            setSearchQuery("");
            setSelectedCategory("");
            setSortBy("newest");
          }}
        />
      ) : (
        <>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            Showing <span className="font-bold text-neutral-900 dark:text-white">{studios.length}</span> studio{studios.length !== 1 ? "s" : ""}
            {selectedCategory ? ` in "${selectedCategory}"` : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ExploreStudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <SkeletonLoader count={6} />
        </div>
      }
    >
      <ExploreStudiosContent />
    </Suspense>
  );
}
