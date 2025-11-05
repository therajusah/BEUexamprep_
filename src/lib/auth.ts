import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "7061";

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function verifyAuth(req: NextRequest): JWTPayload | null {
  try {
    let token = req.cookies.get("token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return null;
    }

    const decoded = verify(token, SECRET_KEY) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}

export function createUnauthorizedResponse() {
  return Response.json(
    {
      success: false,
      error: "Unauthorized. Please sign in to access this resource."
    },
    { status: 401 }
  );
}
