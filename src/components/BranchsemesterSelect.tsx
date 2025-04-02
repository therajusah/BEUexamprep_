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
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Branch *
        </label>
        <Select onValueChange={onBranchChange} value={branch}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent className="z-50 max-h-[200px]">
            {branches.map((b) => (
              <SelectItem key={b} value={b} className="cursor-pointer">
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Semester *
        </label>
        <Select onValueChange={onSemesterChange} value={semester}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent className="z-40 max-h-[200px]">
            {semesters.map((s) => (
              <SelectItem key={s} value={s} className="cursor-pointer">
                {s} Semester
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
