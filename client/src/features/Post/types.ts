export type PostType = {
  author: string;
  comments: string[];
  createdAt: string;
  imgUrl: string;
  text: string;
  title: string;
  updatedAt: string;
  usermail: string;
  views: number;
  __v: number;
  _id: string;
};

export interface PostState {
  posts: PostType[];
  popularPosts: PostType[];
  loading: boolean;
}

export interface ExtendedFormData extends FormData {
  id: string;
}
