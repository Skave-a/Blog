import {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { baseURL } from "@/utiles/axios";
import { ExtendedFormData, updatePost } from "@/redux/slices/postSlice";
import { useAppDispatch } from "@/redux/store";

const Edit = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [oldImage, setOldImage] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  const submitHandler = (): void => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      params.id && updatedPost.append("id", params.id);
      if (newImage) {
        updatedPost.append("image", newImage);
      }
      dispatch(updatePost(updatedPost as ExtendedFormData));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = (): void => {
    setTitle("");
    setText("");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
      setOldImage("");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <form
      className="w-1/3 mx-auto py-10"
      onSubmit={(e: FormEvent) => e.preventDefault()}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение:
        <input type="file" className="hidden" onChange={handleImageChange} />
      </label>
      <div className="flex object-cover py-2">
        {oldImage && <img src={`${baseURL}/${oldImage}`} alt={oldImage} />}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <label className="text-xs text-white opacity-70">
        Заголовок поста:
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Заголовок"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Текст поста:
        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          value={text}
          placeholder="Текст поста"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Обновить
        </button>

        <button
          onClick={clearFormHandler}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default Edit;
