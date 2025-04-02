import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AdminData {
  name: string;
  email: string;
  id: string;
}

export const useAuth = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        if (payload.exp && payload.exp < Date.now() / 1000) {
          clearAuth();
          return;
        }

        setAdminData({
          name: payload.name || "Admin",
          email: payload.email,
          id: payload.userId
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        clearAuth();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const clearAuth = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    setAdminData(null);
    setIsAuthenticated(false);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearAuth();
      toast.success("Logged out successfully");
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      clearAuth();
      toast.success("Logged out successfully");
      router.push("/signin");
    }
  };

  const requireAuth = () => {
    if (!loading && !isAuthenticated) {
        router.push("/signin");
      return false;
    }
    return true;
  };

  return {
    adminData,
    isAuthenticated,
    loading,
    logout,
    requireAuth,
    checkAuth
  };
}; 