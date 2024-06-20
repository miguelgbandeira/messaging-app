import { useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import MessagesContainer from "../components/MessagesContainer";
import { useState } from "react";
import { Chat } from "../models/chat";
import Header from "../components/Header";
import Users from "../components/Users";

function HomePage() {
  const { user } = useOutletContext();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [tabSelected, setTabSelected] = useState<string>("Chats");

  const handleSelectChat = (chat: Chat) => setSelectedChat(chat);

  return (
    <>
      <div className="flex">
        <div className="border border-gray-300 w-1/4">
          <Header tabSelected={tabSelected} handleClick={setTabSelected} />
          {tabSelected === "Users" && (
            <Users
              setSelectedUser={setSelectedUser}
              user={user}
              selectedUser={selectedUser}
            ></Users>
          )}
          {tabSelected === "Chats" && (
            <ChatList
              user={user}
              onSelectChat={handleSelectChat}
              selectedChat={selectedChat}
            />
          )}
        </div>
        <div className="bg-gray-100 border border-l-0 border-gray-300 w-3/4 max-h-screen min-h-screen flex flex-col">
          <MessagesContainer
            chatId={selectedChat?._id}
            sentFrom={user}
            sentTo={
              selectedChat?.users.find((chatUser) => chatUser._id !== user._id)
                ?._id || selectedUser
            }
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
