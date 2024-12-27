import axios from "axios";

export const HTTP = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
