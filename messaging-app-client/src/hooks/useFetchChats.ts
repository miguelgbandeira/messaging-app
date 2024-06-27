import { useState, useEffect } from "react";
import { Chat } from "../models/chat";

export interface FetchDataError extends Error {
  status?: number;
}

export function useFetchChats() {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [error, setError] = useState<FetchDataError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:4000/messages/user/chats",
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = new Error("Server error") as FetchDataError;
          error.status = response.status;
          throw error;
        }

        const data = await response.json();
        setChatList(data);
      } catch (error) {
        setError(error as FetchDataError);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return { chatList, error, loading, setChatList };
}
