// /lib/api/auth.js
import authInstance from "./authInstance";
import Cookies from "js-cookie";

export const login = async ({ userName, password }) => {
  try {
    const res = await authInstance.post("/login", { userName, password });
    // Save token in cookies
    const token = res.data.token;
    if (token) {
      Cookies.set("token", token, {
        expires: 7, // 7 days
        secure: true, // only over HTTPS
        sameSite: "strict",
      });
    }

    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
