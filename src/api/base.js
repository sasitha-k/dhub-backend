import { redirect } from "next/navigation";
import { getCookie } from "@/utils/helpers";
import instance from "./instance";

instance.interceptors.request.use(
  async function (config) {
    const token = getCookie("token");

    if (!token) {
      // redirect user if no token found
      redirect("/login");
      return Promise.reject(new Error("No token found"));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
