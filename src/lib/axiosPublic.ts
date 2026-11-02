import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://studiospace-server-as8.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
