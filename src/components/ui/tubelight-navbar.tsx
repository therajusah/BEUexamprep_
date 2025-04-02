"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Home, BookOpen, FileText, MessageSquare, Code, Brain, Menu, X } from 'lucide-react'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleItemClick = (itemName: string) => {
    setActiveTab(itemName)
    setIsMobileMenuOpen(false)
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6",
        className,
      )}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3 bg-white/80 dark:bg-background/80 border border-gray-200 dark:border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {defaultNavItems.map((item) => {
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
              <span className="flex items-center gap-2">
                {item.name}
                {item.isNew && (
                  <sup className="text-xs text-blue-500 dark:text-blue-400 italic">new</sup>
                )}
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

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMobileMenu}
          className={cn(
            "relative p-3 rounded-full backdrop-blur-lg shadow-lg transition-all duration-300",
            "bg-gradient-to-r from-blue-500 to-teal-400 text-white",
            "hover:from-blue-600 hover:to-teal-500",
            "active:scale-95"
          )}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.3
              }}
              className="absolute top-full mt-2 right-0 w-64 bg-white/90 dark:bg-background/90 backdrop-blur-lg border border-gray-200 dark:border-border rounded-2xl shadow-xl overflow-hidden"
            >
              {defaultNavItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.url}
                      onClick={() => handleItemClick(item.name)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-all duration-200",
                        "text-gray-700 dark:text-foreground/80 hover:bg-blue-50 dark:hover:bg-muted/50",
                        "hover:text-blue-600 dark:hover:text-primary",
                        isActive && "bg-gradient-to-r from-blue-50 to-teal-50 dark:from-primary/10 dark:to-primary/5 text-blue-600 dark:text-primary",
                        "border-b border-gray-100 dark:border-border/50 last:border-b-0"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive 
                          ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white" 
                          : "bg-gray-100 dark:bg-muted"
                      )}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        {item.isNew && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full">
                            new
                          </span>
                        )}
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="mobile-indicator"
                          className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 