import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { getAllPosts } from "@/redux/slices/postSlice";
import { PopularPosts, PostItem } from "@/components";
import { checkIsAuth } from "@/redux/slices/authSlice";

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { posts, popularPosts } = useSelector((state: RootState) => state.post);
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!isAuth.auth && !posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постов не существует.
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Популярное:</div>

          {popularPosts?.map((post) => (
            <PopularPosts key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Main;
