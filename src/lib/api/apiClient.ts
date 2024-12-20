import { env } from "@/config/env";
import axios from "axios";

// fetch API using Axios
const ApiClient = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiClient;
