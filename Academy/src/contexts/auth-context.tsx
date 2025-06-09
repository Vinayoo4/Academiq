import React, { createContext, useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "@heroui/react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "student" | "instructor" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate it
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        
        if (token) {
          // In a real app, validate the token with your backend
          // For now, we'll simulate a successful validation
          setUser({
            id: "user-1",
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
            role: "student"
          });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("auth_token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, make an API call to your backend
      // For demo purposes, we'll simulate a successful login with any credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        const mockUser = {
          id: "user-1",
          name: "John Doe",
          email,
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
          role: "student" as const
        };
        
        setUser(mockUser);
        localStorage.setItem("auth_token", "mock-jwt-token");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, make an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (name && email && password) {
        const mockUser = {
          id: "user-1",
          name,
          email,
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
          role: "student" as const
        };
        
        setUser(mockUser);
        localStorage.setItem("auth_token", "mock-jwt-token");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/auth/login" />;
  }

  return <>{children}</>;
};