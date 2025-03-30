"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const branches = [
  "Computer Science",
  "Electronics and Communication Engineering",
  "Electrical Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
]
const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

interface Props {
  branch: string
  semester: string
  onBranchChange: (value: string) => void
  onSemesterChange: (value: string) => void
}

export default function BranchSemesterSelect({ branch, semester, onBranchChange, onSemesterChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Select onValueChange={onBranchChange} value={branch}>
        <SelectTrigger className="w-sm">
          <SelectValue placeholder="Select Branch" />
        </SelectTrigger>
        <SelectContent >
          {branches.map((b) => (
            <SelectItem key={b} value={b}>
              {b}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onSemesterChange} value={semester}>
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
    </div>
  )
}
