import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { User, UserRole } from "../types";
import { API } from "../config/api";
console.log("LOGIN API URL:", API.AUTH.LOGIN);


interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("school_platform_user");
    const storedToken = localStorage.getItem("school_platform_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login URL:", import.meta.env.VITE_API_AUTH_LOGIN); 
    try {
      setIsLoading(true);

      // 1. Request OTP
      console.log("ACTUAL API.AUTH.LOGIN =", API.AUTH.LOGIN);
      const loginRes = await axios.post(API.AUTH.LOGIN, { email, password });

      if (loginRes.data?.msg !== "OTP sent to your email") {
        alert(loginRes.data?.msg || "OTP not sent.");
        return false;
      }

      // 2. Prompt for OTP
      const otp = prompt("Enter the OTP sent to your email:");
      if (!otp) return false;

      // 3. Verify OTP
      const verifyRes = await axios.post(API.AUTH.VERIFY_OTP, { email, otp });
      const { token, user: verifiedUser } = verifyRes.data;

      // 4. Save to localStorage
      localStorage.setItem("school_platform_token", token);
      localStorage.setItem("school_platform_user", JSON.stringify(verifiedUser));

      setUser(verifiedUser);
      setToken(token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("school_platform_token");
    localStorage.removeItem("school_platform_user");
    setUser(null);
    setToken(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("school_platform_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        switchRole,
        isLoading,
        setIsLoading,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
