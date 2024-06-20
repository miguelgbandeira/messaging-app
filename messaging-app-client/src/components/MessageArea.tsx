import { ChangeEvent, FormEvent, useState } from "react";
interface MessagesAreaProps {
  sentFrom: string;
  sentTo: string | undefined;
}

function MessageArea({ sentFrom, sentTo }: MessagesAreaProps) {
  const [message, setMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage = {
      message: message,
      sentFrom: sentFrom,
      sentTo: sentTo,
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

      console.log("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <textarea
        className="border w-full rounded"
        name="message-input"
        id="message-input"
        onChange={handleChange}
        value={message}
        required
      ></textarea>
      <button>send</button>
    </form>
  );
}

export default MessageArea;
