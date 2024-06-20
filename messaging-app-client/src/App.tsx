import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "./models/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const token = localStorage.getItem("token");
        const userRes = await fetch("http://localhost:4000/auth/verify-token", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const userData: User = await userRes.json();
        setUser(userData.user._id);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Outlet context={{ user, setUser }}></Outlet>
    </>
  );
}

export default App;
