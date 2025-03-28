-- CreateTable
CREATE TABLE "PdfUpload" (
    "id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PdfUpload_pkey" PRIMARY KEY ("id")
);
