import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/api/axios";
import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  ApiErrorResponse,
} from "../auth.types";

const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/api/v1/auth/login",
    credentials,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const signup = async (
  credentials: SignupCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/api/v1/auth/signup",
    credentials,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation<
    AuthResponse,
    ApiErrorResponse,
    LoginCredentials
  >({
    mutationFn: login,
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export const useSignupMutation = () => {
  return useMutation<
    AuthResponse,
    ApiErrorResponse,
    SignupCredentials
  >({
    mutationFn: signup,
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });
};
