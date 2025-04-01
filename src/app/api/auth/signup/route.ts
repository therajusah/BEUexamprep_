

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, secretCode } = await req.json();

    console.log("Received Data:", { name, email, password, secretCode });

    if (!name || !email || !password || !secretCode) {
      return NextResponse.json({ success: false, message: "Missing fields including secret code" }, { status: 400 });
    }

    // Check secret code
    const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE || "BEU2024ADMIN";
    if (secretCode !== ADMIN_SECRET_CODE) {
      return NextResponse.json({ success: false, message: "Invalid secret code" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
      },
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Registration failed", error }, { status: 500 });
  }
}
