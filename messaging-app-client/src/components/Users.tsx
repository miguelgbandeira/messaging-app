import { useEffect, useState } from "react";
import { User } from "../models/user";
import UserCard from "./UserCard";
import { useOutletContext } from "react-router-dom";
import useData from "../hooks/useData";

function Users() {
  const { data, error, loading } = useData<User[]>("/users");

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Users:</h1>
      {data.map((user) => {
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
