import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { getAllPosts } from "@/features/Post/slices/postSlice";
import { checkIsAuth } from "@/redux/slices/authSlice";
import { PopularPostsList, PostsList } from "@/features/Post";

const Main: React.FC = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(checkIsAuth);
  const { posts } = useSelector((state: RootState) => state.post);

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
        <PostsList />
        <PopularPostsList />
      </div>
    </div>
  );
};
export default Main;
