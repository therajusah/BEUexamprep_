import {  NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    // Get dashboard statistics
    const totalUploads = await prisma.pdfUpload.count();
    
    // Get uploads by branch
    const uploadsByBranch = await prisma.pdfUpload.groupBy({
      by: ['branch'],
      _count: {
        id: true,
      },
    });

    // Get uploads by semester
    const uploadsBySemester = await prisma.pdfUpload.groupBy({
      by: ['semester'],
      _count: {
        id: true,
      },
    });

    // Get recent uploads
    const recentUploads = await prisma.pdfUpload.findMany({
      orderBy: { uploaded_at: 'desc' },
      take: 5,
    });

    // Format the data for the dashboard
    const branchStats = uploadsByBranch.map(item => ({
      branch: item.branch,
      count: item._count.id,
    }));

    const semesterStats = uploadsBySemester.map(item => ({
      semester: item.semester,
      count: item._count.id,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalUploads,
        branchStats,
        semesterStats,
        recentUploads,
      },
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to fetch dashboard data" 
      },
      { status: 500 }
    );
  }
}
