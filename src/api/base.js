import { getCookie } from "@/utils/helpers";
import instance from "./instance";

instance.interceptors.request.use(
  async function (config) {
    const token = getCookie("token");
    config.headers.Authorization = "bearer " + token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
module.exports = instance;
