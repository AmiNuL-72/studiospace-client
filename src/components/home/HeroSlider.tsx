"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "World-Class Studios for Boundless Creativity",
    subtitle: "Discover and book state-of-the-art photography cycloramas, film stages, and creative production spaces by the hour.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Acoustically Treated Audio & Podcast Lounges",
    subtitle: "Level up your sound production with pristine recording suites, professional vocal booths, and multi-mic podcast sets.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Turn Your Empty Studio Into a Thriving Business",
    subtitle: "Share your gear, monetize your downtime, and join thousands of verified hosts powering the creator economy.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden rounded-3xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full rounded-3xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >

              <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[2px]" />

              <div className="relative z-10 max-w-3xl text-center text-white px-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-4">
                  Peer-to-Peer Creative Marketplace
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-neutral-200 mb-8 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/studios"
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base transition shadow-lg shadow-indigo-600/30"
                  >
                    Explore Studios
                  </Link>
                  <Link
                    href="/add-studio"
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
