import { useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import MessagesContainer from "../components/MessagesContainer";
import { useContext, useEffect, useState } from "react";
import { Chat } from "../models/chat";
import Header from "../components/Header";
import UserList from "../components/UserList";
import { Message } from "../models/message";
import { SocketContext } from "../context/SocketContext";

interface FetchDataError extends Error {
  status?: number;
}

function HomePage() {
  const { user } = useOutletContext();
  const { socket } = useContext(SocketContext);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [tabSelected, setTabSelected] = useState<string>("Chats");
  const [error, setError] = useState<FetchDataError | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:4000/messages/user/chats`,
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = new Error("Server error") as FetchDataError;
          error.status = response.status;
          throw error;
        }

        const data = await response.json();
        setChatList(data);
      } catch (error) {
        setError(error as FetchDataError);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:4000/messages/${selectedChat?._id}`,
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = new Error("Server error") as FetchDataError;
          error.status = response.status;
          throw error;
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError(error as FetchDataError);
      }
    };

    if (selectedChat) fetchData();
  }, [selectedChat]);

  useEffect(() => {
    socket?.on("newMessage", (message: Message) => {
      setMessages((prevData) => [...prevData, message]);
      updateLastMessage(message);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, chatList]);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setSelectedUser(null);
  };

  const handleSelectUser = (user: string) => {
    setSelectedUser(user);
    setSelectedChat(null);
  };

  const getSentTo = () => {
    if (selectedChat) {
      const chatUser = selectedChat.users.find(
        (chatUser) => chatUser._id !== user
      );
      return chatUser ? chatUser._id : null;
    }
    return selectedUser;
  };

  const updateLastMessage = (message: Message) => {
    const chats = chatList.map((chat) => {
      if (chat._id === message.chatId) {
        chat.last_message = message;
      }
      return chat;
    });
    setChatList(chats);
  };

  return (
    <div className="flex">
      <div className="border border-gray-300 w-1/4">
        <Header tabSelected={tabSelected} handleClick={setTabSelected} />
        {tabSelected === "Users" && (
          <UserList
            handleSelectUser={handleSelectUser}
            user={user}
            selectedUser={selectedUser}
          />
        )}
        {tabSelected === "Chats" && (
          <ChatList
            user={user}
            onSelectChat={handleSelectChat}
            selectedChat={selectedChat}
            chats={chatList}
            setChatList={setChatList}
          />
        )}
      </div>
      <div className="bg-gray-100 border border-l-0 border-gray-300 w-3/4 max-h-screen min-h-screen flex flex-col">
        <MessagesContainer
          key={`${selectedChat?._id}-${selectedUser}`}
          chatId={selectedChat?._id}
          sentFrom={user}
          sentTo={getSentTo()}
          messages={messages}
          setMessages={setMessages}
          updateLastMessage={updateLastMessage}
        />
      </div>
    </div>
  );
}

export default HomePage;
