import { useEffect, useState } from "react";
import { User } from "../models/user";
import UserCard from "./UserCard";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("http://localhost:4000/users", {
          mode: "cors",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            (data as { error: string }).error || "An error occurred"
          );
        }

        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    getUsers();
  }, []);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Users:</h1>
      {users.map((user) => {
        const formattedDate = new Date(user.createdAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        return (
          <div className="mb-5" key={user._id}>
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
