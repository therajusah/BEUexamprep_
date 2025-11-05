import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password, secretCode } = await req.json();

    // Validate all required fields
    if (!name || !email || !password || !secretCode) {
      return NextResponse.json({
        success: false,
        message: "All fields are required including admin secret code"
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: "Invalid email format"
      }, { status: 400 });
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        message: "Password must be at least 6 characters long"
      }, { status: 400 });
    }

    // Verify admin secret code - ONLY admins can create accounts
    const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE || "BEU2024ADMIN";
    if (secretCode !== ADMIN_SECRET_CODE) {
      return NextResponse.json({
        success: false,
        message: "Invalid admin secret code. Only authorized admins can create accounts."
      }, { status: 401 });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: "An admin account with this email already exists"
      }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin account
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    console.log("Admin account created successfully:", admin.email);

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully",
      admin
    }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);

    // Handle Prisma unique constraint errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({
        success: false,
        message: "An admin account with this email already exists"
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      message: "Registration failed. Please try again."
    }, { status: 500 });
  }
}
