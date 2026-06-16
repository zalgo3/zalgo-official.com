import {exec} from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import {promisify} from 'util';

import matter, {GrayMatterFile} from 'gray-matter';

import {getPostCategory} from './postCategories';
import {excerpt} from './string';

const postsPath = 'posts';

type Options = {
    limit?: number;
};

const loadPosts = async (): Promise<Post[]> => {
    const posts = (
        await Promise.all(
            (await fs.readdir(postsPath)).map(async slug => {
                const postPath = path.join(postsPath, slug, 'post.md');
                try {
                    const post = matter(await fs.readFile(postPath));
                    post.data.slug = slug;
                    post.data.excerpt = excerpt(post.content);
                    post.data.category = getPostCategory(slug);
                    post.data.createdAt = parseInt(
                        (
                            await promisify(exec)(
                                `git log --date=unix --reverse --format=%cd ${postPath}`
                            )
                        ).stdout
                            .trim()
                            .split('\n')[0],
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
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    } else {
                        console.error('Unknown error:', error);
                    }
                    return;
                }
            })
        )
    )
        .filter((post): post is Post => !!post)
        .sort((p1: Post, p2: Post) => {
            if (p1.data.createdAt === p2.data.createdAt) {
                return p1.data.slug.localeCompare(p2.data.slug);
            }
            return p2.data.createdAt - p1.data.createdAt;
        });

    return posts;
};

// Memoize the full post list during production builds. Every statically
// generated page used to call getPostAll (directly or via getPost), and each
// call re-read every post and spawned two `git log` processes per post — an
// O(N^2) blow-up in subprocess spawns. The list is immutable during a build, so
// caching it is safe. Skipped in development so post edits stay fresh.
let cachedPosts: Promise<Post[]> | undefined;
const loadPostsCached = (): Promise<Post[]> =>
    process.env.NODE_ENV === 'production'
        ? (cachedPosts ??= loadPosts())
        : loadPosts();

export const getPostAll = async (options: Options = {}): Promise<Post[]> => {
    const posts = await loadPostsCached();
    return options.limit ? posts.slice(0, options.limit) : posts;
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

export type Post = GrayMatterFile<Buffer> & {
    data: PostData;
    prevPostData: PostData | undefined;
    nextPostData: PostData | undefined;
};

export type PostData = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    createdAt: number;
    updatedAt: number;
};

export type PageProps = {
    params?: unknown;
    children?: React.ReactNode;
};
