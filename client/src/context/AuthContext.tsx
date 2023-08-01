import { useContext, createContext, useState } from "react";
import { AuthenticatedUser, AuthContextProps } from "@/types/types";
import { POST_c, headers } from "@/config/fetch.config";

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
        credentials: "include",
        body: inputs,
        ...headers,
      });
      const data = await res.json();
      localStorage.setItem("user", data?.user.token);
      setUserInfo(data);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }

  async function logout(): Promise<any> {
    try {
      const res = await fetch(import.meta.env.VITE_AUTH_LOGOUT_URL, POST_c);
      const response = await res.json();
      localStorage.removeItem("user");
      setUserInfo(undefined);
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

  async function getUser(): Promise<any> {
    const token = localStorage.getItem("user");
    try {
      if (token) {
        const res = await fetch(import.meta.env.VITE_AUTH_PROFILE_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await res.json();
        return response;
      }
    } catch (err: unknown) {
      if (err instanceof Error) return err.message;
    }
  }

  async function getOrders(inputs: BodyInit): Promise<any> {
    try {
      const res = await fetch(import.meta.env.VITE_AUTH_ORDERS_URL, {
        method: "POST",
        body: inputs,
        ...headers,
      });
      const response = await res.json();
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) return err.message;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        login,
        logout,
        register,
        getUser,
        getOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
