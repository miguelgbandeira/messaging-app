import { useState, useEffect } from "react";
import { Chat } from "../models/chat";
import { Message } from "../models/message";
import { FetchDataError } from "./useFetchChats";

export function useFetchMessages(selectedChat: Chat | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<FetchDataError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:4000/messages/${selectedChat._id}`,
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
        setMessages(data);
      } catch (error) {
        setError(error as FetchDataError);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  return { messages, error, loading, setMessages };
}
