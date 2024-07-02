import { ChangeEvent, FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Message } from "../models/message";
import { Chat } from "../models/chat";

interface MessagesAreaProps {
  sentFrom: string;
  sentTo: string | undefined | null;
  setData: React.Dispatch<React.SetStateAction<Message[]>>;
  updateLastMessage: (message: Message) => void;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  addChatToChatList: (chat: Chat) => void;
}

function MessageArea({
  sentFrom,
  sentTo,
  setData,
  updateLastMessage,
  setSelectedChat,
  addChatToChatList,
}: MessagesAreaProps) {
  const [message, setMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage = {
      message: message,
      sentFrom: sentFrom,
      sentTo: sentTo,
      timestamp: new Date(),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseMessage = await response.json();

      setMessage("");
      setData((prevData: Message) => [...prevData, responseMessage]);
      updateLastMessage(responseMessage);
      const responseChat = await fetch(
        `http://localhost:4000/messages/chats/${responseMessage.chatId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!responseChat.ok) {
        throw new Error("Network response was not ok");
      }
      const chat = await responseChat.json();
      addChatToChatList(chat);
      setSelectedChat(chat);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="border w-full p-2 rounded-full"
        name="message-input"
        id="message-input"
        onChange={handleChange}
        value={message}
        required
      ></input>
      <button>
        <FontAwesomeIcon className="fa-xl" icon={faCircleRight} />
      </button>
    </form>
  );
}

export default MessageArea;
