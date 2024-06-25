import { ReactNode, createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { User } from "../models/user";

interface SocketContextType {
  socket: Socket | null;
}

interface SocketContextProviderProps {
  user: User;
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({
  user,
  children,
}: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:4000", {
        query: { userId: user._id },
      });
      setSocket(socket);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [socket, user]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
