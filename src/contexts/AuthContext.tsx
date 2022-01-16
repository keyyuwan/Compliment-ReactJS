import { createContext, ReactNode, useContext } from "react";

interface AuthContextData {
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  function signOut() {
    localStorage.removeItem("@comp:token");
  }

  return (
    <AuthContext.Provider value={{ signOut }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
