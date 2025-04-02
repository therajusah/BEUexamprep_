"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  

  const isAdminRoute = pathname?.startsWith('/admin') || 
                      pathname?.startsWith('/dashboard') ||
                      pathname?.includes('admin');

  const isAuthRoute = pathname?.startsWith('/signin') || 
                     pathname?.startsWith('/signup');
  
  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      {children}
      <StackedCircularFooter />
    </>
  );
} 