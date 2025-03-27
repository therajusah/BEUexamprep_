

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    console.log("Received Data:", { name, email, password });

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Registration failed", error }, { status: 500 });
  }
}
