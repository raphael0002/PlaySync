"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

export const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <Button onClick={logout} variant="outline">
      Logout
    </Button>
  );
};
