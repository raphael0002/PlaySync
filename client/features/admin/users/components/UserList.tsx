"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import UserForm from "./UserForm";
import { toast } from "react-toastify";
import { useUsers } from "../hooks/useUsers";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const router = useRouter();
  const { data: users, isLoading, error } = useUsers();

  if (error) {
    toast.error("Failed to fetch users");
  }

  const filteredUsers = users?.filter(
    (user) =>
      (user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        user.name
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter)
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "VENDOR":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="h-screen flex flex-col space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex flex-col">
          <h1 className="md:h-10 text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage users and their permissions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </DialogTrigger>
          <UserForm />
        </Dialog>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 py-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200 text-sm"
          />
        </div>
        <Select
          value={roleFilter}
          onValueChange={setRoleFilter}
        >
          <SelectTrigger className="w-full py-5 sm:w-40 md:w-72 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-green-500 text-sm">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="USER">Users</SelectItem>
            <SelectItem value="ADMIN">Admins</SelectItem>
            <SelectItem value="VENDOR">Vendors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-4 sm:p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs">
                Total Users
              </p>
              <p className="text-lg sm:text-xl font-bold">
                {users?.length || 0}
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg p-4 sm:p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs">
                Active Admins
              </p>
              <p className="text-lg sm:text-xl font-bold">
                {users?.filter((u) => u.role === "ADMIN")
                  .length || 0}
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-4 sm:p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs">
                Vendors
              </p>
              <p className="text-lg sm:text-xl font-bold">
                {users?.filter((u) => u.role === "VENDOR")
                  .length || 0}
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 md:max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-400px)] max-h-[calc(100vh-520px)] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="max-h-[calc(100vh-400px)] sm:max-h-[calc(100vh-350px)] overflow-y-auto overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-700 z-10">
              <TableRow>
                <TableHead className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 sm:py-3">
                  User
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                  Email
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                  Role
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">
                  Created
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 sm:py-8"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Loading users...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : !users || filteredUsers?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 sm:py-8"
                  >
                    <div className="text-gray-500 dark:text-gray-400">
                      <svg
                        className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-gray-400 dark:text-gray-500 mb-2 sm:mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      <p className="text-sm sm:text-base font-medium">
                        No users found
                      </p>
                      <p className="text-xs sm:text-sm">
                        Try adjusting your search or filter
                        criteria
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers?.map((user, index) => (
                  <TableRow
                    key={user.id}
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/users/${user.id}`
                      )
                    }
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <TableCell className="py-2 sm:py-3 px-3 sm:px-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        {user.profileImage ? (
                          <Image
                            src={user.profileImage}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                            {user.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="block md:hidden">
                          <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                          <span
                            className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                              user.role
                            )} mt-1`}
                          >
                            {user.role}
                          </span>
                        </div>
                        <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white hidden md:block">
                          {user.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 px-3 sm:px-4 hidden md:table-cell">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {user.email}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 px-3 sm:px-4 hidden sm:table-cell">
                      <span
                        className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 px-3 sm:px-4 hidden lg:table-cell">
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 px-3 sm:px-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
