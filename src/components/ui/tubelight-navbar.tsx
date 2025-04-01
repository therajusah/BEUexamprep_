"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Home, BookOpen, FileText, MessageSquare, Code, Brain } from 'lucide-react'

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  isNew?: boolean
}

interface NavBarProps {
  className?: string
}

const defaultNavItems: NavItem[] = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Notes', url: '/notes', icon: BookOpen },
  { name: 'PYQs', url: '/pyqs', icon: FileText },
  { name: 'Blogs', url: '/blogs', icon: MessageSquare },
  { name: 'Coding Practice', url: '/coding-practice', icon: Code },
  { name: 'AI Interview', url: 'https://you-prep.vercel.app/', icon: Brain, isNew: true }
]

export function NavBar({ className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(defaultNavItems[0].name)

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/80 dark:bg-background/80 border border-gray-200 dark:border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {defaultNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-gray-700 dark:text-foreground/80 hover:text-blue-600 dark:hover:text-primary",
                isActive && "bg-blue-50 dark:bg-muted text-blue-600 dark:text-primary",
              )}
            >
              <span className="hidden md:inline flex items-center gap-2">
                {item.name}
                {item.isNew && (
                  <sup className="text-xs text-blue-500 dark:text-blue-400 italic">new</sup>
                )}
              </span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-blue-100/50 dark:bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 dark:bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-500/20 dark:bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-500/20 dark:bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-500/20 dark:bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
} 