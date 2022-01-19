import { useEffect, useState } from "react";
import { api } from "../services/api";

export interface Tag {
  id: string;
  name: string;
  customName: string;
}

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function getTags() {
      try {
        const res = await api.get("/tags");

        setTags(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    getTags();
  }, []);

  return tags;
}
