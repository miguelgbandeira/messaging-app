import useData from "../hooks/useData";
import { Message } from "../models/message";
import MessageBubble from "./MessageBubble";
import MessageArea from "./MessageArea";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

interface MessagesContainerProps {
  chatId: string | undefined;
  sentFrom: string;
  sentTo: string | undefined | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

function MessagesContainer({
  chatId,
  sentFrom,
  sentTo,
  messages,
  setMessages,
}: MessagesContainerProps) {
  if (messages.length === 0) return <div>No messages yet.</div>;

  return (
    <div className="flex flex-col h-full">
      {!messages && !sentTo && (
        <p className="text-center p-5">
          Select a chat to see messages or send a message to a new user!
        </p>
      )}
      <div className="flex-grow overflow-y-auto flex flex-col-reverse">
        {messages &&
          messages
            .slice()
            .reverse()
            .map((message) => (
              <div
                key={message._id}
                className={`flex px-8 pt-3 ${message.sentFrom === sentFrom ? "justify-end" : "justify-start"}`}
              >
                <MessageBubble
                  message={message}
                  user={sentFrom}
                  color={
                    message.sentFrom === sentFrom
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }
                />
              </div>
            ))}
      </div>
      <div className="p-5">
        {(chatId || sentTo) && (
          <MessageArea
            setData={setMessages}
            sentFrom={sentFrom}
            sentTo={sentTo}
          />
        )}
      </div>
    </div>
  );
}

export default MessagesContainer;
