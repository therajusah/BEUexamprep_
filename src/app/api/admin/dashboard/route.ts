import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");

    const uploadResult = await cloudinary.uploader.upload(`data:application/pdf;base64,${base64File}`, {
      folder: "pdf_uploads",
      resource_type: "raw",
    });

    const uploadedPdf = await prisma.pdfUpload.create({
      data: {
        file_url: uploadResult.secure_url,
        branch,
        semester,
        subject,
      },
    });

    return NextResponse.json({ success: true, pdf: uploadedPdf });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
