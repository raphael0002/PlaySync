export type Role = "ADMIN" | "VENDOR" | "USER";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  createdAt: string;
  profileImage?: string;
}

export interface AuthResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name?: string;
  role: Role;
}

export interface ApiErrorResponse {
  success: boolean;
  code: number;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
