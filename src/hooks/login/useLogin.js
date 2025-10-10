"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { login } from "@/api/login";

export function useLogin() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  

  const onSubmit = useCallback(async () => {
    setErrors([]);
    setIsLoading(true);

    try {
      const res = await login({
        ...formData,
      });

      const token = res?.token;

      if (token != null) {
        toast.success("Login Success", {
          description: "You will be redirecting to dashboard please wait..",
        });

        setCookie('token', token);
        console.log('token', token)
        router.push("/booking");
      }else {
        setIsLoading(false);

      }

     
    } catch (error) {
      if (error?.response?.data?.code == 422) {
        toast.error("Login Error", {
          description: "Invalid username or password",
        });

        setErrors(error?.response?.data?.errors);
      }
      setIsLoading(false);

    }
  }, [formData,router,setCookie]);

  const onLogout = useCallback(async () => {

    removeCookie('token', { path: '/' });
    router.push("/login");

  },[removeCookie,router])

  return {
    onLogout,
    onSubmit,
    formData,
    setFormData,
    errors,
    isLoading,
  };
}
