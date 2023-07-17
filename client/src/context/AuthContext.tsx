import { useContext, createContext } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}