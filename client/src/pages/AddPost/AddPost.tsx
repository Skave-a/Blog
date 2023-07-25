import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "@/features/Post/slices/postSlice";
import { useAppDispatch } from "@/redux/store";
import { Button } from "@/shared/ui/Button/Button";

const AddPost: React.FC = (): React.JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      if (image) {
        data.append("image", image);
      }
      dispatch(createPost(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = (): void => {
    setText("");
    setTitle("");
    setImage(null);
    navigate("/");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="cursor-pointer block text-center bg-btnColor hover:bg-btnHoverColor text-white py-2 px-4 rounded ease-out duration-300">
        Прикрепить изорбажение
        <input type="file" className="hidden" onChange={handleImageChange} />
      </label>
      <div className="flex object-cover py-2">
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
      </div>

      <label className="text-xs text-white opacity-70">
        Заголовок поста:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="border border-gray-300 p-3 px-4 w-full text-bsBodyColor outline-none focus:border-btnColor rounded text-base placeholder:text-bsBodyColor"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Текст поста:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Текст поста"
          rows={8}
          className="border border-gray-300 p-3 px-4 w-full text-bsBodyColor outline-none focus:border-btnColor rounded text-base resize-none placeholder:text-bsBodyColor"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <Button text={"Отменить"} onClick={clearFormHandler} />
        <Button
          text={"Добавить"}
          onClick={(e: FormEvent) => submitHandler(e)}
        />
      </div>
    </form>
  );
};

export default AddPost;
