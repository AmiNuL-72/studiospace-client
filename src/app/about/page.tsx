import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";
import { FiCamera, FiTarget, FiHeart, FiGlobe, FiUsers, FiAward } from "react-icons/fi";

const team = [
  { name: "Aminul Islam", role: "Founder & Lead Developer", avatar: "A" },
  { name: "Creative Partner", role: "Design Lead", avatar: "C" },
  { name: "Studio Expert", role: "Content & Community", avatar: "S" },
];

const stats = [
  { value: "500+", label: "Studios Listed", icon: FiCamera },
  { value: "10K+", label: "Bookings Completed", icon: FiAward },
  { value: "25+", label: "Cities Covered", icon: FiGlobe },
  { value: "8K+", label: "Active Creators", icon: FiUsers },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          About Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Empowering Creators With <span className="text-indigo-600">World-Class Spaces</span>
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto">
          StudioSpace is the peer-to-peer marketplace that bridges the gap between independent creators and professional production environments. We believe every artist deserves access to exceptional facilities.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center shadow-sm"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-neutral-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-neutral-500 mt-1 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/50">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6">
            <FiTarget className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Our Mission</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            To democratize access to professional creative infrastructure by connecting studio owners with creators worldwide. We aim to make it simple, safe, and affordable for anyone to find and book the perfect production environment — from a photography cyclorama to an acoustically treated podcast lounge.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/50">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-6">
            <FiHeart className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Our Vision</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A world where creative talent is never limited by the absence of a proper working space. We envision StudioSpace becoming the global standard for studio discovery and booking — empowering the next generation of filmmakers, photographers, musicians, and podcasters.
          </p>
        </div>
      </div>

      <div>
        <SectionTitle
          title="Meet the Team"
          subtitle="The creative minds behind StudioSpace dedicated to building the best platform for creators."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center shadow-sm"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl mb-4 border-2 border-indigo-200 dark:border-indigo-800">
                {member.avatar}
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-white">{member.name}</h3>
              <p className="text-xs text-neutral-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center p-12 rounded-3xl bg-neutral-900 dark:bg-neutral-800 text-white">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          Join the StudioSpace Community
        </h2>
        <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
          Whether you&apos;re a creator looking for the perfect space or a host wanting to monetize your studio — we&apos;ve got you covered.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/studios"
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/30"
          >
            Explore Studios
          </Link>
          <Link
            href="/register"
            className="px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold text-sm transition"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}
