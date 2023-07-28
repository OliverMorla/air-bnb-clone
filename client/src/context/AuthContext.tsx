import { useContext, createContext, useState } from "react";
import { AuthenticatedUser, AuthContextProps } from "@/types/types";
import { GET, headers } from "@/config/fetch.config";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<AuthenticatedUser | undefined>(
    undefined
  );

  async function login(inputs: BodyInit): Promise<any> {
    try {
      const res = await fetch(import.meta.env.VITE_AUTH_LOGIN_URL, {
        method: "POST",
        body: inputs,
        ...headers,
      });
      const data = await res.json();
      setUserInfo(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }

  async function logout(): Promise<any> {
    try {
      const res = await fetch(import.meta.env.VITE_AUTH_LOGOUT_URL, GET);
      const response = await res.json();
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }

  async function register(inputs: BodyInit): Promise<any> {
    try {
      const res = await fetch(import.meta.env.VITE_AUTH_REGISTER_URL, {
        method: "POST",
        body: inputs,
        ...headers,
      });
      const response = await res.json();
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ userInfo, setUserInfo, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
