// /lib/api/authInstance.js
import axios from "axios";
  import Cookies from "js-cookie";

const authInstance = axios.create({
  baseURL: "https://dhub.yaludev.com",
  headers: {
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    console.log('token', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
    
  },
  (error) => Promise.reject(error)
);

export default authInstance;
