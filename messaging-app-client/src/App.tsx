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
        const userRes = await fetch("http://localhost:4000/auth/sign-up");
        const user: User = await userRes.json();
        setUser(user);
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
      <Outlet></Outlet>
    </>
  );
}

export default App;
