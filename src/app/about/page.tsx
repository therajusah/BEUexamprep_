import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-4xl p-6">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              About BEUexamprep
            </h1>
            <div className="max-w-3xl space-y-6">
              <p className="text-xl text-muted-foreground">
                BEUexamprep is a comprehensive online platform designed to help university students excel in their academic journey. Our mission is to provide high-quality study materials, practice resources, and a supportive community for students across various disciplines.
              </p>
              <h2 className="text-2xl font-semibold mt-8">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                We envision a world where every student has access to the tools and resources they need to succeed in their academic pursuits. BEUexamprep aims to be the go-to platform for university students seeking to enhance their learning experience and achieve their educational goals.
              </p>
              <h2 className="text-2xl font-semibold mt-8">What We Offer</h2>
              <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
                <li>Comprehensive study notes across various subjects</li>
                <li>Previous year question papers for exam preparation</li>
                <li>Coding practice platform for computer science students</li>
                <li>Informative blogs on study techniques and career advice</li>
                <li>Community forums for peer-to-peer learning and support</li>
              </ul>
              <h2 className="text-2xl font-semibold mt-8">Join Us</h2>
              <p className="text-lg text-muted-foreground">
                Whether you&apos;re a freshman just starting your university journey or a senior preparing for your final exams, BEUexamprep is here to support you every step of the way. Join our community today and take your academic performance to the next level!
              </p>
              <div className="mt-8">
                <Link href="/sign-up">
                  <Button size="lg">Get Started with BEUexamprep</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
