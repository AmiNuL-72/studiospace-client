"use client";

import Link from "next/link";
import { Studio } from "@/types";
import { FiMapPin, FiStar, FiHeart } from "react-icons/fi";
import { useState } from "react";

interface StudioCardProps {
  studio: Studio;
  onToggleWishlist?: (studioId: string) => void;
  isWishlisted?: boolean;
}

const DEFAULT_STUDIO_IMG = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800";

export default function StudioCard({
  studio,
  onToggleWishlist,
  isWishlisted = false,
}: StudioCardProps) {
  const [wishlist, setWishlist] = useState(isWishlisted);

  const rawImg = studio.primaryImage || studio.images?.[0] || studio.image || DEFAULT_STUDIO_IMG;
  const [imgSrc, setImgSrc] = useState(rawImg);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist(!wishlist);
    if (onToggleWishlist && studio._id) {
      onToggleWishlist(studio._id);
    }
  };

  return (
    <div className="group flex flex-col h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

      <div className="relative w-full h-52 overflow-hidden bg-neutral-100 dark:bg-neutral-800">

        <img
          src={imgSrc}
          alt={studio.title}
          onError={() => setImgSrc(DEFAULT_STUDIO_IMG)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-900/70 text-white backdrop-blur-md border border-white/10">
          {studio.category}
        </span>

        <button
          onClick={handleHeartClick}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-red-500 transition shadow"
        >
          <FiHeart
            className={`w-4 h-4 transition ${wishlist ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
              <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{studio.rating ? studio.rating.toFixed(1) : "5.0"}</span>
              {studio.totalReviews ? (
                <span className="text-neutral-400 text-xs font-normal">
                  ({studio.totalReviews})
                </span>
              ) : null}
            </div>
            <div className="text-neutral-900 dark:text-white font-extrabold text-base">
              ${studio.hourlyRate}
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal"> / hr</span>
            </div>
          </div>

          <h3 className="font-bold text-lg text-neutral-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {studio.title}
          </h3>

          <p className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-1">
            <FiMapPin className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
            <span>{studio.location}</span>
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <Link
            href={`/studios/${studio._id || "1"}`}
            className="w-full block text-center py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-indigo-600 dark:bg-neutral-800 dark:hover:bg-indigo-600 text-white font-medium text-sm transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
