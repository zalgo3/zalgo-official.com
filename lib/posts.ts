import {exec} from 'child_process';
import fs from 'fs/promises';
import matter, {GrayMatterFile, Input} from 'gray-matter';
import path from 'path';
import {promisify} from 'util';

const postsPath = 'posts';

type Options = {
    limit?: number;
};

export const getPostAll = async (options: Options = {}): Promise<Post[]> => {
    const posts = (
        await Promise.all(
            (await fs.readdir(postsPath)).map(async slug => {
                const postPath = path.join(postsPath, slug, 'post.md');
                try {
                    let {orig, ...post} = matter(await fs.readFile(postPath));
                    post.data.slug = slug;
                    post.data.createdAt = parseInt(
                        (
                            await promisify(exec)(
                                `git log --date=unix --reverse --format=%cd ${postPath} | head -n 1`
                            )
                        ).stdout.trim(),
                        10
                    );
                    post.data.updatedAt = parseInt(
                        (
                            await promisify(exec)(
                                `git log --date=unix -1 --format=%cd ${postPath}`
                            )
                        ).stdout.trim(),
                        10
                    );
                    return post;
                } catch (error: any) {
                    console.error(error.message);
                    return;
                }
            })
        )
    )
        .filter((post): post is Post => !!post)
        .sort((p1, p2) => {
            if (p1.data.createdAt === p2.data.createdAt) {
                return p1.data.slug.localeCompare(p2.data.slug);
            }
            return p2.data.createdAt - p1.data.createdAt;
        })
        .slice(0, options.limit);

    return posts as Post[];
};

export const getPostDataAll = async (
    options?: Options
): Promise<PostData[]> => {
    return (await getPostAll(options)).map(m => m.data);
};

export const getPost = async (slug: string): Promise<Post> => {
    const posts = await getPostAll();
    const idx = posts.findIndex(m => m.data.slug === slug);
    const post = posts[idx];
    const prevPostData = posts[idx - 1]?.data ?? undefined;
    const nextPostData = posts[idx + 1]?.data ?? undefined;
    return {...post, prevPostData, nextPostData};
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
