import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "7061";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  let token = req.cookies.get("token")?.value;
  
  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // Check if user is authenticated
  let isAuthenticated = false;
  if (token) {
    try {
      verify(token, SECRET_KEY);
      isAuthenticated = true;
    } catch (error) {
      // Token is invalid, remove it
      isAuthenticated = false;
    }
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup');
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Check if this is an admin route that requires authentication
  const isAdminRoute = pathname.startsWith('/admin') || 
                      pathname.startsWith('/dashboard') ||
                      pathname.includes('admin');

  if (isAdminRoute && !isAuthenticated) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}; 