import React, { useEffect, useState } from "react";
import { PostItem } from "@/features";
import { PostType } from "@/features/Post/types";
import axios from "@/utiles/axios";

const Posts: React.FC = (): React.JSX.Element => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchMyPosts = async (): Promise<void> => {
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
      {posts?.map((post) => post && <PostItem post={post} key={post._id} />)}
    </div>
  );
};

export default Posts;
