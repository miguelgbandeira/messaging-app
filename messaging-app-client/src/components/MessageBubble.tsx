import { Message } from "../models/message";

interface MessagesBubbleProps {
  message: Message;
  user: string;
}

function MessageBubble({ message, user }: MessagesBubbleProps) {
  function formatDay(timestampString: string) {
    const timestamp = new Date(timestampString);

    const day = timestamp.getUTCDate().toString().padStart(2, "0");
    const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = timestamp.getUTCFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }

  function formatHour(timestampString: string) {
    const timestamp = new Date(timestampString);

    const hours = timestamp.getUTCHours().toString().padStart(2, "0");
    const minutes = timestamp.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  return (
    <div
      className={`rounded-full mb-5 px-5 py-3 max-w-sm ${message.sentFrom === user ? "bg-green-200" : "bg-gray-200"}`}
      key={message._id}
    >
      <span>{message.message}</span>
      <div className="flex justify-between font-extralight text-xs mt-4">
        <span>{formatDay(message.timestamp)}</span>
        <span>{formatHour(message.timestamp)}</span>
      </div>
    </div>
  );
}

export default MessageBubble;
