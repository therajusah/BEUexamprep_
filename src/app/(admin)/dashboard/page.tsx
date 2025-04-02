"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import BranchSemesterSelect from "../../../components/BranchsemesterSelect";
import { 
  UploadCloud, 
  LogOut, 
  User, 
  FileText, 
  Upload,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../../hooks/useAuth";

export default function AdminDashboard() {
  const { adminData, isAuthenticated, loading, logout } = useAuth();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<{
    totalUploads: number;
    branchStats: Array<{ branch: string; count: number }>;
    semesterStats: Array<{ semester: string; count: number }>;
    recentUploads: Array<{
      id: string;
      filename: string;
      branch: string;
      semester: string;
      subject: string;
      uploaded_at: string;
    }>;
  } | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setDashboardLoading(false);
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!branch || !semester || !subject || !file) {
      toast.error("Please fill all fields and select a file");
      return;
    }

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message || "File uploaded successfully!");
        setUploadSuccess(true);
        setFile(null);
        setSubject("");
        setBranch("");
        setSemester("");
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        
     
        fetchDashboardData();
        
     
        console.log("Upload successful:", {
          filename: data.pdf?.filename,
          subject: data.pdf?.subject,
          branch: data.pdf?.branch,
          semester: data.pdf?.semester,
          url: data.pdf?.file_url
        });
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Upload failed. Please check your connection and try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">Please sign in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  BEUexamprep Admin
                </h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Dashboard
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span>Welcome, {adminData?.name}</span>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Uploads</p>
                  <p className="text-3xl font-bold">
                    {dashboardLoading ? "..." : dashboardData?.totalUploads || 0}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Branches Covered</p>
                  <p className="text-3xl font-bold">
                    {dashboardLoading ? "..." : dashboardData?.branchStats?.length || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Semesters</p>
                  <p className="text-3xl font-bold">
                    {dashboardLoading ? "..." : dashboardData?.semesterStats?.length || 0}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <Upload className="h-6 w-6" />
              <span>Upload Previous Year Questions</span>
            </CardTitle>
            <p className="text-indigo-100">Add new study materials for students</p>
          </CardHeader>

          <CardContent className="p-8">
            {uploadSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span>File uploaded successfully! Students can now access this material.</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                    Academic Details
                  </Label>
                  <BranchSemesterSelect 
                    branch={branch}
                    semester={semester}
                    onBranchChange={setBranch}
                    onSemesterChange={setSemester}
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject Name *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="e.g., Data Structures, Database Management"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-2 h-12"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload File *
                </Label>
                
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                    file 
                      ? 'border-green-300 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:border-gray-600'
                  }`}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  {file ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                      <p className="text-green-700 dark:text-green-400 font-medium">
                        {file.name}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-500">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <UploadCloud className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        PDF, DOC, DOCX, TXT files supported
                      </p>
                    </div>
                  )}

                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </div>

                {!branch || !semester || !subject ? (
                  <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Please fill all required fields</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleUpload}
                disabled={uploadLoading || !branch || !semester || !subject || !file}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Upload File</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 