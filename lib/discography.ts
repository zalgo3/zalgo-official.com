import {exec} from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import {promisify} from 'util';

import matter, {GrayMatterFile} from 'gray-matter';

const discographyPath = 'discography';

type Options = {
    limit?: number;
};

export type DiscographyData = {
    slug: string;
    title: string;
    artist: string;
    collaboration?: string;
    composer: string;
    lyricist: string;
    illustrator?: string;
    mixer?: string;
    thumbnailUrl?: string;
    links: {
        appleMusic?: string;
        spotify?: string;
        youtubeMusic?: string;
        amazonMusic?: string;
        lineMusic?: string;
        awa?: string;
        tiktok?: string;
        instagram?: string;
        facebook?: string;
        itunesStore?: string;
        amazonDigitalMusic?: string;
        recochoku?: string;
        dwango?: string;
        animelo?: string;
        rakutenMusic?: string;
        dhits?: string;
        kkbox?: string;
        orimyuStore?: string;
        mora?: string;
        musicjp?: string;
        mySound?: string;
        ototoy?: string;
    };
    createdAt: number;
    updatedAt: number;
};

export type DiscographyItem = GrayMatterFile<Buffer> & {
    data: DiscographyData;
};

/**
 * AmazonのURLにアフィリエイトタグを付与するヘルパー関数
 * @param urlString - 元のURL
 * @returns タグが付与されたURL
 */
const addAmazonTag = (urlString: string | undefined): string | undefined => {
    if (!urlString) {
        return undefined;
    }
    const tag = process.env.AMAZON_ASSOCIATE_PARTNER_TAG;
    if (!tag) {
        return urlString;
    }
    const separator = urlString.includes('?') ? '&' : '?';
    return `${urlString}${separator}tag=${tag}`;
};

export const getDiscographyAll = async (
    options: Options = {}
): Promise<DiscographyItem[]> => {
    const items = (
        await Promise.all(
            (await fs.readdir(discographyPath)).map(async slug => {
                const itemPath = path.join(discographyPath, slug, 'post.md');
                try {
                    const item = matter(await fs.readFile(itemPath));
                    const data = item.data as Partial<DiscographyData>;
                    data.slug = slug;

                    if (data.thumbnail) {
                        data.thumbnailUrl = `/discography/${slug}/${String(
                            data.thumbnail
                        )}`;
                    }

                    if (data.links) {
                        data.links.amazonMusic = addAmazonTag(
                            data.links.amazonMusic
                        );
                        data.links.amazonDigitalMusic = addAmazonTag(
                            data.links.amazonDigitalMusic
                        );
                    }

                    item.data = data as DiscographyData;

                    item.data.createdAt = parseInt(
                        (
                            await promisify(exec)(
                                `git log --date=unix --reverse --format=%cd ${itemPath}`
                            )
                        ).stdout
                            .trim()
                            .split('\n')[0],
                        10
                    );
                    item.data.updatedAt = parseInt(
                        (
                            await promisify(exec)(
                                `git log --date=unix -1 --format=%cd ${itemPath}`
                            )
                        ).stdout.trim(),
                        10
                    );
                    return item as DiscographyItem;
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
        .filter((item): item is DiscographyItem => !!item)
        .sort((p1: DiscographyItem, p2: DiscographyItem) => {
            if (p1.data.createdAt === p2.data.createdAt) {
                return p1.data.slug.localeCompare(p2.data.slug);
            }
            return p2.data.createdAt - p1.data.createdAt;
        })
        .slice(0, options.limit);

    return items;
};

export const getDiscographyDataAll = async (
    options?: Options
): Promise<DiscographyData[]> => {
    return (await getDiscographyAll(options)).map(m => m.data);
};

export const getDiscographyItem = async (
    slug: string
): Promise<DiscographyItem> => {
    const items = await getDiscographyAll();
    const idx = items.findIndex(m => m.data.slug === slug);
    return items[idx];
};
