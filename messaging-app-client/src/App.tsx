import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "./models/user";

function App() {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? token : "";
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const userRes = await fetch("http://localhost:4000/auth/verify-token", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const userData: User = await userRes.json();
        setUser(userData.user.userId);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, [token]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <h1 className="text-xl font-bold text-red-400">Hello World</h1>
      <Outlet context={{ user, setUser }}></Outlet>
    </>
  );
}

export default App;
