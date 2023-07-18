import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "@/redux/store";
import axios, { baseURL } from "@/utiles/axios";
import { formatDate } from "@/utiles/formateDate";
import { toast } from "react-toastify";
import {
  createComment,
  getPostComments,
} from "@/features/Comment/slices/commentSlice";
import { CommentsList, removePost } from "@/features";
import { PostType } from "@/features/Post/types";

const Post: React.FC = (): React.JSX.Element => {
  const [post, setPost] = useState<PostType | null>(null);
  const [comment, setComment] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removePostHandler = (): void => {
    try {
      id && dispatch(removePost(id));
      toast("Пост был удален");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (): void => {
    try {
      if (id) {
        const postId = id;
        dispatch(createComment({ postId, comment }));
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      if (id) {
        dispatch(getPostComments(id));
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`);
    setPost(data);
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className="text-xl text-center text-blue py-10">Загрузка...</div>
    );
  }

  if (!("_id" in post)) return <p>Такого поста не существует</p>;

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-blue rounded-sm py-2 px-4">
        <Link className="flex" to={"/"}>
          Назад
        </Link>
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`${baseURL}/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-blue opacity-50">{post.usermail}</div>
            <div className="text-xs text-blue opacity-50">
              {formatDate(post.createdAt)}
            </div>
          </div>
          <div className="text-blue text-xl">{post.title}</div>
          <p className="text-blue opacity-60 text-xs pt-4 line-clamp-3">
            {post.text}
          </p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-blue opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-blue opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
              </button>
            </div>

            {typeof user === "object" && user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-blue opacity-50">
                  <Link to={`/${id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2  text-blue opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center bg-gray-600 text-xs text-blue rounded-sm py-2 px-4"
            >
              Отправить
            </button>
          </form>
          <CommentsList />
        </div>
      </div>
    </div>
  );
};
export default Post;
