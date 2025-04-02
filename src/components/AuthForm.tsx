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
      type === "signup"
        ? z.string().min(3, "Name must be at least 3 characters")
        : z.string().optional(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    secretCode:
      type === "signup"
        ? z.string().min(1, "Secret code is required")
        : z.string().optional(),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = authSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", secretCode: "" },
  });

  const setAuthToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/auth/${
          type === "signup" ? "signup" : "signin"
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

      if (type === "signup") {
        toast.success("Admin account created! Please sign in.");
        router.push("/signin");
      } else {
        toast.success("Signed in successfully.");
        setAuthToken(result.token);
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect') || '/dashboard';
        router.push(redirectTo);
      }
    } catch (error) {
      toast.error(`Something went wrong. Please try again. ${String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const isSignIn = type === "signin";

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl">
        <div className={`${isSignIn ? 'p-10 space-y-6' : 'p-8 space-y-4'}`}>
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">BEUexamprep</h2>
            <h3 className="text-lg font-semibold text-gray-300">
              {isSignIn ? "Admin Sign In" : "Create Admin Account"}
            </h3>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`${isSignIn ? 'space-y-5' : 'space-y-4'}`}>
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

              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="secretCode"
                  label="Admin Secret Code"
                  placeholder="Enter the admin secret code"
                  type="password"
                />
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isSignIn ? 'py-4 px-6 text-lg mt-6' : 'py-3 px-5 text-base mt-4'}`}
              >
                {loading
                  ? "Processing..."
                  : isSignIn
                  ? "Admin Sign In"
                  : "Create Admin Account"}
              </Button>
            </form>
          </Form>

          {/* Footer Link */}
          <div className={`text-center text-sm text-gray-400 ${isSignIn ? 'pt-4' : 'pt-2'}`}>
            {isSignIn ? "Need to create admin account?" : "Already have admin account?"}
            <Link
              href={!isSignIn ? "/signin" : "/signup"}
              className="font-semibold text-blue-400 hover:text-blue-300 ml-1 transition-colors"
            >
              {!isSignIn ? "Admin Sign In" : "Create Admin Account"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
