import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Header({ tabSelected, handleClick }) {
  function handleSignOut() {
    try {
      localStorage.setItem("token", "");
      toast.info("You have sucessfully logged out");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <>
      <div className="flex justify-between p-5 items-center">
        <a
          className={`mb-2 cursor-pointer text-gray-700 ${tabSelected === "Chats" ? "bg-gray-200 rounded-full px-4 py-2" : ""}`}
          onClick={() => handleClick("Chats")}
        >
          Chats List
        </a>
        <a
          className={`mb-2 cursor-pointer text-gray-700 ${tabSelected === "Users" ? "bg-gray-200 rounded-full px-4 py-2" : ""}`}
          onClick={() => handleClick("Users")}
        >
          Users List
        </a>
        <a onClick={handleSignOut}>
          <FontAwesomeIcon
            className="fa-lg mb-1 text-gray-600"
            icon={faRightFromBracket}
          />
        </a>
      </div>
    </>
  );
}

export default Header;
