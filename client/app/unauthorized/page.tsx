"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          Unauthorized
        </h1>
        <p className="text-muted-foreground mb-6">
          You do not have permission to
          access this page.
        </p>
        <Button
          onClick={() =>
            router.push("/login")
          }
          className="bg-primary text-primary-foreground rounded-md py-3 font-semibold hover:bg-primary/90"
        >
          Return to Login
        </Button>
      </Card>
    </div>
  );
}
