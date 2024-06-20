import { useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import MessageContainer from "../components/MessageContainer";
import Users from "../components/Users";

function HomePage() {
  const { user } = useOutletContext();

  return (
    <>
      <div className="flex">
        <div className="border border-blue-500 p-5">
          <Users></Users>
        </div>
        <div className="border border-red-600 p-5">
          <ChatList user={user}></ChatList>
        </div>
        <div className="border border-green-600 p-5">
          <MessageContainer></MessageContainer>
        </div>
      </div>
    </>
  );
}

export default HomePage;
