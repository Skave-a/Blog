import React from "react";
import { PostItem } from "./PostItem";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const PostsList: React.FC = (): React.JSX.Element => {
  const { posts } = useSelector((state: RootState) => state.post);

  return (
    <div className="flex flex-col gap-10">
      {posts?.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};
