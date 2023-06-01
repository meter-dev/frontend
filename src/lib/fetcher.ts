import axios from "axios";

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "https://meter.hackyour.pw/" : "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("meter-token") as string) as string;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default fetcher;
