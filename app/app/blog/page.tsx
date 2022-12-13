import { getPostDataAll } from "lib/posts";
import { DisplayPosts } from "./DisplayPosts";

const Page = () => {
  const posts = getPostDataAll({ limit: 3 });
  return <DisplayPosts posts={posts} />;
};

export default Page;
