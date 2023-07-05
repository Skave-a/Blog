import { lazy } from "react";
import { Loadable } from "./ui/Loadable";

const AddPost = Loadable(lazy(() => import("@/pages/AddPost/AddPost")));
const EditPost = Loadable(lazy(() => import("@/pages/Edit/Edit")));
const Login = Loadable(lazy(() => import("@/pages/Login/Login")));
const Register = Loadable(lazy(() => import("@/pages/Register/Register")));
const Main = Loadable(lazy(() => import("@/pages/Main/Main")));
const NotFound = Loadable(lazy(() => import("@/pages/NotFound/NotFound")));
const Post = Loadable(lazy(() => import("@/pages/Post/Post")));
const Posts = Loadable(lazy(() => import("@/pages/Posts/Posts")));

export { AddPost, EditPost, Login, Register, Main, NotFound, Post, Posts };
