import React from "react";
import { useSelector } from "react-redux";

export default function PostAuthor({ userId }) {
  const users = useSelector((state) => state.users);

  const postAuthor = users.find((user) => user.id == userId);

  return <span>by {postAuthor ? postAuthor.name : "Unknown user"}</span>;
}
