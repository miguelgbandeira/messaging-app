interface UserCardProps {
  username: string;
  joinedAt: string;
}

function UserCard({ username, joinedAt }: UserCardProps) {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold mb-2">{username}</h2>
      <p>{joinedAt}</p>
    </div>
  );
}

export default UserCard;
