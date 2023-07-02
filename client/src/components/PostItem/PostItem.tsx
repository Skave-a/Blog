import { Link } from "react-router-dom";
import { Post } from "@/redux/slices/postSlice";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { formatDate } from "@/utiles/formateDate";
import { baseURL } from "@/utiles/axios";

export const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-blue py-10">Загрузка...</div>
    );
  }
  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={post.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"}
        >
          {post.imgUrl && (
            <img
              src={`${baseURL}/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-blue opacity-50">{post.usermail}</div>
          <div className="text-xs text-blue opacity-50">
            {formatDate(post.createdAt)}
          </div>
        </div>
        <div className="text-blue text-xl">{post.title}</div>
        <p className="text-blue opacity-60 text-xs pt-4 line-clamp-4">
          {post.text}
        </p>

        <div className="flex gap-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-xs text-blue opacity-50">
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-blue opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  );
};
