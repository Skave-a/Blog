import React from "react";
import { PopularPosts } from "./PopularPosts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const PopularPostsList: React.FC = (): React.JSX.Element => {
  const { popularPosts } = useSelector((state: RootState) => state.post);

  return (
    <div className="basis-1/5">
      <div className="text-xs uppercase text-blue">Популярное:</div>
      {popularPosts?.map((post) => (
        <PopularPosts key={post._id} post={post} />
      ))}
    </div>
  );
};
