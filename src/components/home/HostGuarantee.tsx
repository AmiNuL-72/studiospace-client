import SectionTitle from "@/components/shared/SectionTitle";
import { FiShield, FiUserCheck, FiCpu, FiHeadphones } from "react-icons/fi";

const assurances = [
  {
    title: "Comprehensive Liability Protection",
    desc: "Every studio booking is protected against accidental property damages and unforeseen operational liabilities.",
    icon: FiShield,
  },
  {
    title: "100% Verified Creator Profiles",
    desc: "All hosts and creators undergo rigorous identity verification before bookings are finalized.",
    icon: FiUserCheck,
  },
  {
    title: "Equipment Safety Standards",
    desc: "High-value audio and film production gear is inspected and inventoried for guaranteed operational readiness.",
    icon: FiCpu,
  },
  {
    title: "24/7 Host & Production Support",
    desc: "Our dedicated concierge team is available around the clock to resolve schedule changes and on-site requests.",
    icon: FiHeadphones,
  },
];

export default function HostGuarantee() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionTitle
        title="Host Guarantee & Creator Support"
        subtitle="Rock-solid assurances designed to keep hosts protected and creators focused on excellence."
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assurances.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
