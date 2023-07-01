import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { getAllPosts } from "@/redux/slices/postSlice";

export const Main = () => {
  const dispatch = useAppDispatch();
  const { posts, popularPosts } = useSelector((state: RootState) => state.post);

  console.log(popularPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постов не существует.
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8"></div>
    </div>
  );
};
