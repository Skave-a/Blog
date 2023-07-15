import { Link } from "react-router-dom";
import { Post } from "@/redux/slices/postSlice";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { formatDate } from "@/utiles/formateDate";
import { baseURL } from "@/utiles/axios";
import { BsCalendarEvent } from "react-icons/bs";

export const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-blue py-10">Загрузка...</div>
    );
  }

  return (
    <div className="flex flex-col basis-1/4 flex-grow w-[390px]">
      <div className="bg-white rounded-sm h-60 relative">
        <Link to={`/${post._id}/:${post.title}`}>
          <div
            className={
              post.imgUrl
                ? "flex rounded-sm  absolute -top-5 h-60 left-4 hover:-top-6 ease-out duration-300 "
                : "flex rounded-sm"
            }
          >
            {post.imgUrl && (
              <img
                src={`${baseURL}/${post.imgUrl}`}
                alt="img"
                className="object-cover w-full filter grayscale hover:filter-none ease-out duration-300 rounded-sm"
              />
            )}
          </div>
        </Link>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="text-xs flex items-center gap-2 opacity-70">
          <BsCalendarEvent />
          {formatDate(post.createdAt)}
        </div>
        <div className="text-blue text-xl hover:text-menuСolor">{post.title}</div>
        <div className="text-xs text-blue opacity-50">{post.usermail}</div>
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
    </div>
  );
};
