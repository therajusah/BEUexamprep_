import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prisma";
import { sign } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "7061"; 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required"
      }, { status: 400 });
    }

    // Only check in Admin table
    const admin = await prisma.admin.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      }
    });

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Admin account not found. Only admins can sign in."
      }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials"
      }, { status: 401 });
    }

    // Include admin name in JWT payload
    const token = sign({
      userId: admin.id,
      email: admin.email,
      name: admin.name || "Admin"
    }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({
      success: false,
      message: "Login failed. Please try again."
    }, { status: 500 });
  }
}
