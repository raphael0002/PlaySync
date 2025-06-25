"use client";

import { SignupForm } from "@/features/auth";
import { ReduxProvider } from "@/store/provider";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <ReduxProvider>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Link href="/">
          <div className="flex items-center absolute top-4 left-4">
            <Image
              src="/assets/logo.svg"
              alt="PlaySync Logo"
              width={36}
              height={36}
            />
            <span className="ml-3 text-2xl font-bold font-poppins bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
              PlaySync
            </span>
          </div>
        </Link>
        <SignupForm />
      </div>
    </ReduxProvider>
  );
}
