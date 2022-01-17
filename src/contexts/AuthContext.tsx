import Router from "next/router";
import { useToast } from "@chakra-ui/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface UserInfo {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  admin: boolean;
}
interface AuthContextData {
  signOut: () => void;
  signIn: (userInfo: UserInfo) => void;
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const toast = useToast();

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@comp:token"));

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      api.get("/userauth").then((res) => setUser(res.data));
    }
  }, []);

  async function signIn(userInfo: UserInfo) {
    if (!!userInfo.email && !!userInfo.password) {
      setIsLoading(true);
      try {
        const { data } = await api.post("/auth", userInfo);

        localStorage.setItem("@comp:token", JSON.stringify(data.token));
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setUser(data.user);

        toast({
          title: "Welcome!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        Router.push("/compliments");
      } catch (err) {
        toast({
          title: "Error signin in",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error signin in",
        description: "Fill in email and password to continue.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@comp:token");
  }

  return (
    <AuthContext.Provider
      value={{ signOut, signIn, isLoading, user, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
