
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function PYQsPage() {
  const [branch, setBranch] = useState("")
  const [semester, setSemester] = useState("")

  const branches = ["Computer Science", "Electronics and Communication Engineering", "Electrical Engineering", "Electrical and Electronics Engineering", "Mechanical Engineering", "Civil Engineering"]
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

  const papers = [
    { id: 1, title: "Data Structures and Algorithms", year: 2022 },
    { id: 2, title: "Database Management Systems", year: 2022 },
    { id: 3, title: "Operating Systems", year: 2021 },
    { id: 4, title: "Computer Networks", year: 2021 },
  ]

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
              <Button className="w-full md:w-auto">Search PYQs</Button>
            </div>
            {branch && semester && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {papers.map((paper) => (
                  <Card key={paper.id}>
                    <CardHeader>
                      <CardTitle>{paper.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Year: {paper.year}</p>
                      <Button className="mt-4">Download PDF</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
    </div>
  )
}