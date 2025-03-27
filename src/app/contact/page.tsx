import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <main className="w-full max-w-3xl p-6">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Contact Us
            </h1>
            <div className="space-y-8">
              <p className="text-xl text-muted-foreground">
                We&apos;re here to help! If you have any questions, concerns, or feedback, please don&apos;t hesitate to reach out to us using the form below or through our contact information.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Your message" required className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
              </form>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
                <div className="space-y-2">
                  <p className="font-medium">Email:</p>
                  <p className="text-muted-foreground">support@BEUexamprep.com</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Phone:</p>
                  <p className="text-muted-foreground">+91 123-456790</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Address:</p>
                  <p className="text-muted-foreground">
                    123 University <br />
                    Patna 800011<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
