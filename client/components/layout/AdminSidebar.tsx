"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Menu,
  User,
  Users,
  Calendar,
  DollarSign,
  Settings,
  HomeIcon,
  LogOut,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/features/auth/hooks/useLogout";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard/admin",
    icon: HomeIcon,
  },
  {
    name: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    name: "Bookings",
    href: "/dashboard/admin/bookings",
    icon: Calendar,
  },
  {
    name: "Finance",
    href: "/dashboard/admin/finance",
    icon: DollarSign,
  },
  {
    name: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/dashboard/admin/profile",
    icon: User,
  },
];

export const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState(
    "/dashboard/admin"
  );
  const [isOpen, setIsOpen] = useState(true);
  const { logout, isLoading } = useLogout();

  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <aside
      className={cn(
        "bg-white/50 backdrop-blur-xl border-r border-gray-200/60 h-screen transition-all duration-300 ease-in-out flex flex-col relative z-10",
        isOpen ? "w-72" : "w-20"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200/40">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  A
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                Admin Panel
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:bg-gray-100/70 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen ? "Collapse sidebar" : "Expand sidebar"
            }
          >
            <Menu className="h-4 w-4 text-gray-800" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <button
                onClick={() => handleItemClick(item.href)}
                className={cn(
                  "w-full flex items-center rounded-xl transition-all duration-200 group relative",
                  isOpen
                    ? "px-4 py-3"
                    : "px-0 py-3 justify-center",
                  isActive
                    ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/70"
                )}
                aria-label={item.name}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-r-full" />
                )}
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-green-600"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {isOpen && (
                  <span
                    className={cn(
                      "ml-3 font-medium text-sm transition-colors",
                      isActive
                        ? "text-green-600"
                        : "text-gray-700"
                    )}
                  >
                    {item.name}
                  </span>
                )}
                {!isOpen && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.name}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer with User Profile Dropdown */}
      <div className="p-4 border-t border-gray-200/40">
        {isOpen ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white">
                    AU
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    admin@example.com
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100/70 transition-colors"
                    aria-label="User menu"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 ml-[19rem] -mb-8 border-gray-200/40"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Admin User
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200/40" />
                  <Link href="/">
                    <DropdownMenuItem>
                      <HomeIcon className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </DropdownMenuItem>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="text-red-600 focus:text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Confirm Logout
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to log out?
                          You will be redirected to the
                          homepage.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {}}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={logout}
                          disabled={isLoading}
                        >
                          {isLoading
                            ? "Logging out..."
                            : "Log out"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 hover:bg-gray-100/70 transition-colors group relative"
                  aria-label="User menu"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white text-xs">
                      AU
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    User Menu
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 ml-24 -mb-8 border-gray-200/40"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200/40" />
                <Link href="/">
                  <DropdownMenuItem>
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </DropdownMenuItem>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        Confirm Logout
                      </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to log out?
                        You will be redirected to the
                        homepage.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {}}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={logout}
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Logging out..."
                          : "Log out"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </aside>
  );
};
