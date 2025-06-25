"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/slices/userSlice";
import { axiosInstance } from "@/lib/api/axios";
import { removeCookie } from "@/lib/cookieUtils";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post(
        "/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(clearUser());
      removeCookie("token");
      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(clearUser());
      removeCookie("token");
      router.push("/home");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
