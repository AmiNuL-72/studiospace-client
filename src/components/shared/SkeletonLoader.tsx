export default function SkeletonLoader({
  count = 6,
  type = "card",
}: {
  count?: number;
  type?: "card" | "table-row" | "details";
}) {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 animate-pulse space-y-4 bg-white dark:bg-neutral-900"
          >
            <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
            <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg pt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg"
        />
      ))}
    </div>
  );
}
