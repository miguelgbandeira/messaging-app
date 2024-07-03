import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "./models/user";
import { SocketContextProvider } from "./context/SocketContext";

export type AuthContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchLoggedInUser: () => Promise<void>;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  const fetchLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const userRes = await fetch("http://localhost:4000/auth/verify-token", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const userData = await userRes.json();
      setUser(userData.user._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <SocketContextProvider user={user}>
        <ToastContainer autoClose={3000} />
        <Outlet context={{ user, setUser, fetchLoggedInUser }} />
      </SocketContextProvider>
    </>
  );
}

export default App;
