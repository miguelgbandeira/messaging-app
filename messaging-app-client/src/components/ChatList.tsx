import useData from "../hooks/useData";
import { Chat } from "../models/chat";

function ChatList() {
  const { data, error, loading } = useData<Chat[]>("/messages/user/chats");

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <p>Chat List</p>
      {data &&
        data.map((chat) => {
          return <p>{chat.last_message.message}</p>;
        })}
    </>
  );
}

export default ChatList;
