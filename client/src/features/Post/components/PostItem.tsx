import { Link } from "react-router-dom";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { formatDate } from "@/utiles/formateDate";
import { baseURL } from "@/utiles/axios";
import { BsCalendarEvent } from "react-icons/bs";
import { PostType } from "../types";

export const PostItem: React.FC<{ post: PostType }> = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-blue py-10">Загрузка...</div>
    );
  }

  return (
    <article
      className="group/item flex flex-col h-full mx-auto
        sm:min-w-[290px] 
        md:min-w-[390px] w-[390px]"
    >
      <div className="bg-white rounded-sm h-60 relative">
        <Link to={`post/${post._id}`}>
          <div
            className={
              post.imgUrl
                ? "flex rounded-sm  absolute -top-5 h-60 left-4 hover:-top-6 ease-out duration-300 group-hover/item:-top-6"
                : "flex rounded-sm"
            }
          >
            {post.imgUrl && (
              <img
                src={
                  post.imgUrl.includes("https")
                    ? post.imgUrl
                    : `${baseURL}/${post.imgUrl}`
                }
                alt="img"
                className="object-cover w-full filter grayscale hover:filter-none ease-out duration-300 rounded-sm group-hover/item:filter-none"
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
        <Link to={`post/${post._id}`}>
          <div className="text-blue text-xl hover:text-menuСolor ease-out duration-300">
            {post.title}
          </div>
        </Link>
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
    </article>
  );
};
