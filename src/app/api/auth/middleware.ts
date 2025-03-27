import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  try {
    verify(token, SECRET_KEY); 
    return NextResponse.next(); 
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  } 
}

export const config = {
  matcher: ["admin/:path*"], 
};
