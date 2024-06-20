import { User } from "../models/user";
import UserCard from "./UserCard";
import useData from "../hooks/useData";

interface UsersProps {
  user: string;
  setSelectedUser: (userId: string) => void;
}

function Users({ user, setSelectedUser }: UsersProps) {
  const { data, error, loading } = useData<User[]>("/users");

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Users:</h1>
      {data &&
        data
          .filter((dataUser) => dataUser._id !== user)
          .map((user) => {
            const formattedDate = new Date(user.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
            return (
              <div
                className="mb-5 cursor-pointer"
                key={user._id}
                onClick={() => setSelectedUser(user._id)}
              >
                <UserCard
                  username={user.username}
                  joinedAt={`Joined ${formattedDate}`}
                ></UserCard>
              </div>
            );
          })}
    </>
  );
}

export default Users;
