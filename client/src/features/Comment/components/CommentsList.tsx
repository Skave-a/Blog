import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CommentItem } from "./CommentItem";

export const CommentsList: React.FC = (): React.JSX.Element => {
  const { comments } = useSelector((state: RootState) => state.comment);

  if (!Array.isArray(comments)) return <p>No comments</p>;

  return (
    <>
      {comments &&
        comments.map((cmt) => <CommentItem key={cmt._id} cmt={cmt} />)}
    </>
  );
};
