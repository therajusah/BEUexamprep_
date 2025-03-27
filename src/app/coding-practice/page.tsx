import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Terminal, Globe, Cpu } from "lucide-react"

export default function CodingPracticePage() {
  const learningPaths = [
    {
      title: "Learn Coding",
      description: "Start your coding journey from scratch",
      icon: Terminal,
      courses: [
        { title: "Introduction to Programming", level: "Beginner" },
        { title: "Problem Solving and Algorithms", level: "Intermediate" },
        { title: "Data Structures", level: "Intermediate" },
        { title: "Object-Oriented Programming", level: "Advanced" },
      ],
    },
    {
      title: "Web Development",
      description: "Master the art of building websites and web applications",
      icon: Globe,
      courses: [
        { title: "HTML & CSS Fundamentals", level: "Beginner" },
        { title: "JavaScript Essentials", level: "Intermediate" },
        { title: "React.js Framework", level: "Intermediate" },
        { title: "Backend Development with Node.js", level: "Advanced" },
      ],
    },
    {
      title: "Programming Languages",
      description: "Dive deep into specific programming languages",
      icon: Cpu,
      courses: [
        { title: "Python Programming", level: "Beginner to Advanced" },
        { title: "Java Masterclass", level: "Beginner to Advanced" },
        { title: "C++ for Competitive Programming", level: "Intermediate" },
        { title: "Rust for Systems Programming", level: "Advanced" },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Coding Practice
            </h1>
            <Tabs defaultValue="learn" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="learn">Learn</TabsTrigger>
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="compete">Compete</TabsTrigger>
              </TabsList>
              <TabsContent value="learn" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {learningPaths.map((path, index) => (
                    <Card key={index} className="flex flex-col justify-between">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <path.icon className="h-6 w-6" />
                          <CardTitle>{path.title}</CardTitle>
                        </div>
                        <CardDescription>{path.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-4">
                          {path.courses.map((course, courseIndex) => (
                            <li key={courseIndex} className="flex justify-between items-center">
                              <span>{course.title}</span>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {course.level}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full">
                          Start Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="practice" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Coding Challenges</CardTitle>
                    <CardDescription>Sharpen your skills with our curated set of coding problems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Button variant="outline" className="h-20 text-lg justify-start px-4">
                        <Terminal className="mr-2 h-6 w-6" />
                        Easy Challenges
                      </Button>
                      <Button variant="outline" className="h-20 text-lg justify-start px-4">
                        <Terminal className="mr-2 h-6 w-6" />
                        Medium Challenges
                      </Button>
                      <Button variant="outline" className="h-20 text-lg justify-start px-4">
                        <Terminal className="mr-2 h-6 w-6" />
                        Hard Challenges
                      </Button>
                      <Button variant="outline" className="h-20 text-lg justify-start px-4">
                        <Terminal className="mr-2 h-6 w-6" />
                        Data Structure Problems
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="compete" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Coding Competitions</CardTitle>
                    <CardDescription>Test your skills against other programmers in timed contests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">Weekly Challenge</h3>
                          <p className="text-sm text-muted-foreground">Starts in 2 days</p>
                        </div>
                        <Button>Register</Button>
                      </div>
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">Monthly Hackathon</h3>
                          <p className="text-sm text-muted-foreground">Starts in 2 weeks</p>
                        </div>
                        <Button>Register</Button>
                      </div>
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">Coding Marathon</h3>
                          <p className="text-sm text-muted-foreground">Starts in 1 month</p>
                        </div>
                        <Button>Register</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}
