import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

function StackedCircularFooter() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-primary/10 p-8">
            <Icons.logo className="w-12 h-12" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/notes" className="hover:text-primary transition-colors">Notes</Link>
            <Link href="/pyqs" className="hover:text-primary transition-colors">PYQs</Link>
            <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            <Link href="/coding-practice" className="hover:text-primary transition-colors">Coding Practice</Link>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 BEU Exam Prep. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter } 