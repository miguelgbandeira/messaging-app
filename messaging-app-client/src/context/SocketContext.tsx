import { ReactNode, createContext, useEffect, useState, FC } from "react";
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

export const SocketContextProvider: FC<SocketContextProviderProps> = ({
  user,
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user) {
      const socketInstance = io("http://localhost:4000", {
        query: { userId: user._id },
      });
      setSocket(socketInstance);

      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
