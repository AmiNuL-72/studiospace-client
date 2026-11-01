import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";
import { FiCamera, FiVideo, FiMic, FiMusic, FiPenTool } from "react-icons/fi";

const categories = [
  {
    title: "Photo Studios",
    param: "Photo Studio",
    count: "40+ Spaces",
    icon: FiCamera,
    description: "Cyc walls, daylight lofts, strobe lighting & backdrop sets.",
    bg: "from-blue-600/10 to-indigo-600/10",
  },
  {
    title: "Sound Stages",
    param: "Sound Stage",
    count: "25+ Stages",
    icon: FiVideo,
    description: "High ceilings, green screens, acoustic treatment & drive-in bays.",
    bg: "from-purple-600/10 to-pink-600/10",
  },
  {
    title: "Podcast Rooms",
    param: "Podcast Lounge",
    count: "30+ Lounges",
    icon: FiMic,
    description: "Multi-camera audio/video setups with Shure mics & video switchers.",
    bg: "from-amber-600/10 to-orange-600/10",
  },
  {
    title: "Music Suites",
    param: "Music Suite",
    count: "35+ Suites",
    icon: FiMusic,
    description: "Treated control rooms, vocal isolation booths & analog synthesizers.",
    bg: "from-emerald-600/10 to-teal-600/10",
  },
  {
    title: "Art Workshops",
    param: "Art Workshop",
    count: "20+ Workshops",
    icon: FiPenTool,
    description: "Ceramics, painting easels, sculpting benches & natural light.",
    bg: "from-rose-600/10 to-red-600/10",
  },
];

export default function CategoryCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        title="Browse by Studio Category"
        subtitle="Explore specialized production environments built specifically for your craft."
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.title}
              href={`/studios?category=${encodeURIComponent(cat.param)}`}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>{cat.count}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
