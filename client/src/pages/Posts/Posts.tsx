import { useEffect, useState } from "react";
import { PostItem } from "@/components";
import axios from "@/utiles/axios";
import { Post } from "@/redux/slices/postSlice";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);
  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts &&
        posts.map((post) => post && <PostItem post={post} key={post._id} />)}
    </div>
  );
};
export default Posts;
