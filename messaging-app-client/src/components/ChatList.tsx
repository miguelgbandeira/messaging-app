import { useEffect } from "react";
import useData from "../hooks/useData";
import { Chat } from "../models/chat";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ChatListProps {
  user: string;
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
}

function ChatList({ user, onSelectChat, selectedChat }: ChatListProps) {
  const navigate = useNavigate();
  const { data, error, loading } = useData<Chat[]>("/messages/user/chats");

  useEffect(() => {
    if (error && error.status === 403) {
      toast.warn("Please login to access the chat");
      navigate("/auth/login");
    }
  }, [error, navigate]);

  if (error)
    return <p className="text-center">A network error was encountered</p>;
  if (loading) return <p className="block m-auto text-center">Loading...</p>;
  if (data?.length === 0) {
    return (
      <p className="text-center">
        Select a user from the list to start messaging!
      </p>
    );
  }

  return (
    <div className="min-w-80">
      {data &&
        data.map((chat) => {
          const filteredUsers = chat.users.filter(
            (chatUser) => chatUser._id !== user
          );
          const isSelected = selectedChat
            ? chat._id === selectedChat._id
            : false;

          return (
            <div
              className={"flex flex-col"}
              key={chat._id}
              onClick={() => onSelectChat(chat)}
            >
              {filteredUsers.map((filteredUser) => (
                <div
                  key={filteredUser._id}
                  className={`${isSelected ? "bg-gray-200" : ""}`}
                >
                  <Card
                    username={filteredUser.username}
                    subText={chat.last_message.message}
                  />
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default ChatList;
