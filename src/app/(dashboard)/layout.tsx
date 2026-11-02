"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiPlusCircle, FiList, FiCalendar, FiHeart } from "react-icons/fi";

const dashboardNav = [
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
  { label: "Add New Studio", href: "/add-studio", icon: FiPlusCircle },
  { label: "My Studio Listings", href: "/my-listings", icon: FiList },
  { label: "My Bookings", href: "/my-bookings", icon: FiCalendar },
  { label: "Saved Wishlist", href: "/my-wishlist", icon: FiHeart },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Verifying session..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-neutral-200 dark:border-neutral-800 no-scrollbar">
        {dashboardNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}
