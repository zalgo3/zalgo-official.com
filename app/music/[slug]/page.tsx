import 'katex/dist/katex.min.css';
import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {FaArrowLeft} from 'react-icons/fa';

import {getMusic, getMusicAll} from 'lib/musics';
import styles from 'styles/app/blog/page.module.css';
import pageStyles from 'styles/app/music/page.module.css';
import MusicLinks from 'ui/MusicLinks';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{slug: string}>;
}): Promise<Metadata> => {
    const resolvedParams = await params;
    const music = await getMusic(resolvedParams.slug);

    const ogImageUrl = music.data.thumbnailUrl
        ? `https://zalgo-official.com${music.data.thumbnailUrl}`
        : undefined;

    return {
        title: music.data.title,
        openGraph: {
            title: music.data.title,
            images: ogImageUrl ? [{url: ogImageUrl}] : [],
        },
        twitter: {
            title: music.data.title,
            card: 'summary_large_image',
            images: ogImageUrl ? [ogImageUrl] : [],
        },
    };
};

const Page = async ({params}: {params: Promise<{slug: string}>}) => {
    const resolvedParams = await params;
    const music = await getMusic(resolvedParams.slug);

    const artistDisplayText = music.data.collaboration
        ? `${music.data.artist}×${music.data.collaboration}`
        : music.data.artist;

    return (
        <div className={styles.container}>
            <Link href="/music" className={pageStyles.backLink}>
                <FaArrowLeft /> 楽曲一覧へ戻る
            </Link>

            <h1 className={styles.title} style={{textAlign: 'center'}}>
                {music.data.title}
            </h1>

            <div className={pageStyles.creditContainer}>
                <div className={pageStyles.artistBox}>
                    Artist: {artistDisplayText}
                </div>
                <p className={pageStyles.composerText}>
                    Composer: {music.data.composer}
                </p>
                {music.data.illustrator && (
                    <p className={pageStyles.composerText}>
                        Illustrator: {music.data.illustrator}
                    </p>
                )}
                {music.data.mixer && (
                    <p className={pageStyles.composerText}>
                        Mixer: {music.data.mixer}
                    </p>
                )}
            </div>

            {music.data.thumbnailUrl && (
                <div className={pageStyles.thumbnailContainer}>
                    <Image
                        src={music.data.thumbnailUrl}
                        alt={music.data.title}
                        width={350}
                        height={350}
                        style={{objectFit: 'cover', borderRadius: '16px'}}
                    />
                </div>
            )}

            <p className={pageStyles.linksHeading}>配信サイト</p>
            <MusicLinks links={music.data.links} />
        </div>
    );
};

export const generateStaticParams = async () => {
    const musics = await getMusicAll();
    return musics.map(music => ({
        slug: music.data.slug,
    }));
};

export default Page;
