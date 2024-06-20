import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  username: string;
  subText: string;
}

function Card({ username, subText }: CardProps) {
  return (
    <div className="border-t border-t-1 border-black cursor-pointer pt-2 mb-2">
      <div>
        <FontAwesomeIcon className="mr-3" icon={faUser} />
        <span className="font-bold text-lg">{username}</span>
      </div>
      <span className="font-extralight">{subText}</span>
    </div>
  );
}

export default Card;
