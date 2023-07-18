import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "@/redux/slices/authSlice";
import postSlice from "@/features/Post/slices/postSlice";
import commentSlice from "@/features/Comment/slices/commentSlice";
import { PostState } from "@/features/Post/types";
import { CommentState } from "@/features/Comment/types";

export interface RootState {
  auth: AuthState;
  post: PostState;
  comment: CommentState;
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
