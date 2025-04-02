import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const branch = formData.get("branch") as string;
    const semester = formData.get("semester") as string;
    const subject = formData.get("subject") as string;

    if (!file || !branch || !semester || !subject) {
      return NextResponse.json({ 
        success: false, 
        error: "All fields are required" 
      }, { status: 400 });
    }

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        success: false, 
        error: "Only PDF, DOC, DOCX, and TXT files are allowed" 
      }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; 
    if (file.size > maxSize) {
      return NextResponse.json({ 
        success: false, 
        error: "File size must be less than 10MB" 
      }, { status: 400 });
    }

    const originalFileName = file.name;
    const sanitizedSubject = subject.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedBranch = branch.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    
    const cloudinaryFileName = `${sanitizedSubject}_${sanitizedBranch}_${semester}_${timestamp}`;

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");
    const mimeType = file.type;

    const uploadResult = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64File}`, 
      {
        folder: "beu_exam_prep/pdfs",
        public_id: cloudinaryFileName,
        resource_type: "raw",
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      }
    );

    const uploadedPdf = await prisma.pdfUpload.create({
      data: {
        filename: originalFileName,
        file_url: uploadResult.secure_url,
        branch,
        semester,
        subject,
      },
    });

    return NextResponse.json({ 
      success: true, 
      pdf: uploadedPdf,
      message: "File uploaded successfully!"
    });

  } catch (error) {
    console.error("Upload error:", error);
    
    if (error instanceof Error && error.message.includes('Invalid image file')) {
      return NextResponse.json({ 
        success: false, 
        error: "Invalid file format. Please upload a valid PDF, DOC, DOCX, or TXT file." 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Upload failed. Please try again." 
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const branch = searchParams.get('branch');
    const semester = searchParams.get('semester');
    const subject = searchParams.get('subject');

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (branch) where.branch = branch;
    if (semester) where.semester = semester;
    if (subject) where.subject = { contains: subject, mode: 'insensitive' };

    const totalCount = await prisma.pdfUpload.count({ where });

    const uploads = await prisma.pdfUpload.findMany({
      where,
      orderBy: { uploaded_at: 'desc' },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      uploads,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });

  } catch (error) {
    console.error("Error fetching uploads:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to fetch uploads" 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Upload ID is required" },
        { status: 400 }
      );
    }

    await prisma.pdfUpload.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Upload deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting upload:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to delete upload" 
      },
      { status: 500 }
    );
  }
} 