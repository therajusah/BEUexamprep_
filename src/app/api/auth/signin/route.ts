import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prisma";
import { sign } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "7061"; 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
    const token = sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Login failed", error}, { status: 500 });
  }
}
