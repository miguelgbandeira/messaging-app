import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <ToastContainer autoClose={3000} />
      <h1 className="text-xl font-bold text-red-400">Hello World</h1>
      <Outlet></Outlet>
    </>
  );
}

export default App;
