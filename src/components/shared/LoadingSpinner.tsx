export default function LoadingSpinner({
  size = "md",
  label = "Loading...",
}: {
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div
        className={`${sizeClasses[size]} rounded-full border-neutral-300 dark:border-neutral-700 border-t-indigo-600 dark:border-t-indigo-500 animate-spin`}
      />
      {label && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          {label}
        </p>
      )}
    </div>
  );
}
