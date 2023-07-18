export interface Comment {
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
}
