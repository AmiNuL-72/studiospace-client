import axios from "axios";

const axiosSecure = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://studiospace-server-as8.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosSecure.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {

      }
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
