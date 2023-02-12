import path from 'path';
import fs from 'fs';
import matter, { GrayMatterFile, Input } from 'gray-matter';
import { execSync } from 'child_process';

const postsPath = 'posts';

type Options = {
    limit?: number;
};

export const getPostAll = (options: Options = {}): Post[] => {
    const posts = fs
        .readdirSync(postsPath)
        .map(slug => {
            const postPath = path.join(postsPath, slug, 'post.md');
            if (!fs.existsSync(postPath)) {
                return;
            }
            try {
                let { orig, ...post } = matter(fs.readFileSync(postPath));
                post.data.slug = slug;
                post.data.createdAt = parseInt(
                    execSync(
                        `git log --date=unix --reverse -1 --format=%cd ${postPath}`
                    )
                        .toString()
                        .trim(),
                    10
                );
                post.data.updatedAt = parseInt(
                    execSync(`git log --date=unix -1 --format=%cd ${postPath}`)
                        .toString()
                        .trim(),
                    10
                );
                return post;
            } catch (error: any) {
                console.error(error.message);
                return;
            }
        })
        .filter((post): post is Post => !!post)
        .sort((p1, p2) => p2.data.createdAt - p1.data.createdAt)
        .slice(0, options.limit);

    return posts as Post[];
};

export const getPostDataAll = (options?: Options): PostData[] => {
    return getPostAll(options).map(m => m.data);
};

export const getPost = (slug: string): Post => {
    const posts = getPostAll();
    const idx = posts.findIndex(m => m.data.slug === slug);
    const post = posts[idx];
    const prevPostData = posts[idx - 1]?.data ?? undefined;
    const nextPostData = posts[idx + 1]?.data ?? undefined;
    return { ...post, prevPostData, nextPostData };
};

export type Post = GrayMatterFile<Input> & {
    data: PostData;
    prevPostData: PostData | undefined;
    nextPostData: PostData | undefined;
};

export type PostData = {
    slug: string;
    title: string;
    createdAt: number;
    updatedAt: number;
};

export type PageProps = {
    params?: any;
    children?: React.ReactNode;
};
