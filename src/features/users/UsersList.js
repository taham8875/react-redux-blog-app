import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UsersList() {
  const users = useSelector((state) => state.users);
  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.id}>
            <Link to={`${user.id}`}> {user.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
