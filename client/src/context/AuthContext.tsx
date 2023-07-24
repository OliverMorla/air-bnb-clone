import { useContext, createContext, useState, useEffect } from "react";
import { AuthenticatedUser, AuthContextProps } from "@/types/types";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: {children: React.ReactNode}) {
  const [userInfo, setUserInfo] = useState<AuthenticatedUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await fetch(import.meta.env.VITE_AUTHENTICATION_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
    getUserInfo();
  }, []);
  
  // testing
  console.log("loading: " + loading)

  async function login(inputs: BodyInit): Promise<any> {
    try {
      const res = await fetch(import.meta.env.VITE_AUTH_LOGIN_URL, {
        method: "POST",
        body: inputs,
      });
      const data = await res.json();
      setUserInfo(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function logout(): Promise<any> {}

  async function register(inputs: BodyInit): Promise<any> {
    try {
      const res = await fetch(import.meta.env.VITE_AUTH_REGISTER_URL, {
        method: "POST",
        body: inputs,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
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
