import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <LoadingSpinner size="lg" label="Loading StudioSpace..." />
    </div>
  );
}
