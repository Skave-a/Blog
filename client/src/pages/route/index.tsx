import { Route, Routes } from "react-router-dom";
import { AddPost, Edit, Login, Main, Post, Posts, Register } from "@/pages";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="posts" element={<Posts />} />
      <Route path=":id" element={<Post />} />
      <Route path=":id/edit" element={<Edit />} />
      <Route path="new" element={<AddPost />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
