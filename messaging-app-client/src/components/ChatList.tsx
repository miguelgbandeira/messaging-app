import useData from "../hooks/useData";
import { Chat } from "../models/chat";

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
      <p>Chat List</p>
      {data &&
        data.map((chat) => {
          const filteredUsers = chat.users.filter(
            (chatUser) => chatUser._id !== user
          );

          return (
            <div
              className="flex flex-col border border-1 border-black"
              key={chat._id}
              onClick={() => onSelectChat(chat)}
            >
              {filteredUsers.map((filteredUser) => (
                <span className="font-bold text-lg" key={filteredUser._id}>
                  {filteredUser.username}
                </span>
              ))}
              <span className="font-light">{chat.last_message.message}</span>
            </div>
          );
        })}
    </>
  );
}

export default ChatList;
