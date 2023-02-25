import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updatePost,
  deletePost,
  selectPostById,
  selectPostIds,
} from "./postSlice";

export default function AddPostForm() {
  const [addNewRequest, setAddNewRequest] = useState("idle");

  let { postId } = useParams();
  postId = Number(postId);
  const users = useSelector((state) => state.users);
  const post = useSelector((state) => selectPostById(state, postId));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!post) {
    return <h2>Post Not Found</h2>;
  }

  const canUpdate =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    addNewRequest === "idle";

  const onUpdatePostClick = () => {
    if (canUpdate) {
      try {
        setAddNewRequest("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
            date: post.date,
            edited: true,
          })
        ).unwrap();
        navigate(`/post/${post.id}`, { replace: true });
      } catch (error) {
        console.error("Failed to update the post", error);
      } finally {
        setAddNewRequest("idle");
      }
    }
  };

  const onDeletePostClick = () => {
    try {
      setAddNewRequest("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      setAddNewRequest("idle");
    }
  };

  return (
    <div className="m-3 col col-lg-6">
      <h2>Update Post</h2>
      <form action="">
        <label className="d-block ">
          <div className="form-label">Title:</div>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            className="form-control mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <select
            className="form-select mb-4"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          >
            <option value=""></option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <label className="d-block">
          <div>Content:</div>
          <textarea
            name="postContent"
            id="postContent"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn btn-primary mt-4 me-3"
          disabled={!canUpdate}
          onClick={onUpdatePostClick}
        >
          Update Post
        </button>

        <button
          type="button"
          className="btn btn-danger mt-4"
          onClick={onDeletePostClick}
        >
          Delete Post
        </button>
      </form>
    </div>
  );
}
