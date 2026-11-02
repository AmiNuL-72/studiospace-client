import SectionTitle from "@/components/shared/SectionTitle";
import { FiSearch, FiClock, FiCalendar, FiFilm, FiShield, FiStar, FiDollarSign, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    desc: "Browse our entire catalogue of verified studios. Use category filters, search by location, and compare pricing to find the perfect space for your shoot.",
    icon: FiSearch,
    color: "bg-indigo-600",
  },
  {
    step: "02",
    title: "Select Your Schedule",
    desc: "Pick a date and choose your exact session hours. Our transparent hourly pricing means you only pay for the time you need — no hidden fees.",
    icon: FiClock,
    color: "bg-purple-600",
  },
  {
    step: "03",
    title: "Book Instantly",
    desc: "Submit your booking request with any special requirements. Receive instant or fast-track confirmation from verified studio hosts.",
    icon: FiCalendar,
    color: "bg-emerald-600",
  },
  {
    step: "04",
    title: "Create & Produce",
    desc: "Arrive at your booked studio, meet your host, access all pre-set equipment, and focus entirely on bringing your creative vision to life.",
    icon: FiFilm,
    color: "bg-amber-600",
  },
];

const features = [
  {
    title: "Verified Host Profiles",
    desc: "Every host undergoes identity and space verification before listing.",
    icon: FiCheckCircle,
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden fees — clear hourly rates and refundable security deposits.",
    icon: FiDollarSign,
  },
  {
    title: "Booking Protection",
    desc: "Your sessions are covered by our comprehensive cancellation and liability policy.",
    icon: FiShield,
  },
  {
    title: "Rated by Real Creators",
    desc: "Honest reviews from photographers, filmmakers, and audio producers.",
    icon: FiStar,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Simple 4-Step Process
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          How StudioSpace Works
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto">
          From discovering the perfect creative space to walking in and starting your shoot — StudioSpace makes everything seamless.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="relative bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${s.color} text-white flex items-center justify-center`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-4xl font-black text-neutral-200 dark:text-neutral-800">
                  {s.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div>
        <SectionTitle
          title="Why Creators Trust StudioSpace"
          subtitle="Built by creatives, for creatives — with trust, transparency, and quality at every step."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1">{f.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to Book Your First Session?</h2>
        <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
          Explore hundreds of verified studios across every creative category. Your next masterpiece starts here.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/studios"
            className="px-8 py-3.5 rounded-xl bg-white text-indigo-700 hover:bg-neutral-100 font-bold text-sm transition"
          >
            Explore Studios
          </Link>
          <Link
            href="/register"
            className="px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold text-sm transition backdrop-blur-md"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
