import useData from "../hooks/useData";
import { Message } from "../models/message";
import MessageBubble from "./MessageBubble";
import MessageArea from "./MessageArea";

interface MessagesContainerProps {
  chatId: string | undefined;
  sentFrom: string;
  sentTo: string | undefined;
}

function MessagesContainer({
  chatId,
  sentFrom,
  sentTo,
}: MessagesContainerProps) {
  const { data, error, loading } = useData<Message[]>(
    chatId ? `/messages/${chatId}` : null
  );

  if (error) return <div>No messages yet.</div>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {!data && <p>Select a chat to see the messages!</p>}
      {data &&
        data.map((message) => (
          <MessageBubble message={message} user={sentFrom} key={message._id} />
        ))}
      <div>{chatId && <MessageArea sentFrom={sentFrom} sentTo={sentTo} />}</div>
    </div>
  );
}

export default MessagesContainer;
