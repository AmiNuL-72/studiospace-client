import SectionTitle from "@/components/shared/SectionTitle";
import { FiSearch, FiClock, FiCalendar, FiFilm } from "react-icons/fi";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    desc: "Browse verified studios with detailed equipment rosters, floor plans, and real-time photos.",
    icon: FiSearch,
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    desc: "Choose your desired date and exact session time slot with transparent hourly pricing.",
    icon: FiClock,
  },
  {
    step: "03",
    title: "Book Instantly",
    desc: "Lock in your production slot securely with fast approval and instant booking confirmation.",
    icon: FiCalendar,
  },
  {
    step: "04",
    title: "Create & Produce",
    desc: "Check in with the host, access pre-set gear, and focus on bringing your creative vision to life.",
    icon: FiFilm,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900/50 py-20 border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="How StudioSpace Works"
          subtitle="Four straightforward steps to book premium creative environments on demand."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-neutral-200 dark:text-neutral-800">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
