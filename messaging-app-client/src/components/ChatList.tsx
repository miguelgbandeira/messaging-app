import useData from "../hooks/useData";
import { Chat } from "../models/chat";
import Card from "./Card";

interface ChatListProps {
  user: string;
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
}

function ChatList({ user, onSelectChat, selectedChat }: ChatListProps) {
  const { data, error, loading } = useData<Chat[]>("/messages/user/chats");

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-w-80">
      <p className="mb-2">Chat List</p>
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
