import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "Effective Study Techniques for University Exams",
      excerpt: "Discover the most effective study techniques to help you ace your university exams.",
      date: "May 15, 2023",
    },
    {
      id: 2,
      title: "Mastering Data Structures: A Comprehensive Guide",
      excerpt: "Learn how to implement and utilize various data structures to improve your coding skills.",
      date: "May 10, 2023",
    },
    {
      id: 3,
      title: "Time Management Tips for Busy Students",
      excerpt: "Practical advice on how to balance your studies, social life, and personal time effectively.",
      date: "May 5, 2023",
    },
    {
      id: 4,
      title: "Preparing for Coding Interviews: What You Need to Know",
      excerpt: "Essential tips and strategies to help you succeed in technical interviews for software engineering positions.",
      date: "April 30, 2023",
    },
    {
      id: 5,
      title: "Understanding Machine Learning Algorithms",
      excerpt: "An introduction to popular machine learning algorithms and their applications in real-world scenarios.",
      date: "April 25, 2023",
    },
    {
      id: 6,
      title: "The Importance of Soft Skills in Tech Careers",
      excerpt: "Explore why soft skills are crucial for success in the tech industry and how to develop them.",
      date: "April 20, 2023",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Latest Blogs
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Card key={blog.id}>
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{blog.date}</span>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}