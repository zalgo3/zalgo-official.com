import { getPost } from "lib/posts";
import { serialize } from "next-mdx-remote/serialize";
import DisplayPost from "./DisplayPost";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { content, _ } = await getPost(params.slug);
  const source = await serialize(content, {mdxOptions: {development: false}});
  return <DisplayPost source={source} />;
};

export default Page;
