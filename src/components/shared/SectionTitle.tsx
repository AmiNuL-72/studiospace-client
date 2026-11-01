interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : "text-left"} ${className}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
