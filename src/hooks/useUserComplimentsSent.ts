import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Compliment {
  id: string;
  message: string;
  userReceiver: {
    name: string;
  };
  tag: {
    name: string;
  };
}

export function useUserComplimentsSent() {
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  useEffect(() => {
    async function getSentCompliments() {
      try {
        const res = await api.get("/users/compliments/sent");

        setCompliments(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    getSentCompliments();
  }, []);

  return compliments;
}
