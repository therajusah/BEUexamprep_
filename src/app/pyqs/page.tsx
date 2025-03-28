"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BranchSemesterSelect from "@/components/BranchsemesterSelect";


interface Papers {
  id: number;
  subject: string;
  branch: string;
  semester: string;
  file_url: string;
}

export default function PYQsPage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [papers, setPapers] = useState([]);

  const fetchPapers = async () => {
    if (!branch || !semester) return;

    try {
      const response = await fetch(
        `/api/files?branch=${encodeURIComponent(
          branch
        )}&semester=${encodeURIComponent(semester)}`
      );
      const data = await response.json();
      if (data.success) {
        setPapers(data.files);
      }
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Previous Year Questions (PYQs)
            </h1>

            <div className="flex space-x-16">
            <BranchSemesterSelect
              branch={branch}
              semester={semester}
              onBranchChange={setBranch}
              onSemesterChange={setSemester}
            />

            <Button className="w-full md:w-auto" onClick={fetchPapers}>
              Search PYQs
            </Button>
            </div>

            {papers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {papers.map((paper: Papers) => (
                  <Card key={paper.id}>
                    <CardHeader>
                      <CardTitle>{paper.subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Branch: {paper.branch}</p>
                      <p>Semester: {paper.semester}</p>
                      <Button className="mt-4" asChild>
                        <a
                          href={paper.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              branch &&
              semester && (
                <p className="text-center text-gray-500 mt-6">
                  No PYQs found for this selection.
                </p>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
