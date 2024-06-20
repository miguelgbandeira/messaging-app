import { useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import MessageContainer from "../components/MessageContainer";

function HomePage() {
  const { user } = useOutletContext();

  return (
    <>
      <div className="border border-red-600">
        <ChatList user={user}></ChatList>
      </div>
      <MessageContainer></MessageContainer>
      {/* <Users></Users> */}
    </>
  );
}

export default HomePage;
