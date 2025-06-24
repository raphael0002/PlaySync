"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "@/store";
import {
  setUser,
  clearUser,
} from "@/store/slices/userSlice";
import TurfLoader from "@/components/loaders/TurfLoader";
import { axiosInstance } from "@/lib/api/axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/auth/verify",
          {
            withCredentials: true,
          }
        );
        const verifiedUser = response.data.data.user;

        if (isMounted) {
          if (!allowedRoles.includes(verifiedUser.role)) {
            dispatch(clearUser());
            router.push("/login");
          } else {
            dispatch(setUser(verifiedUser));
            setIsVerifying(false);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error verifying token:", error);
          dispatch(clearUser());
          setError("Authentication failed");
          setTimeout(() => {
            router.push("/login");
          }, 1000); // Delay redirect to avoid rapid navigation issues
        }
      }
    };

    if (!user) {
      verifyToken();
    } else if (!allowedRoles.includes(user.role)) {
      dispatch(clearUser());
      router.push("/login");
    } else {
      setIsVerifying(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user, router, allowedRoles, dispatch]);

  if (isVerifying || !user) {
    return <TurfLoader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return <>{children}</>;
};
