import Link from "next/link";
import { FiCameraOff, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-indigo-50 dark:bg-neutral-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-neutral-700 shadow-inner">
          <FiCameraOff className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Error 404 • Lost in Studio
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
            Studio Space Not Found
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The creative space, session route, or production set you are searching for does not exist or has been relocated.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/30"
          >
            <FiHome className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
