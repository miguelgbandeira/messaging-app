import useData from "../hooks/useData";
import { Message } from "../models/message";
import MessageBubble from "./MessageBubble";

interface MessagesContainerProps {
  chatId: string | null;
  user: string;
}

function MessagesContainer({ chatId, user }: MessagesContainerProps) {
  const { data, error, loading } = useData<Message[]>(
    chatId ? `/messages/${chatId}` : null
  );

  if (error) return <div>No messages yet.</div>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      {!data && <p>Send a message to start a conversation!</p>}
      {data &&
        data.map((message) => <MessageBubble message={message} user={user} />)}
    </>
  );
}

export default MessagesContainer;
