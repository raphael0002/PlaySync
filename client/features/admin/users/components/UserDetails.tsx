"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Trash,
  Edit,
  ArrowLeft,
  User as UserIcon,
  Shield,
} from "lucide-react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUsers";
import { deleteUser } from "../api/userApi";
import UserForm from "./UserForm";

const UserDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useUser(id as string);

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      router.push("/dashboard/admin/users");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  if (error) {
    toast.error("Failed to fetch user");
  }

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-2rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-green-500"></div>
          <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Loading user details...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[calc(100vh-2rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-500 mb-2 sm:mb-3">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">
            User not found
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {`The user you're looking for doesn't exist.`}
          </p>
          <Button
            onClick={() =>
              router.push("/dashboard/admin/users")
            }
            className="mt-3 sm:mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-gradient-to-r from-red-500 to-pink-600 text-white";
      case "VENDOR":
        return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-4 sm:space-y-6 p-3 sm:p-4 overflow-y-auto">
      <Button
        variant="outline"
        onClick={() =>
          router.push("/dashboard/admin/users")
        }
        className="w-fit bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Users
      </Button>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            User Profile
          </h1>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
            </DialogTrigger>
            <UserForm user={user} />
          </Dialog>
          <Button
            variant="destructive"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to delete this user? This action cannot be undone."
                )
              ) {
                deleteMutation.mutate(id as string);
              }
            }}
            disabled={deleteMutation.isPending}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-sm"
          >
            <Trash className="h-4 w-4 mr-2" />
            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete User"}
          </Button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-6 sm:px-4 sm:py-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center text-xl sm:text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                {user.name}
              </h2>
              <div className="flex flex-wrap gap-2 mt-1 sm:mt-2 justify-center sm:justify-start">
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {user.role}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium bg-white/20">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-3 sm:p-4 md:p-6 grid gap-4 sm:gap-6 sm:grid-cols-2">
          {/* Personal Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white flex items-center">
              <UserIcon className="h-4 w-4 mr-2 text-green-500" />
              Personal Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  User ID
                </label>
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300 font-mono">
                  {user.id}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  Full Name
                </label>
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-200">
                  {user.name}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  Email Address
                </label>
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Account Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  Role & Permissions
                </label>
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {user.role}
                </span>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  Account Created
                </label>
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700">
                <label className="text-xs font-medium text-green-600 dark:text-green-400 block mb-1">
                  Account Status
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs sm:text-sm text-green-700 dark:text-green-400 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
