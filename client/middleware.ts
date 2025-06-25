import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const publicRoutes = ["/", "/home", "/login", "/signup"];
const protectedRoutes = {
  "/dashboard/user": ["USER"],
  "/dashboard/admin": ["ADMIN"],
  "/dashboard/vendor": ["VENDOR"],
  "/profile": ["USER", "ADMIN", "VENDOR"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  // Allow public routes without token verification
  if (publicRoutes.includes(pathname)) {
    // Clear stale token if present
    response.cookies.delete("token");
    return response;
  }

  const token = request.cookies.get("token")?.value;

  // Check if the route is protected
  const requiredRoles = Object.entries(
    protectedRoutes
  ).find(([route]) => pathname.startsWith(route))?.[1];

  if (!requiredRoles) {
    response.cookies.delete("token");
    return response;
  }

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  try {
    // Verify token for protected routes
    const verifyResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    const userRole = verifyResponse.data.data.user.role;

    if (!requiredRoles.includes(userRole)) {
      response = NextResponse.redirect(
        new URL("/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }

    return response;
  } catch (error) {
    console.error("Middleware verification error:", error);
    response = NextResponse.redirect(
      new URL("/login", request.url)
    );
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile",
    "/login",
    "/signup",
  ],
};
