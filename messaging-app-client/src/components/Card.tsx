import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  username: string;
  subText: string;
}

function Card({ username, subText }: CardProps) {
  return (
    <div className="flex space-x-4 border-t border-t-1 border-gray-200 py-2 pl-5 cursor-pointer">
      <div className="bg-gray-300 rounded-full flex justify-center items-center w-16 h-16">
        <FontAwesomeIcon className="fa-3x text-white" icon={faUser} />
      </div>
      <div className="flex flex-col space-y-1 w-64">
        <span className="font-bold text-lg">{username}</span>
        <span className="truncate text-gray-500 font-extralight">
          {subText}
        </span>
      </div>
    </div>
  );
}

export default Card;
