import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const branch = searchParams.get('branch');
    const semester = searchParams.get('semester');
    const subject = searchParams.get('subject');

    
    const where: Record<string, unknown> = {};
    if (branch) where.branch = branch;
    if (semester) where.semester = semester;
    if (subject) where.subject = { contains: subject, mode: 'insensitive' };

    
    const files = await prisma.pdfUpload.findMany({
      where,
      orderBy: { uploaded_at: 'desc' },
      select: {
        id: true,
        filename: true,
        file_url: true,
        branch: true,
        semester: true,
        subject: true,
        uploaded_at: true,
      },
    });

    return NextResponse.json({
      success: true,
      files,
      count: files.length,
    });

  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to fetch files" 
      },
      { status: 500 }
    );
  }
}
