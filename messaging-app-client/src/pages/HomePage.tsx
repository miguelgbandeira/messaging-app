import { useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import MessagesContainer from "../components/MessagesContainer";
import Users from "../components/Users";
import { useState } from "react";
import { Chat } from "../models/chat";

function HomePage() {
  const { user } = useOutletContext();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleSelectChat = (chat: Chat) => setSelectedChat(chat);

  return (
    <>
      <div className="flex">
        <div className="border border-blue-500 p-5">
          <Users></Users>
        </div>
        <div className="border border-red-600 p-5">
          <ChatList user={user} onSelectChat={handleSelectChat}></ChatList>
        </div>
        <div className="border border-green-600 p-5">
          <MessagesContainer
            chatId={selectedChat?._id}
            sentFrom={user}
            sentTo={
              selectedChat?.users.find((chatUser) => chatUser._id !== user._id)
                ?._id
            }
          ></MessagesContainer>
        </div>
      </div>
    </>
  );
}

export default HomePage;
