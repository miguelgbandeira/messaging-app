import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="text-xl font-bold text-red-400">Hello World</h1>
      <Outlet></Outlet>
    </>
  );
}

export default App;
