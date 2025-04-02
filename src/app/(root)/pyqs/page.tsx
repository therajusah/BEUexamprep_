"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Download, FileText, Calendar, BookOpen } from "lucide-react";

interface Papers {
  id: string;
  subject: string;
  branch: string;
  semester: string;
  file_url: string;
  filename: string;
  uploaded_at: string;
}

export default function PYQsPage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [papers, setPapers] = useState<Papers[]>([]);
  const [loading, setLoading] = useState(false);

  const branches = [
    "Computer Science",
    "Electronics and Communication Engineering", 
    "Electrical Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering"
  ];
  
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const fetchPapers = async () => {
    if (!branch || !semester) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/files?branch=${encodeURIComponent(
          branch
        )}&semester=${encodeURIComponent(semester)}`
      );
      const data = await response.json();
      if (data.success) {
        setPapers(data.files || []);
      }
    } catch (error) {
      console.error("Error fetching PYQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = () => {
    const sizes = ["2.5 MB", "3.1 MB", "2.8 MB", "3.3 MB", "2.7 MB", "3.5 MB"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generateFileName = (subject: string, semester: string) => {
    const cleanSubject = subject.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    const cleanSemester = semester.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    return `${cleanSubject}_${cleanSemester}.pdf`;
  };

    const handlePreview = (fileUrl: string) => {
    // Open PDF in new tab for viewing/preview (not download)
    // Add #view=FitH to ensure it opens in browser for viewing
    const previewUrl = `${fileUrl}#view=FitH`;
    window.open(previewUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = async (fileUrl: string, subject: string, semester: string) => {
    try {
      // Fetch the file as blob
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Failed to fetch file');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = generateFileName(subject, semester);
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Download failed:', error);
      
      // Fallback: Force download using direct link with download attribute
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = generateFileName(subject, semester);
      a.style.display = 'none';
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Select onValueChange={setBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s} Semester
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                className="w-full md:w-auto" 
                onClick={fetchPapers}
                disabled={!branch || !semester || loading}
              >
                {loading ? "Searching..." : "Search PYQs"}
              </Button>
            </div>

            {branch && semester && (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="all">All PYQs</TabsTrigger>
                  <TabsTrigger value="recent">Recent Papers</TabsTrigger>
                  <TabsTrigger value="popular">Most Downloaded</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                      <p className="text-muted-foreground mt-4">Loading PYQs...</p>
                    </div>
                  ) : papers.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {papers.map((paper) => (
                        <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              {paper.subject}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 mb-4">
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                {paper.branch}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Semester: {paper.semester}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {formatDate(paper.uploaded_at)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Type: PDF | Size: {formatFileSize()}
                              </p>
                            </div>
                            <div className="flex justify-between gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handlePreview(paper.file_url)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleDownload(paper.file_url, paper.subject, paper.semester)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No PYQs found for {branch} - {semester} Semester.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Try selecting different branch or semester.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="recent" className="mt-0">
                  {papers.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {papers
                        .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime())
                        .slice(0, 6)
                        .map((paper) => (
                          <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                {paper.subject}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 mb-4">
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                  <BookOpen className="h-4 w-4" />
                                  {paper.branch}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Semester: {paper.semester}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(paper.uploaded_at)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Type: PDF | Size: {formatFileSize()}
                                </p>
                              </div>
                                                             <div className="flex justify-between gap-2">
                                 <Button 
                                   variant="outline" 
                                   size="sm"
                                   onClick={() => handlePreview(paper.file_url)}
                                 >
                                   <Eye className="mr-2 h-4 w-4" />
                                   Preview
                                 </Button>
                                 <Button 
                                   size="sm"
                                   onClick={() => handleDownload(paper.file_url, paper.subject, paper.semester)}
                                 >
                                   <Download className="mr-2 h-4 w-4" />
                                   Download
                                 </Button>
                               </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No recent papers available for this selection.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Popular papers feature coming soon!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      We&apos;re working on to show the most downloaded papers.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
