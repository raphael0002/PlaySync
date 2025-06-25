"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "../hooks/useLogin";
import { LoginCredentials } from "../auth.types";
import TurfLoader from "@/components/loaders/TurfLoader";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const LoginForm = () => {
  const { login, isPending, error, isSuccess } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully!", {
        toastId: "login-success",
      });
    }
    if (error) {
      toast.error(error.message, {
        toastId: "login-error",
      });
    }
  }, [isSuccess, error]);

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  return (
    <>
      {isPending && <TurfLoader />}
      <div className="w-full max-w-md rounded-lg bg-card shadow-lg border-border p-6 sm:p-8">
        <div className="h-1 rounded-t-radius-md bg-primary mb-6"></div>
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          Sign in to PlaySync
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-muted-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`rounded-radius-md border-input focus:ring-ring focus:border-primary transition-all duration-200 ${
                errors.email ? "border-destructive" : ""
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-muted-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`rounded-radius-md border-input focus:ring-ring focus:border-primary transition-all duration-200 ${
                errors.password ? "border-destructive" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground rounded-radius-md py-3 font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};
