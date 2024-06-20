import useData from "../hooks/useData";
import { Chat } from "../models/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

interface ChatListProps {
  user: string;
  onSelectChat: (chat: Chat) => void;
}

function ChatList({ user, onSelectChat }: ChatListProps) {
  const { data, error, loading } = useData<Chat[]>("/messages/user/chats");

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <p className="mb-2">Chat List</p>
      {data &&
        data.map((chat) => {
          const filteredUsers = chat.users.filter(
            (chatUser) => chatUser._id !== user
          );

          return (
            <div
              className="flex flex-col "
              key={chat._id}
              onClick={() => onSelectChat(chat)}
            >
              {filteredUsers.map((filteredUser) => (
                <div key={filteredUser._id}>
                  <Card
                    username={filteredUser.username}
                    subText={chat.last_message.message}
                  />
                </div>
              ))}
            </div>
          );
        })}
    </>
  );
}

export default ChatList;
