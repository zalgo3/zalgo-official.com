import 'katex/dist/katex.min.css';
import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {FaArrowLeft} from 'react-icons/fa';

import {getDiscographyItem, getDiscographyAll} from 'lib/discography';
import styles from 'styles/app/blog/page.module.css';
import pageStyles from 'styles/app/discography/page.module.css';
import DiscographyLinks from 'ui/DiscographyLinks';
import ShareButtons from 'ui/share-buttons';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{slug: string}>;
}): Promise<Metadata> => {
    const resolvedParams = await params;
    const discographyItem = await getDiscographyItem(resolvedParams.slug);

    const ogImageUrl = discographyItem.data.thumbnailUrl
        ? `https://zalgo-official.com${discographyItem.data.thumbnailUrl}`
        : undefined;

    return {
        title: discographyItem.data.title,
        openGraph: {
            title: discographyItem.data.title,
            images: ogImageUrl ? [{url: ogImageUrl}] : [],
        },
        twitter: {
            title: discographyItem.data.title,
            card: 'summary_large_image',
            images: ogImageUrl ? [ogImageUrl] : [],
        },
    };
};

const Page = async ({params}: {params: Promise<{slug: string}>}) => {
    const resolvedParams = await params;
    const discographyItem = await getDiscographyItem(resolvedParams.slug);
    const postUrl = `https://zalgo-official.com/discography/${resolvedParams.slug}`;
    const siteTitle = 'ざるご Official Website';
    const authorAccount = 'zalgo3';

    const artistDisplayText = discographyItem.data.collaboration
        ? `${discographyItem.data.artist}×${discographyItem.data.collaboration}`
        : discographyItem.data.artist;

    return (
        <div className={styles.container}>
            <Link href="/discography" className={pageStyles.backLink}>
                <FaArrowLeft /> 楽曲一覧へ戻る
            </Link>

            <h1 className={styles.title} style={{textAlign: 'center'}}>
                {discographyItem.data.title}
            </h1>

            <div className={pageStyles.creditContainer}>
                <div className={pageStyles.artistBox}>
                    Artist: {artistDisplayText}
                </div>
                <p className={pageStyles.composerText}>
                    Composer: {discographyItem.data.composer}
                </p>
                {discographyItem.data.illustrator && (
                    <p className={pageStyles.composerText}>
                        Illustrator: {discographyItem.data.illustrator}
                    </p>
                )}
                {discographyItem.data.mixer && (
                    <p className={pageStyles.composerText}>
                        Mixer: {discographyItem.data.mixer}
                    </p>
                )}
            </div>

            {discographyItem.data.thumbnailUrl && (
                <div className={pageStyles.thumbnailContainer}>
                    <Image
                        src={discographyItem.data.thumbnailUrl}
                        alt={discographyItem.data.title}
                        width={350}
                        height={350}
                        style={{objectFit: 'cover', borderRadius: '16px'}}
                    />
                </div>
            )}

            <p className={pageStyles.linksHeading}>配信サイト</p>
            <DiscographyLinks links={discographyItem.data.links} />

            <ShareButtons
                url={postUrl}
                title={discographyItem.data.title}
                siteTitle={siteTitle}
                authorAccount={authorAccount}
            />
        </div>
    );
};

export const generateStaticParams = async () => {
    const items = await getDiscographyAll();
    return items.map(item => ({
        slug: item.data.slug,
    }));
};

export default Page;
