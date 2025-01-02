import { env } from "@/config/env";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiAuth = (token?: string | null) => {
  return axios.create({
    baseURL: env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
