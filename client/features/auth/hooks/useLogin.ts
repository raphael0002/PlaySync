"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../api/authApi";
import { setUser } from "@/store/slices/userSlice";
import {
  LoginCredentials,
  AuthResponse,
} from "../auth.types";

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate, isPending, error, isSuccess } =
    useLoginMutation();

  const login = (
    credentials: LoginCredentials,
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

  return { login, isPending, error, isSuccess };
};
