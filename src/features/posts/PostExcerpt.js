import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { selectPostById } from "./postSlice";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

export default function PostExcerpt({ postId }) {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="post border rounded p-3 mb-3" key={post.id}>
      <h3>{post.title}</h3>
      <p className="fs-4">{post.body}</p>
      <Link to={`post/${post.id}`}>View Post</Link>
      <div className="mb-2">
        <PostAuthor userId={post.userId} />
        <Link
          className="text-reset text-decoration-none"
          to={`post/${post.id}`}
        >
          <TimeAgo timeStamp={post.date} />
        </Link>
      </div>
      <ReactionsButtons post={post} />
    </article>
  );
}
