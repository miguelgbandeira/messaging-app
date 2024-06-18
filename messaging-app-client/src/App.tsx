import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "./models/user";
import Users from "./components/Users";

function App() {
  const [user, setUser] = useState(null);

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
        setUser(userData.user.userId);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <h1 className="text-xl font-bold text-red-400">Hello World</h1>
      <Users></Users>
      <Outlet context={{ user, setUser }}></Outlet>
    </>
  );
}

export default App;
