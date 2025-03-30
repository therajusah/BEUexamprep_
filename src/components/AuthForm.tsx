"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";

const authSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, "Name must be at least 3 characters")
        : z.string().optional(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = authSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const checkToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    }
  };

  checkToken();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/auth/${
          type === "sign-up" ? "signup" : "signin"
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      if (type === "sign-up") {
        toast.success("Account created! Please sign in.");
        router.push("/sign-in");
      } else {
        toast.success("Signed in successfully.");
        localStorage.setItem("token", result.token);
        router.push("/");
      }
    } catch (error) {
      toast.error(`Something went wrong. Please try again. ${String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <h2 className="text-primary-100">BEUexamprep</h2>
        </div>

        <h3 className="flex justify-center items-center">{isSignIn ? "Sign in to your account" : "Create your account"}</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : isSignIn
                ? "Sign In"
                : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
