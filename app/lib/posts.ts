import path from "path";
import fs from "fs";
import matter, { GrayMatterFile, Input } from "gray-matter";
import moment from "moment";

const postsPath = "posts";

type Options = {
  limit?: number;
};

export const getPostAll = (options: Options = {}): Post[] => {
  const posts = fs
    .readdirSync(postsPath)
    .map((slug: string) => {
      const postPath = path.join(postsPath, slug, "post.md");
      try {
        const { atime, mtime } = fs.statSync(postPath);
        let { orig, ...post } = matter(fs.readFileSync(postPath));
        post.data.slug = slug;
        post.data.createdAt = atime.toJSON();
        post.data.updatedAt = mtime.toJSON();
        return post;
      } catch (err) {
        return;
      }
    })
    .filter((post) => typeof post !== "undefined")
    .slice(0, options.limit)
    .sort((m1, m2) =>
      moment(m1.data.createdAt).isAfter(m2.data.createdAt) ? -1 : 1
    );

  return posts as Post[];
};

export const getPostDataAll = (options: Options): PostData[] => {
  return getPostAll(options).map((m) => m.data);
};

export const getPost = (slug: string): Post => {
  const posts = getPostAll();
  const idx = posts.findIndex((m) => m.data.slug === slug);
  const post = posts[idx];
  const prevPostData = posts[idx - 1]?.data ?? undefined;
  const nextPostData = posts[idx + 1]?.data ?? undefined;
  return { ...post, prevPostData, nextPostData };
};

export type Post = GrayMatterFile<Input> & {
  data: PostData;
  orig: undefined;
  prevPostData: PostData | undefined;
  nextPostData: PostData | undefined;
};

export type PostData = {
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};
