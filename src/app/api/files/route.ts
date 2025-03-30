import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const branch = url.searchParams.get("branch");
  const semester = url.searchParams.get("semester");

  try {
    const files = await prisma.pdfUpload.findMany({
      where: {
        branch: branch || undefined,
        semester: semester || undefined,
      },
      orderBy: { uploaded_at: "desc" },
    });
    
    return NextResponse.json({ success: true, files });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
  }
}
