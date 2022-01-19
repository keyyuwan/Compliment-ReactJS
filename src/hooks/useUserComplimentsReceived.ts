import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Compliment {
  id: string;
  message: string;
  userSender: {
    name: string;
  };
  tag: {
    name: string;
  };
}

export function useUserComplimentsReceived() {
  const [compliments, setCompliments] = useState<Compliment[]>([]);

  useEffect(() => {
    async function getReceivedCompliments() {
      try {
        const res = await api.get("/users/compliments/received");

        setCompliments(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    getReceivedCompliments();
  }, []);

  return compliments;
}
