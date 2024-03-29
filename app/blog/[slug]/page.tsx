import 'katex/dist/katex.min.css';
import 'prism-themes/themes/prism-nord.min.css';

import {format as formatTZ, utcToZonedTime} from 'date-fns-tz';
import {getPost, getPostAll} from 'lib/posts';
import remarkImagesToFullPaths from 'lib/remarkImagesToFullPaths';
import type {Metadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import styles from 'styles/app/blog/page.module.css';
import Affiliates from 'ui/affiliates';
import ShareButtons from 'ui/share-buttons';

export const generateMetadata = async ({
    params,
}: {
    params: {slug: string};
}): Promise<Metadata> => {
    const {content, ...post} = await getPost(params.slug);
    return {
        title: post.data.title,
        openGraph: {
            title: post.data.title,
            url: `https://zalgo-official.com/blog/${params.slug}`,
        },
        twitter: {
            title: post.data.title,
        },
    };
};

const Page = async ({params}: {params: {slug: string}}) => {
    const {content, ...post} = await getPost(params.slug);
    const postUrl = `https://zalgo-official.com/blog/${params.slug}`;
    const siteTitle = 'ざるごのブログ';
    const authorAccount = 'zalgo3';
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{post.data.title}</h1>
            <p className={styles.date}>
                投稿日時:{' '}
                {formatTZ(
                    utcToZonedTime(post.data.createdAt * 1000, 'Asia/Tokyo'),
                    'yyyy/MM/dd HH:mm'
                )}
            </p>
            <p className={styles.date}>
                最終更新日時:{' '}
                {formatTZ(
                    utcToZonedTime(post.data.updatedAt * 1000, 'Asia/Tokyo'),
                    'yyyy/MM/dd HH:mm'
                )}
            </p>
            <MDXRemote
                source={content}
                components={{Affiliates}}
                options={{
                    mdxOptions: {
                        remarkPlugins: [
                            remarkMath,
                            remarkGfm,
                            [remarkImagesToFullPaths, {slug: params.slug}],
                        ],
                        rehypePlugins: [rehypePrism, rehypeKatex],
                    },
                }}
            />
            <ShareButtons
                url={postUrl}
                title={post.data.title}
                siteTitle={siteTitle}
                authorAccount={authorAccount}
            />
        </div>
    );
};

export const generateStaticParams = async () => {
    const posts = await getPostAll();
    return posts.map(post => ({
        slug: post.data.slug,
    }));
};

export default Page;
