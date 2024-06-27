import { useNavigate, useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import MessagesContainer from "../components/MessagesContainer";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Chat } from "../models/chat";
import Header from "../components/Header";
import UserList from "../components/UserList";
import { Message } from "../models/message";
import { SocketContext } from "../context/SocketContext";
import { useFetchChats } from "../hooks/useFetchChats";
import { useFetchMessages } from "../hooks/useFetchMessages";
import { toast } from "react-toastify";
function HomePage() {
  const notificationSound = new Audio("/notification.mp3");
  const { user } = useOutletContext();
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [tabSelected, setTabSelected] = useState<string>("Chats");

  const {
    chatList,
    error: chatError,
    loading: chatLoading,
    setChatList,
  } = useFetchChats();
  const {
    messages,
    error: messagesError,
    loading: messagesLoading,
    setMessages,
  } = useFetchMessages(selectedChat);

  useEffect(() => {
    socket?.on("newMessage", (message: Message) => {
      setMessages((prevData) => [...prevData, message]);
      updateLastMessage(message);
      notificationSound.play();
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, chatList]);

  const handleSelectChat = useCallback((chat: Chat) => {
    setSelectedChat(chat);
    setSelectedUser(null);
  }, []);

  const handleSelectUser = useCallback((user: string) => {
    setSelectedUser(user);
    setSelectedChat(null);
  }, []);

  const getSentTo = useMemo(() => {
    if (selectedChat) {
      const chatUser = selectedChat.users.find(
        (chatUser) => chatUser._id !== user
      );
      return chatUser ? chatUser._id : null;
    }
    return selectedUser;
  }, [selectedChat, selectedUser, user]);

  const updateLastMessage = useCallback(
    (message: Message) => {
      setChatList((chats) =>
        chats.map((chat) => {
          if (chat._id === message.chatId) {
            return { ...chat, last_message: message };
          }
          return chat;
        })
      );
    },
    [setChatList]
  );

  if (chatError || messagesError) {
    toast.warn("You have to be logged in to use the app");
    navigate("/auth/login");
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-100 border-b border-gray-300">
        {/* Header for Small Screens */}
        <div className="sm:hidden">
          {!selectedChat && !selectedUser && (
            <Header tabSelected={tabSelected} handleClick={setTabSelected} />
          )}
          {(selectedChat || selectedUser) && (
            <div className="flex justify-start items-center px-4 py-2">
              <button
                className="bg-white rounded-lg px-4 py-2 shadow-md"
                onClick={() => {
                  setSelectedChat(null); // Reset selected chat or user
                  setSelectedUser(null);
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
        {/* Original Header for Large Screens */}
        <div className="hidden sm:block border border-gray-300 w-1/4">
          <Header tabSelected={tabSelected} handleClick={setTabSelected} />
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`border border-gray-300 w-full sm:w-1/4 ${selectedChat || selectedUser ? "hidden sm:block" : "block"}`}
        >
          {tabSelected === "Users" && (
            <UserList
              handleSelectUser={handleSelectUser}
              user={user}
              selectedUser={selectedUser}
            />
          )}
          {tabSelected === "Chats" && (
            <>
              {chatLoading ? (
                <div className="flex justify-center items-center h-full">
                  <span>Loading chats...</span>
                </div>
              ) : (
                <ChatList
                  user={user}
                  onSelectChat={handleSelectChat}
                  selectedChat={selectedChat}
                  chats={chatList}
                  setChatList={setChatList}
                />
              )}
            </>
          )}
        </div>
        <div
          className={`bg-gray-100 border-l border-gray-300 w-full sm:w-3/4 ${selectedChat || selectedUser ? "block" : "hidden sm:block"}`}
        >
          {selectedChat || selectedUser ? (
            messagesLoading ? (
              <div className="flex justify-center items-center h-full">
                <span>Loading messages...</span>
              </div>
            ) : (
              <MessagesContainer
                key={`${selectedChat?._id}-${selectedUser}`}
                chatId={selectedChat?._id}
                sentFrom={user}
                sentTo={getSentTo}
                messages={messages}
                setMessages={setMessages}
                updateLastMessage={updateLastMessage}
                selectedChat={selectedChat}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
