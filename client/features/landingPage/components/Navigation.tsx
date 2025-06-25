"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RootState, AppDispatch } from "@/store";
import {
  setUser,
  clearUser,
} from "@/store/slices/userSlice";
import { getCookie } from "@/lib/cookieUtils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(
    (state: RootState) => state.user
  );

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

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl sport-gradient flex items-center justify-center">
              {!logoError ? (
                <Image
                  src="/assets/logo.svg"
                  alt="PlaySync Logo"
                  width={36}
                  height={36}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-9 h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-sm">
                    Logo
                  </span>
                </div>
              )}
            </div>
            <span className="ml-3 text-2xl font-bold font-poppins bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
              PlaySync
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Contact
            </Link>
            {user ? (
              <Link
                href={`/dashboard/${user.role.toLowerCase()}`}
              >
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 font-medium"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="sport-gradient hover:opacity-90 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                href="/about"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4 py-2"
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4 py-2"
              >
                Features
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4 py-2"
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-4">
                {user ? (
                  <Link href="/dashboard/user">
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 w-full"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 w-full"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="sport-gradient hover:opacity-90 w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
