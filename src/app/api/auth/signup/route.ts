import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password, secretCode } = await req.json();

    console.log("Received Data:", { name, email, password, secretCode });

    if (!name || !email || !password || !secretCode) {
      return NextResponse.json({ success: false, message: "Missing fields including secret code" }, { status: 400 });
    }

    const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE || "BEU2024ADMIN";
    if (secretCode !== ADMIN_SECRET_CODE) {
      return NextResponse.json({ success: false, message: "Invalid secret code" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, admin });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Registration failed", error }, { status: 500 });
  }
}
