# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

> **Live Website:** [https://studiospace-client-as8.vercel.app/](https://studiospace-client-as8.vercel.app/)  
> **Server Live API:** [https://studiospace-server-as8.vercel.app/](https://studiospace-server-as8.vercel.app/)

StudioSpace is a high-performance marketplace designed for filmmakers, photographers, podcasters, sound engineers, and visual artists to discover, inspect dynamic availability, and reserve studio slots with transparent pricing and real-time booking management.

---

## 🌟 Key Features

1. **Dynamic Studio Discovery & Filtering:** Instant keyword search by space title and location, combined with interactive category tabs (*Photo Studio, Sound Stage, Podcast Lounge, Music Suite, Art Workshop*) and real-time price/rating sorting.
2. **Double-Booking Overlap Prevention (Challenge 2):** High-reliability collision detection checking time overlaps against existing `Pending` or `Confirmed` bookings in MongoDB, preventing scheduling conflicts with friendly alert toasts.
3. **HTTPOnly Cookie JWT Authentication (Challenge 1):** Robust, XSS-resilient authentication pipeline storing JWT tokens exclusively in secure `HTTPOnly` cookies with automatic session persistence across page reloads.
4. **Creator Host Management & Full Studio CRUD:** Dedicated host dashboard to publish spaces with ImgBB/direct URL image integration, set hourly rates and security deposits, manage active listings, update details, or delete listings with custom confirmation modal dialogs.
5. **Interactive Booking Workflow & Status Engine:** Instant reservation request pipeline with automated hour and price calculations, owner confirmation controls, pending-slot cancellation, and booking status badges (*Pending, Confirmed, Completed, Cancelled*).
6. **Dark / Light Theme Customization (Challenge 3):** System-wide, persistent dark/light theme toggle offering optimal contrast for high-detail production environments.
7. **Downloadable PDF / Print Booking Invoice (Optional Feature):** Clean, printable modal invoice generator with formatted financial breakdown and invoice reference codes for confirmed reservations.
8. **Saved Studios Wishlist (Optional Feature):** Heart toggle on studio cards and details view enabling logged-in creators to curate and revisit their favorite production spaces.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling & Icons** | Tailwind CSS v4, React Icons (`react-icons/fi`, `react-icons/fc`) |
| **Sliders & Carousel** | Swiper.js (`swiper/react`) |
| **Notifications & Dialogs** | Sonner (`sonner` rich toast system), Custom Animated Modals |
| **HTTP Client** | Axios (`axiosPublic`, `axiosSecure` with `withCredentials: true`) |
| **Backend & Database** | Express.js, Node.js, MongoDB Atlas with Mongoose ODM |
| **Auth & Security** | JWT (JSON Web Tokens), Bcrypt.js, HTTPOnly Cookies |

---

## 🔑 Examiner Test Credentials

For quick evaluation, you may use the pre-configured test account or create a new user:

- **Email:** `test@test.com`
- **Password:** `Test1234`
- **Google One-Click Sign-In:** Click **"Continue with Google"** on the Login or Register page to instantly sign in as a verified creator.

---

## 🚀 Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/studiospace-client.git
cd studiospace-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Create a `.env.local` file in the root directory:
```env
# Backend API base URL
NEXT_PUBLIC_API_URL=https://studiospace-server-as8.vercel.app/api

# ImgBB API Key for direct image uploads (Optional/Recommended)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📄 License
Built for Programming Hero Assignment 08 — StudioSpace. All rights reserved.
