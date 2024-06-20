import useData from "../hooks/useData";
import { Chat } from "../models/chat";

function ChatList({ user }) {
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
            <div key={chat._id}>
              {filteredUsers.map((filteredUser) => (
                <p className="font-bold" key={filteredUser._id}>
                  {filteredUser.username}
                </p>
              ))}
              <p className="font-light">{chat.last_message.message}</p>
            </div>
          );
        })}
    </>
  );
}

export default ChatList;
