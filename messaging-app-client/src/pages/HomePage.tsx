import ChatList from "../components/ChatList";
import MessageContainer from "../components/MessageContainer";

function HomePage() {
  return (
    <>
      <div className="border border-red-600">
        <ChatList></ChatList>
      </div>
      <MessageContainer></MessageContainer>
      {/* <Users></Users> */}
    </>
  );
}

export default HomePage;
