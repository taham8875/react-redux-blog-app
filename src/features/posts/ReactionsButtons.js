import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactionsEmojis = {
  like: "👍",
  love: "❤",
  sad: "😢",
};

export default function ReactionsButtons({ post }) {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionsEmojis).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          className={`btn btn-outline-secondary m-1 hover-${name}`}
          onClick={() => {
            dispatch(reactionAdded({ postId: post.id, reaction: name }));
          }}
        >
          {emoji} {post.reactions[name]}
        </button>
      );
    }
  );
  return <div>{reactionButtons}</div>;
}
