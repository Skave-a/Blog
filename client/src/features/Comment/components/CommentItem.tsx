import { Comment } from "@/features/Comment/types";

export const CommentItem = ({ cmt }: { cmt: Comment }) => {
  const avatar = cmt.comment.trim().toUpperCase().split("").slice(0, 2);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-bsBodyColor text-sm text-white">
        {avatar}
      </div>
      <div className="flex text-bsBodyColor text-[10px]">{cmt.comment}</div>
    </div>
  );
};
