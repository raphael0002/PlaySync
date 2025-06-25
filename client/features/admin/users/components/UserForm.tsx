"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createUser, updateUser } from "../api/userApi";
import { toast } from "react-toastify";
import { User } from "@/types/user";
import {
  Mail,
  User as UserIcon,
  Shield,
  Key,
  Save,
  RotateCcw,
  UploadCloud,
} from "lucide-react";

interface UserFormProps {
  user?: User;
}

interface FormData {
  email: string;
  name: string;
  role: string;
  password?: string;
  profileImage?: File;
}

const UserForm = ({ user }: UserFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || "",
    name: user?.name || "",
    role: user?.role || "USER",
    password: "",
    profileImage: undefined,
  });
  const [imagePreview, setImagePreview] = useState<
    string | null
  >(user?.profileImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, Error, FormData>({
    mutationFn: async (data: FormData) => {
      setIsLoading(true);
      const form = new FormData();
      form.append("email", data.email);
      form.append("name", data.name);
      form.append("role", data.role);
      if (!user?.id && data.password)
        form.append("password", data.password);
      if (data.profileImage)
        form.append("profileImage", data.profileImage);

      if (user?.id) {
        return await updateUser(user.id, form);
      }
      return await createUser(form);
    },
    onSuccess: () => {
      toast.success(
        user?.id
          ? "User updated successfully"
          : "User created successfully"
      );
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      router.push("/dashboard/admin/users");
      router.refresh();
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(
        `Failed to ${
          user?.id ? "update" : "create"
        } user: ${error.message}`
      );
      setIsLoading(false);
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.name ||
      !formData.role ||
      (!user?.id && !formData.password)
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    mutation.mutate(formData);
  };

  const handleReset = () => {
    setFormData({
      email: user?.email || "",
      name: user?.name || "",
      role: user?.role || "USER",
      password: "",
      profileImage: undefined,
    });
    setImagePreview(user?.profileImage || null);
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Full access to all system features and user management";
      case "VENDOR":
        return "Access to venue management and booking oversight";
      default:
        return "Standard user access with booking capabilities";
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-white/20 shadow-elegant-lg">
      <DialogHeader className="pb-6">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {user ? "Edit User" : "Create New User"}
        </DialogTitle>
        <p className="text-muted-foreground">
          {user
            ? "Update user information and permissions"
            : "Add a new user to the system"}
        </p>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Field */}
        <div className="space-y-2">
          <Label
            htmlFor="profileImage"
            className="text-sm font-medium flex items-center text-gray-700"
          >
            <UploadCloud className="h-4 w-4 mr-2 text-primary" />
            Profile Image
          </Label>
          <div className="flex items-center gap-2">
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Profile Preview"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/50 border-gray-200 hover:bg-white/80 transition-all duration-200"
            >
              <UploadCloud className="h-4 w-4 mr-2" />
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

        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium flex items-center text-gray-700"
          >
            <Mail className="h-4 w-4 mr-2 text-primary" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            placeholder="user@example.com"
            className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
            required
          />
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium flex items-center text-gray-700"
          >
            <UserIcon className="h-4 w-4 mr-2 text-primary" />
            Full Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="John Doe"
            className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
            required
          />
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <Label
            htmlFor="role"
            className="text-sm font-medium flex items-center text-gray-700"
          >
            <Shield className="h-4 w-4 mr-2 text-primary" />
            Role & Permissions
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) =>
              setFormData({ ...formData, role: value })
            }
          >
            <SelectTrigger className="bg-white/50 border-gray-200 focus:border-primary">
              <SelectValue placeholder="Select user role" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm">
              <SelectItem
                value="USER"
                className="focus:bg-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span>User</span>
                </div>
              </SelectItem>
              <SelectItem
                value="VENDOR"
                className="focus:bg-blue-50"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Vendor</span>
                </div>
              </SelectItem>
              <SelectItem
                value="ADMIN"
                className="focus:bg-red-50"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Administrator</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground bg-gray-50/50 p-2 rounded-lg">
            {getRoleDescription(formData.role)}
          </p>
        </div>

        {/* Password Field (only for new users) */}
        {!user && (
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium flex items-center text-gray-700"
            >
              <Key className="h-4 w-4 mr-2 text-primary" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              placeholder="Enter secure password"
              className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
              required
            />
            <p className="text-xs text-muted-foreground">
              Password should be at least 8 characters long
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="bg-white/50 border-gray-200 hover:bg-white/80 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button
            type="submit"
            className="sport-gradient shadow-elegant hover:shadow-elegant-lg transform hover:scale-105 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {user ? "Update User" : "Create User"}
              </>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default UserForm;
