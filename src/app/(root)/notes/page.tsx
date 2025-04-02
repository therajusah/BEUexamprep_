"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Download } from "lucide-react"
export default function NotesPage() {
  const [branch, setBranch] = useState("")
  const [semester, setSemester] = useState("")

  const branches = ["Computer Science", "Electronics and Communication Engineering", "Electrical Engineering", "Electrical and Electronics Engineering", "Mechanical Engineering", "Civil Engineering"]
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

  const notes = [
    { id: 1, title: "Data Structures and Algorithms", type: "PDF", size: "2.5 MB" },
    { id: 2, title: "Database Management Systems", type: "PDF", size: "3.1 MB" },
    { id: 3, title: "Operating Systems", type: "PDF", size: "2.8 MB" },
    { id: 4, title: "Computer Networks", type: "PDF", size: "3.3 MB" },
    { id: 5, title: "Software Engineering", type: "PDF", size: "2.7 MB" },
    { id: 6, title: "Web Development", type: "PDF", size: "3.5 MB" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Course Notes
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
              <Button className="w-full md:w-auto">Search Notes</Button>
            </div>
            {branch && semester && (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="all">All Notes</TabsTrigger>
                  <TabsTrigger value="lecture">Lectures</TabsTrigger>
                  <TabsTrigger value="reference">Reference Materials</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                      <Card key={note.id}>
                        <CardHeader>
                          <CardTitle>{note.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Type: {note.type} | Size: {note.size}
                          </p>
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                            <Button size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="lecture" className="mt-0">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Select a branch and semester to view lecture notes.</p>
                  </div>
                </TabsContent>
                <TabsContent value="reference" className="mt-0">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Select a branch and semester to view reference materials.</p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}