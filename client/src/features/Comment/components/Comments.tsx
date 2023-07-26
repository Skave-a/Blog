import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { createComment } from "@/features/Comment/slices/commentSlice";
import { Button } from "@/shared/ui/Button/Button";
import { CommentsList } from "@/features";

const Comments = ({ id }: { id: string }) => {
  const [comment, setComment] = useState<string>("");
  const dispatch = useAppDispatch();

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

  return (
    <div className=" p-8 bg-lightPink flex flex-col gap-2 rounded-sm">
      <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          className="border border-gray-300 p-3 px-4 w-full text-bsBodyColor outline-none focus:border-btnColor rounded text-base resize-none placeholder:text-bsBodyColor"
        />
        <Button text="Отправить" onClick={handleSubmit} />
      </form>
      <CommentsList />
    </div>
  );
};

export default Comments;
