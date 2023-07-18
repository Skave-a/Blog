import { v4 as uuidv4 } from "uuid";
import { Navigate } from "react-router-dom";
import { AccessMode, RouteConfig } from "./types";
import {
  AddPost,
  EditPost,
  Login,
  Register,
  Main,
  NotFound,
  Post,
  Posts,
} from "./LazyPages";
import { ProtectedRoute } from "./ProtectedRoute";

export const defaultRoutes: RouteConfig[] = [
  {
    uuid: uuidv4(),
    path: "new",
    element: () => (
      <ProtectedRoute mode={AccessMode.LoggedIn} redirectTo="/">
        <AddPost />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: ":id/edit",
    element: () => (
      <ProtectedRoute mode={AccessMode.LoggedIn} redirectTo="/">
        <EditPost />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: "login",
    element: () => (
      <ProtectedRoute mode={AccessMode.Guest}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: "register",
    element: () => (
      <ProtectedRoute mode={AccessMode.Guest}>
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: "/",
    element: () => (
      <ProtectedRoute mode={AccessMode.Always}>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: "post/:id",
    element: () => (
      <ProtectedRoute mode={AccessMode.Always}>
        <Post />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: "posts",
    element: () => (
      <ProtectedRoute mode={AccessMode.LoggedIn} redirectTo="/">
        <Posts />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: "404",
    element: () => (
      <ProtectedRoute mode={AccessMode.Always}>
        <NotFound />
      </ProtectedRoute>
    ),
  },
  {
    uuid: uuidv4(),
    path: "*",
    element: () => <Navigate to="404" replace />,
  },
];
