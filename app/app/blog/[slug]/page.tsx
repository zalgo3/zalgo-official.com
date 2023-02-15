import {getPost, getPostAll} from 'lib/posts';
import {serialize} from 'next-mdx-remote/serialize';
import Article from './article';
import Header from 'app/blog/header';
import Footer from 'app/footer';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypePrism from '@mapbox/rehype-prism';
import {utcToZonedTime, format as formatTZ} from 'date-fns-tz';
import styles from 'styles/app/blog/page.module.css';
import type {Metadata} from 'next';

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
            url: `https://zalgo-official.com/${params.slug}`,
        },
        twitter: {
            title: post.data.title,
        },
    };
};

const Page = async ({params}: {params: {slug: string}}) => {
    const {content, ...post} = await getPost(params.slug);
    const source = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkMath, remarkGfm],
            rehypePlugins: [rehypePrism, rehypeKatex],
            development: false,
        },
    });
    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>{post.data.title}</h1>
                <p className={styles.date}>
                    投稿日時:{' '}
                    {formatTZ(
                        utcToZonedTime(
                            post.data.createdAt * 1000,
                            'Asia/Tokyo'
                        ),
                        'yyyy/MM/dd HH:mm'
                    )}
                </p>
                <p className={styles.date}>
                    最終更新日時:{' '}
                    {formatTZ(
                        utcToZonedTime(
                            post.data.updatedAt * 1000,
                            'Asia/Tokyo'
                        ),
                        'yyyy/MM/dd HH:mm'
                    )}
                </p>
                <Article source={source} />
            </div>
            <Footer />
        </>
    );
};

export const generateStaticParams = async () => {
    const posts = getPostAll();
    return posts.map(post => ({
        slug: post.data.slug,
    }));
};

export default Page;
