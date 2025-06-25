"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../api/authApi";
import { setUser } from "@/store/slices/userSlice";
import {
  SignupCredentials,
  AuthResponse,
} from "../auth.types";

export const useSignup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate, isPending, error, isSuccess } =
    useSignupMutation();

  const signup = (
    credentials: SignupCredentials,
    onSuccess?: () => void
  ) => {
    mutate(credentials, {
      onSuccess: (data: AuthResponse) => {
        dispatch(setUser(data.data.user));
        const role = data.data.user.role.toLowerCase();
        router.push(`/dashboard/${role}`);
        if (onSuccess) onSuccess();
      },
    });
  };

  return { signup, isPending, error, isSuccess };
};
