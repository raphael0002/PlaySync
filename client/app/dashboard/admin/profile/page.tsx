"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  User as UserIcon,
  Shield,
  UploadCloud,
  Trash2,
  Mail,
  Key,
} from "lucide-react";
import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { User } from "@/types/user";
import {
  setUser,
  clearUser,
} from "@/store/slices/userSlice";
import { cn } from "@/lib/utils";
import {
  deleteUser,
  getUser,
  updateUser,
} from "@/features/admin/users/api/userApi";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user: reduxUser } = useSelector(
    (state: RootState) => state.user
  ) as { user: User | null };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    profileImage: undefined as File | undefined,
  });
  const [imagePreview, setImagePreview] = useState<
    string | null
  >(null);
  const [isFormDirty, setIsFormDirty] = useState(false);

  // useQuery with function for initialData
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Error>({
    queryKey: ["user", reduxUser?.id],
    queryFn: async () => {
      if (!reduxUser?.id)
        throw new Error("User ID not found");
      return getUser(reduxUser.id);
    },
    enabled: !!reduxUser?.id,
    initialData: () => reduxUser ?? undefined, // Lazy initialData
  });

  // Initialize formData and imagePreview when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        name: user.name,
        password: "",
        profileImage: undefined,
      });
      setImagePreview(user.profileImage ?? null);
    }
  }, [user]);

  // useMutation for update
  const updateMutation = useMutation<
    unknown,
    Error,
    typeof formData
  >({
    mutationFn: async (data) => {
      if (!reduxUser?.id)
        throw new Error("User ID not found");
      const form = new FormData();
      form.append("email", data.email);
      form.append("name", data.name);
      if (data.password)
        form.append("password", data.password);
      if (data.profileImage)
        form.append("profileImage", data.profileImage);
      const updatedUser = await updateUser(
        reduxUser.id,
        form
      );
      dispatch(setUser(updatedUser));
      return updatedUser;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsFormDirty(false);
    },
    onError: (error) => {
      toast.error(
        `Failed to update profile: ${error.message}`
      );
    },
  });

  // useMutation for delete
  const deleteMutation = useMutation<unknown, Error, void>({
    mutationFn: async () => {
      if (!reduxUser?.id)
        throw new Error("User ID not found");
      await deleteUser(reduxUser.id);
      dispatch(clearUser());
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      router.push("/");
    },
    onError: (error) => {
      toast.error(
        `Failed to delete account: ${error.message}`
      );
    },
  });

  // Security check
  if (!reduxUser || reduxUser.role !== "ADMIN") {
    toast.error("Unauthorized access");
    router.push("/dashboard/admin");
    return null;
  }

  if (error) {
    toast.error("Failed to fetch profile");
  }

  if (isLoading || !user) {
    return (
      <div className="h-[calc(100vh-2rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
          <span className="text-base text-gray-500 dark:text-gray-400">
            Loading profile...
          </span>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormDirty(true);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setIsFormDirty(true);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.name) {
      toast.error("Email and name are required");
      return;
    }
    if (formData.password && formData.password.length < 8) {
      toast.error(
        "Password must be at least 8 characters long"
      );
      return;
    }
    updateMutation.mutate(formData);
  };

  const getRoleBadgeColor = (role: string) =>
    role === "ADMIN"
      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white";

  return (
    <div className="min-h-[calc(100vh-2rem)] flex flex-col p-4 sm:p-0 bg-gray-50 dark:bg-gray-900 ">
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard/admin")}
        className="w-fit bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm mb-6 transition-all duration-300 animate-fade-in"
        aria-label="Back to dashboard"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="max-w-7xl h-[90vh]  bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-8">
          My Profile
        </h1>

        <div className="space-y-12">
          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:opacity-80"
                  onError={() =>
                    console.log(
                      "Failed to load profile image:",
                      imagePreview
                    )
                  }
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-500 dark:text-gray-400 border-4 border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:opacity-80">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <UploadCloud className="h-8 w-8 text-white bg-black/50 rounded-full p-2" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <Label
                htmlFor="profileImage"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center"
              >
                <UploadCloud className="h-4 w-4 mr-2 text-gray-500" />
                Profile Image
              </Label>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="mt-3 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm transition-all duration-300"
                aria-label="Upload profile image"
              >
                Upload Image
              </Button>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-green-500" />
              Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="pl-10 py-5 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500/20 text-base transition-all duration-300"
                    required
                    aria-label="Full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="user@example.com"
                    className="pl-10 py-5 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500/20 text-base transition-all duration-300"
                    required
                    aria-label="Email address"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2 sm:col-span-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  New Password (Optional)
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="pl-10 py-5 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:ring-green-500/20 text-base transition-all duration-300"
                    aria-label="New password"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 8 characters
                  long
                </p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              Account Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Role */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Role
                </Label>
                <div
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium",
                    getRoleBadgeColor(user.role)
                  )}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {user.role}
                </div>
              </div>

              {/* Account Created */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Account Created
                </Label>
                <p className="text-base text-gray-900 dark:text-gray-300">
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
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    "flex-1 text-white text-sm transition-all duration-300 py-5",
                    isFormDirty
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg animate-pulse-subtle"
                      : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600"
                  )}
                  disabled={
                    !isFormDirty || updateMutation.isPending
                  }
                  aria-label="Update profile"
                >
                  {updateMutation.isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Confirm Update
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Are you sure you want to update your
                    profile? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm transition-all duration-300"
                      aria-label="Cancel update"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm transition-all duration-300"
                    disabled={updateMutation.isPending}
                    aria-label="Confirm update"
                  >
                    Confirm Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex-1 py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm transition-all duration-300"
                  disabled={deleteMutation.isPending}
                  aria-label="Delete account"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Confirm Account Deletion
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Are you sure you want to delete your
                    account? This action is permanent and
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm transition-all duration-300"
                      aria-label="Cancel deletion"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate()}
                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm transition-all duration-300"
                    disabled={deleteMutation.isPending}
                    aria-label="Confirm deletion"
                  >
                    {deleteMutation.isPending
                      ? "Deleting..."
                      : "Confirm Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
