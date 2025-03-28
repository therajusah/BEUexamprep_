"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import BranchSemesterSelect from "@/components/BranchsemesterSelect";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!branch || !semester || !subject || !file) {
      alert(
        "Please select branch, semester, enter subject name, and choose a file before uploading."
      );
      return;
    }

    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("File uploaded successfully!");
        setFile(null);
        setSubject("");
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-x-4 ">
      <Card className="w-full max-w-2xl p-6 shadow-lg rounded-2xl bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Upload PYQs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BranchSemesterSelect
            branch={branch}
            semester={semester}
            onBranchChange={setBranch}
            onSemesterChange={setSemester}
          />

          <div className="mt-4">
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject Name
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1"
            />
          </div>
          <div
            className="mt-6 border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            onClick={() => document.getElementById("fileInput")?.click()} // Trigger file input on click
          >
            <UploadCloud className="h-10 w-10 text-gray-500 dark:text-gray-400" />
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Click to upload or drag & drop
            </p>

            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />

            {file && (
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {file.name}
              </p>
            )}
          </div>

          <Button
            className="mt-6 w-full bg-teal-400 hover:bg-teal-600 text-white transition"
            onClick={handleUpload}
          >

            Upload File
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
