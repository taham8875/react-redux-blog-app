import { useSelector } from "react-redux";
import { selectPostIds, selectPostById } from "./postSlice";
import React from "react";
import PostExcerpt from "./PostExcerpt";

function PostList() {
  const postIds = useSelector(selectPostIds);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = postIds.map((postId) => {
      return <PostExcerpt key={postId} postId={postId} />;
    });
  } else if (status === "rejected") {
    content = <div>{error}</div>;
  }

  return (
    <section className="m-3">
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostList;
