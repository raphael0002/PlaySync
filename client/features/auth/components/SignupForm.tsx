"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignup } from "../hooks/useSignup";
import { SignupCredentials } from "../auth.types";
import TurfLoader from "@/components/loaders/TurfLoader";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one number"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .optional(),
  role: z.enum(["ADMIN", "VENDOR", "USER"], {
    message: "Role must be ADMIN, VENDOR, or USER",
  }),
});

export const SignupForm = () => {
  const { signup, isPending, error, isSuccess } =
    useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupCredentials>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "USER",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signed up successfully!", {
        toastId: "signup-success",
      });
    }
    if (error) {
      toast.error(error.message, {
        toastId: "signup-error",
      });
    }
  }, [isSuccess, error]);

  const onSubmit = (data: SignupCredentials) => {
    signup(data);
  };

  return (
    <>
      {isPending && <TurfLoader />}
      <div className="w-full max-w-md rounded-radius-lg bg-card shadow-lg border-border p-6 sm:p-8">
        <div className="h-1 rounded-t-radius-md bg-primary mb-6"></div>
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Join PlaySync
        </h2>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          Create your account
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className={`rounded-radius-md border-input focus:ring-ring focus:border-primary transition-all duration-200 ${
                errors.name ? "border-destructive" : ""
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
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
          <div className="space-y-1">
            <Label
              htmlFor="role"
              className="text-sm font-medium text-muted-foreground"
            >
              Role
            </Label>
            <Select
              onValueChange={(value) =>
                setValue(
                  "role",
                  value as "ADMIN" | "VENDOR" | "USER"
                )
              }
              defaultValue="USER"
            >
              <SelectTrigger
                id="role"
                className="w-full rounded-radius-md border-input focus:ring-ring focus:border-primary transition-all duration-200"
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="VENDOR">
                  Vendor
                </SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-destructive text-xs mt-1">
                {errors.role.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground rounded-radius-md py-3 font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};
