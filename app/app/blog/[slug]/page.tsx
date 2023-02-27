import rehypePrism from '@mapbox/rehype-prism';
import {format as formatTZ, utcToZonedTime} from 'date-fns-tz';
import {getPost, getPostAll} from 'lib/posts';
import type {Metadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import styles from 'styles/app/blog/page.module.css';

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
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
                integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                // @ts-expect-error
                precedence="default"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-nord.min.css"
                integrity="sha512-/1nWQ0aAin0IGM5zDndLyY+6xUSiqA1ILh4Mm0XjSqqj4cXOH36rB/2Ep96sT4FOxvNEnUxyPNwqPlEmuImAFw=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                // @ts-expect-error
                precedence="default"
            />
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
                {/* @ts-expect-error */}
                <MDXRemote
                    source={content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkMath, remarkGfm],
                            rehypePlugins: [rehypePrism, rehypeKatex],
                        },
                    }}
                />
            </div>
        </>
    );
};

export const generateStaticParams = async () => {
    const posts = await getPostAll();
    return posts.map(post => ({
        slug: post.data.slug,
    }));
};

export default Page;
