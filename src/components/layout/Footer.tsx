"use client";

import Link from "next/link";
import { FiCamera, FiInstagram, FiYoutube, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <FiCamera className="w-4 h-4" />
              </div>
              <span>Studio<span className="text-indigo-400">Space</span></span>
            </Link>
            <p className="text-sm text-neutral-400">
              The premier peer-to-peer marketplace connecting creators with world-class production studios, photo spaces, and creative workspaces.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition"
                aria-label="X (formerly Twitter)"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition"
                aria-label="Instagram"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition"
                aria-label="YouTube"
              >
                <FiYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/studios" className="hover:text-white transition">Explore Studios</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">How It Works</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/add-studio" className="hover:text-white transition">Host Your Space</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Studio Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/studios?category=Photo+Studio" className="hover:text-white transition">Photo Studios</Link>
              </li>
              <li>
                <Link href="/studios?category=Sound+Stage" className="hover:text-white transition">Sound Stages</Link>
              </li>
              <li>
                <Link href="/studios?category=Podcast+Lounge" className="hover:text-white transition">Podcast Lounges</Link>
              </li>
              <li>
                <Link href="/studios?category=Music+Suite" className="hover:text-white transition">Music Suites</Link>
              </li>
              <li>
                <Link href="/studios?category=Art+Workshop" className="hover:text-white transition">Art Workshops</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Stay Inspired</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Subscribe to get curated spaces and creator community perks.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 StudioSpace Platform Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-neutral-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
