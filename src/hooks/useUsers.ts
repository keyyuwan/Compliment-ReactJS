import { useEffect, useState } from "react";
import { api } from "../services/api";

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await api.get("/users");

        setUsers(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    getUsers();
  }, []);

  return users;
}
