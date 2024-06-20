import { useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import MessagesContainer from "../components/MessagesContainer";
import Users from "../components/Users";
import { useState } from "react";

function HomePage() {
  const { user } = useOutletContext();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const handleSelectChat = (chatId: string) => setSelectedChat(chatId);

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
            chatId={selectedChat}
            user={user}
          ></MessagesContainer>
        </div>
      </div>
    </>
  );
}

export default HomePage;
