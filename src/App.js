import React from "react";
import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./features/posts/SinglePost";
import UpdatePostForm from "./features/posts/UpdatePostForm";
import UsersList from "./features/users/UsersList";
import SingleUser from "./features/users/SingleUser";
import Page404 from "./features/errors/Page404";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="update/:postId" element={<UpdatePostForm />} />
        </Route>
        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<SingleUser />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
