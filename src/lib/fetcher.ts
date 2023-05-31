import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "https://meter.hackyour.pw/",
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
