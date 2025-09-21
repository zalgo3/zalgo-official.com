import {exec} from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import {promisify} from 'util';

import matter, {GrayMatterFile} from 'gray-matter';

const musicsPath = 'music';

type Options = {
    limit?: number;
};

export type MusicData = {
    slug: string;
    title: string;
    artist: string;
    collaboration?: string;
    composer: string;
    illustrator: string;
    thumbnailUrl?: string;
    links: {
        appleMusic?: string;
        spotify?: string;
        youtubeMusic?: string;
        amazonMusic?: string;
        lineMusic?: string;
        awa?: string;
        recochoku?: string;
        tiktok?: string;
        instagram?: string;
        facebook?: string;
        dwango?: string;
        animelo?: string;
    };
    createdAt: number;
    updatedAt: number;
};

export type Music = GrayMatterFile<Buffer> & {
    data: MusicData;
};

export const getMusicAll = async (options: Options = {}): Promise<Music[]> => {
    const musics = (
        await Promise.all(
            (await fs.readdir(musicsPath)).map(async slug => {
                const musicPath = path.join(musicsPath, slug, 'post.md');
                try {
                    const music = matter(await fs.readFile(musicPath));
                    music.data.slug = slug;

                    if (music.data.thumbnail) {
                        music.data.thumbnailUrl = `/music/${slug}/${String(
                            music.data.thumbnail
                        )}`;
                    }
                    music.data.createdAt = parseInt(
                        (
                            await promisify(exec)(
                                `git log --date=unix --reverse --format=%cd ${musicPath}`
                            )
                        ).stdout
                            .trim()
                            .split('\n')[0],
                        10
                    );
                    music.data.updatedAt = parseInt(
                        (
                            await promisify(exec)(
                                `git log --date=unix -1 --format=%cd ${musicPath}`
                            )
                        ).stdout.trim(),
                        10
                    );
                    return music as Music;
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
        .filter((music): music is Music => !!music)
        .sort((p1: Music, p2: Music) => {
            if (p1.data.createdAt === p2.data.createdAt) {
                return p1.data.slug.localeCompare(p2.data.slug);
            }
            return p2.data.createdAt - p1.data.createdAt;
        })
        .slice(0, options.limit);

    return musics;
};

export const getMusicDataAll = async (
    options?: Options
): Promise<MusicData[]> => {
    return (await getMusicAll(options)).map(m => m.data);
};

export const getMusic = async (slug: string): Promise<Music> => {
    const musics = await getMusicAll();
    const idx = musics.findIndex(m => m.data.slug === slug);
    return musics[idx];
};
