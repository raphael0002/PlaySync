"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Import Image component
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
  DialogClose,
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
  LandPlot,
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCookie } from "@/lib/cookieUtils";
import {
  clearUser,
  setUser,
} from "@/store/slices/userSlice";

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
    name: "Venues",
    href: "/dashboard/admin/venues",
    icon: LandPlot,
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
    name: "Profile",
    href: "/dashboard/admin/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export const AdminSidebar = ({
  className,
  isOpen,
  setIsOpen,
}: {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);
  const { logout, isLoading } = useLogout();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        dispatch(setUser(userData));
      } catch (error) {
        console.error(
          "Failed to parse user cookie:",
          error
        );
        dispatch(clearUser());
      }
    } else {
      dispatch(clearUser());
    }
  }, [dispatch]);

  console.log(user);
  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col z-20",
        isOpen ? "w-72" : "w-20",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  A
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Admin Panel
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen ? "Collapse sidebar" : "Expand sidebar"
            }
          >
            <Menu className="h-4 w-4 text-gray-800 dark:text-gray-200" />
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
                  "w-full flex items-center rounded-lg transition-all duration-200 group relative",
                  isOpen
                    ? "px-3 py-3 my-2"
                    : "px-0 py-3 my-2 justify-center",
                  isActive
                    ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                  )}
                />
                {isOpen && (
                  <span
                    className={cn(
                      "ml-3 font-medium text-sm transition-colors",
                      isActive
                        ? "text-green-600"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {item.name}
                  </span>
                )}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                    {item.name}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                  </div>
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer with User Profile Dropdown */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {isOpen ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                {user?.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={user.name || "Admin User"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white">
                    {user?.name?.charAt(0) || "AU"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="User menu"
                >
                  <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 border-gray-200 dark:border-gray-700"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "admin@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
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
                  <DialogContent className="sm:max-w-[425px] w-[95vw] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 text-sm transition-all duration-200"
                          aria-label="Cancel logout"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={logout}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm transition-all duration-200"
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
        ) : (
          <div className="flex flex-col items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative"
                  aria-label="User menu"
                >
                  <Avatar className="w-6 h-6">
                    {user?.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.name || "Admin User"}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white text-xs">
                        {user?.name?.charAt(0) || "AU"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                    User Menu
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 border-gray-200 dark:border-gray-700"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "admin@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
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
                  <DialogContent className="sm:max-w-[425px] w-[95vw] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 text-sm transition-all duration-200"
                          aria-label="Cancel logout"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={logout}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm transition-all duration-200"
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

export default AdminSidebar;
