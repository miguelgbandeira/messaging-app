import { Chat } from "../models/chat";
import Card from "./Card";

interface ChatListProps {
  user: string;
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
  chats: Chat[];
  setChatList: React.Dispatch<React.SetStateAction<Chat[]>>;
}

function ChatList({
  user,
  onSelectChat,
  selectedChat,
  chats,
  setChatList,
}: ChatListProps) {
  if (chats?.length === 0) {
    return (
      <p className="text-center">
        Select a user from the list to start messaging!
      </p>
    );
  }

  return (
    <div className="min-w-80">
      {chats &&
        chats.map((chat) => {
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
