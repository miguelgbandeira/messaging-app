import { User } from "../models/user";
import useData from "../hooks/useData";
import Card from "./Card";

interface UsersProps {
  user: string;
  setSelectedUser: (userId: string) => void;
  selectedUser: string | null;
}

function Users({ user, setSelectedUser, selectedUser }: UsersProps) {
  const { data, error, loading } = useData<User[]>("/users");

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="mb-2">All Users</h1>
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
            const isSelected = selectedUser ? user._id === selectedUser : false;
            return (
              <div
                className={`${isSelected ? "bg-gray-200" : ""}`}
                key={user._id}
                onClick={() => setSelectedUser(user._id)}
              >
                <Card
                  username={user.username}
                  subText={`Joined ${formattedDate}`}
                />
              </div>
            );
          })}
    </>
  );
}

export default Users;
