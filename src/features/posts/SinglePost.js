import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { selectPostById, selectPostIds } from "./postSlice";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

export default function SinglePost() {
  let { postId } = useParams();
  postId = Number(postId);

  const postIds = useSelector(selectPostIds);

  const post = useSelector((state) => selectPostById(state, postId));
  if (!post) {
    return <h2>Post Not Found</h2>;
  }

  return (
    <article className="post border rounded p-3 mb-3" key={post.id}>
      <h3>
        {post.title}{" "}
        <span>
          <Link className="text-reset " to={`/post/update/${post.id}`}>
            {" "}
            🖊
          </Link>
        </span>{" "}
      </h3>
      <p className="fs-4">{post.body}</p>
      <div className="mb-2">
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </div>
      <ReactionsButtons post={post} />
    </article>
  );
}
