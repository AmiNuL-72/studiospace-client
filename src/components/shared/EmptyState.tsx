import Link from "next/link";
import { FiFolderMinus } from "react-icons/fi";

interface EmptyStateProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No items found",
  description = "We couldn't find anything matching your search or criteria.",
  ctaText,
  ctaLink,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 my-6">
      <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-4">
        <FiFolderMinus className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mb-6">
        {description}
      </p>

      {ctaText && ctaLink && (
        <Link
          href={ctaLink}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition shadow-sm"
        >
          {ctaText}
        </Link>
      )}

      {ctaText && onAction && !ctaLink && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition shadow-sm"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}
