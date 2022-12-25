import { getPost, getPostAll } from "lib/posts";
import { serialize } from "next-mdx-remote/serialize";
import DisplayPost from "./DisplayPost";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { content, ...post } = getPost(params.slug);
  const source = await serialize(content, {mdxOptions: {development: false}});
  return <DisplayPost source={source} />;
};

export const generateStaticParams = async () => {
    const posts = getPostAll();
    return posts.map((post) => ({
            slug: post.data.slug,
        }));
};

export default Page;
