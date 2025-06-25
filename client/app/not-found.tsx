import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">
          404 - Page Not Found
        </h1>
        <p className="text-muted-foreground mt-2">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/dashboard/admin"
          className="mt-4 inline-block text-primary hover:underline"
        >
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
