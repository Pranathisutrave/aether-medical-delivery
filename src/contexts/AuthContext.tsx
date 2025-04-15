
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage (simulating persistent auth)
    const storedUser = localStorage.getItem("medifyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call with timeout
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes - in real app, this would validate against an API
        if (email && password) {
          const newUser = { id: Date.now().toString(), name: email.split("@")[0], email };
          localStorage.setItem("medifyUser", JSON.stringify(newUser));
          setUser(newUser);
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call with timeout
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes - in real app, this would register with an API
        if (name && email && password) {
          const newUser = { id: Date.now().toString(), name, email };
          localStorage.setItem("medifyUser", JSON.stringify(newUser));
          setUser(newUser);
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error("Invalid information"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("medifyUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
