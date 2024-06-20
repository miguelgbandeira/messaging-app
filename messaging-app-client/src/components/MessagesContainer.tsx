import useData from "../hooks/useData";
import { Message } from "../models/message";
import MessageBubble from "./MessageBubble";
import MessageArea from "./MessageArea";

interface MessagesContainerProps {
  chatId: string | undefined;
  sentFrom: string;
  sentTo: string | undefined | null;
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
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto flex flex-col-reverse">
        {!data && !sentTo && (
          <p>Select a chat to see messages and send a message to a new user!</p>
        )}
        {data &&
          data
            .slice()
            .reverse()
            .map((message) => (
              <div
                key={message._id}
                className={`flex px-2 ${message.sentFrom === sentFrom ? "justify-end" : "justify-start"}`}
              >
                <MessageBubble
                  message={message}
                  user={sentFrom}
                  color={
                    message.sentFrom === sentFrom
                      ? "bg-green-200"
                      : "bg-gray-300"
                  }
                />
              </div>
            ))}
      </div>
      <div className="p-5">
        {(chatId || sentTo) && (
          <MessageArea sentFrom={sentFrom} sentTo={sentTo} />
        )}
      </div>
    </div>
  );
}

export default MessagesContainer;
