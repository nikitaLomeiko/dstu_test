import axios from "axios";
import { BASE_URL, REQUEST_TIMEOUT } from "../config/consts";

export const BASE_API = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": false,
  },
});
