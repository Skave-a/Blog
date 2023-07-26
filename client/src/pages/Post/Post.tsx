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
import { getPostComments } from "@/features/Comment/slices/commentSlice";
import { removePost } from "@/features";
import { PostType } from "@/features/Post/types";
import { Button } from "@/shared/ui/Button/Button";
import Comments from "@/features/Comment/components/Comments";

const Post: React.FC = (): React.JSX.Element => {
  const [post, setPost] = useState<PostType | null>(null);

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
      <Button text="Назад" onClick={() => navigate("/")} />
      <div className="flex flex-wrap flex-row justify-around gap-10 py-8">
        <div>
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-96" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={
                    post.imgUrl.includes("https")
                      ? post.imgUrl
                      : `${baseURL}/${post.imgUrl}`
                  }
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
        {id && <Comments id={id} />}
      </div>
    </div>
  );
};
export default Post;
