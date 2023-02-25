import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "./postSlice";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addNewRequest, setAddNewRequest] = useState("idle");

  const users = useSelector((state) => state.users);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const canSave =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    addNewRequest === "idle";

  const onSavePostClick = () => {
    if (canSave) {
      try {
        setAddNewRequest("pending");
        dispatch(addNewPost({ title, body: content, userId: userId })).unwrap();
        navigate("/");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddNewRequest("idle");
      }
    }
  };

  return (
    <div className="m-3 col col-lg-6">
      <h2>Add New Post</h2>
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
          className="btn btn-primary mt-4"
          disabled={!canSave}
          onClick={onSavePostClick}
        >
          Save Post
        </button>
      </form>
    </div>
  );
}
