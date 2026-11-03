"use client";

import { useState } from "react";
import { Studio, StudioCategory } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { uploadToImgBB } from "@/lib/imageUpload";
import { toast } from "sonner";
import { FiUpload, FiCheck } from "react-icons/fi";

const CATEGORIES: StudioCategory[] = [
  "Photo Studio",
  "Sound Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

const AVAILABLE_AMENITIES = [
  "Cyc Wall",
  "Strobe Lighting",
  "Green Screen",
  "Acoustic Treatment",
  "Vocal Isolation Booth",
  "Multi-Cam Switcher",
  "Hair & Makeup Station",
  "High-Speed Wi-Fi",
  "Drive-In Bay / Loading Dock",
  "Client Lounge",
  "Air Conditioning",
  "Kitchenette",
];

interface StudioFormProps {
  initialData?: Partial<Studio>;
  onSubmit: (data: Partial<Studio>) => Promise<void>;
  submitButtonText?: string;
  isEdit?: boolean;
}

export default function StudioForm({
  initialData,
  onSubmit,
  submitButtonText = "Save Studio",
  isEdit = false,
}: StudioFormProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState<StudioCategory>(
    (initialData?.category as StudioCategory) || "Photo Studio"
  );
  const [hourlyRate, setHourlyRate] = useState(initialData?.hourlyRate?.toString() || "");
  const [securityDeposit, setSecurityDeposit] = useState(initialData?.securityDeposit?.toString() || "0");
  const [maxCapacity, setMaxCapacity] = useState(initialData?.maxCapacity?.toString() || "10");
  const [location, setLocation] = useState(initialData?.location || "");
  const [primaryImage, setPrimaryImage] = useState(initialData?.primaryImage || "");
  const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || []);
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.info("Uploading image to ImgBB...");
      const url = await uploadToImgBB(file);
      setPrimaryImage(url);
      toast.success("Image uploaded successfully!");
    } catch (err: unknown) {
      const msg = (err as Error)?.message || "Image upload failed. You can paste a direct URL instead.";
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to manage studio listings.");
      return;
    }

    if (!primaryImage) {
      toast.error("Please provide a studio image URL or upload an image.");
      return;
    }

    try {
      setIsSubmitting(true);
      const studioPayload: Partial<Studio> = {
        title,
        category,
        hourlyRate: parseFloat(hourlyRate),
        securityDeposit: parseFloat(securityDeposit) || 0,
        maxCapacity: parseInt(maxCapacity, 10) || 1,
        location,
        primaryImage,
        images: [primaryImage],
        amenities,
        overview,
        ownerEmail: user.email,
        host: {
          name: user.name || "Host",
          email: user.email,
          avatar: user.image || "",
        },
      };

      await onSubmit(studioPayload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">

      <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase">
            Host Name (Read-Only)
          </label>
          <p className="font-medium text-neutral-800 dark:text-neutral-200 mt-1">
            {user?.name || "Not signed in"}
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase">
            Host Email (Read-Only)
          </label>
          <p className="font-medium text-neutral-800 dark:text-neutral-200 mt-1">
            {user?.email || "Not signed in"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Studio Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Apex Sound Stage & Daylight Cyc Loft"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as StudioCategory)}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Hourly Rate ($ USD) *
          </label>
          <input
            type="number"
            required
            min={1}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="e.g. 75"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Security Deposit ($ USD)
          </label>
          <input
            type="number"
            min={0}
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(e.target.value)}
            placeholder="e.g. 150"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Max Crew Capacity
          </label>
          <input
            type="number"
            min={1}
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
            placeholder="e.g. 15"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Physical Location / Address *
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. 450 Broadway, Soho, New York, NY"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Studio Primary Image (Upload or URL) *
          </label>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="url"
              value={primaryImage}
              onChange={(e) => setPrimaryImage(e.target.value)}
              placeholder="https://example.com/studio.jpg"
              className="flex-1 w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500"
            />
            <label className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-100 transition whitespace-nowrap">
              <FiUpload className="w-4 h-4" />
              <span>{isUploading ? "Uploading..." : "Upload via ImgBB"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Included Amenities & Gear
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {AVAILABLE_AMENITIES.map((item) => {
              const active = amenities.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                    active
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                      : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      active
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-neutral-400"
                    }`}
                  >
                    {active && <FiCheck className="w-3 h-3" />}
                  </div>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Detailed Overview & Production Rules *
          </label>
          <textarea
            required
            rows={5}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Describe your studio space, equipment list, ceiling height, noise isolation, house rules..."
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-600/30 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : submitButtonText}
        </button>
      </div>
    </form>
  );
}
