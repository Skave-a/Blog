import { Post } from "@/redux/slices/postSlice";
import { Link } from "react-router-dom";

export const PopularPosts: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={`${post._id}/:${post.title}`}
        className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        {post.title}
      </Link>
    </div>
  );
};
