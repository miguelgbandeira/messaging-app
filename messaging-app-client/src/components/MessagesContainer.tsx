import useData from "../hooks/useData";
import { Message } from "../models/message";

interface MessagesContainerProps {
  chatId: string | null;
  user: string;
}

function MessagesContainer({ chatId, user }: MessagesContainerProps) {
  const { data, error, loading } = useData<Message[]>(
    chatId ? `/messages/${chatId}` : null
  );

  function formatDate(timestampString: string) {
    const timestamp = new Date(timestampString);

    const day = timestamp.getUTCDate().toString().padStart(2, "0");
    const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = timestamp.getUTCFullYear().toString().slice(-2);
    const hours = timestamp.getUTCHours().toString().padStart(2, "0");
    const minutes = timestamp.getUTCMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  if (error) return <div>No messages yet.</div>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      {!data && <p>Send a message to start a conversation!</p>}
      {data &&
        data.map((message) => (
          <div
            className={`flex gap-2 rounded-full mb-5 ${message.sentFrom === user ? "bg-green-200" : "bg-gray-200"}`}
            key={message._id}
          >
            <span>{message.message}</span>
            <span>{formatDate(message.timestamp)}</span>
          </div>
        ))}
    </>
  );
}

export default MessagesContainer;
