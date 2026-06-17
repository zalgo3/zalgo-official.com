import 'katex/dist/katex.min.css';

import {YouTubeEmbed} from '@next/third-parties/google';
import {format as formatTZ, toZonedTime} from 'date-fns-tz';
import {getPost, getPostAll, getPostDataAll} from 'lib/posts';
import remarkImagesToFullPaths from 'lib/remarkImagesToFullPaths';
import {siteUrl} from 'lib/siteMetadata';
import {excerpt} from 'lib/string';
import type {Metadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import styles from 'styles/app/blog/page.module.css';
import Affiliates from 'ui/affiliates';
import ApiCredit from 'ui/ApiCredit';
import NicoNicoEmbed from 'ui/NicoNicoEmbed';
import PostImage from 'ui/PostImage';
import ShareButtons from 'ui/share-buttons';

import Breadcrumbs from '../../Breadcrumbs';
import RelatedPosts from '../RelatedPosts';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{slug: string}>;
}): Promise<Metadata> => {
    const resolvedParams = await params;
    const {content, data} = await getPost(resolvedParams.slug);
    const description = excerpt(content);
    const url = `${siteUrl}/blog/${resolvedParams.slug}`;
    return {
        title: data.title,
        description,
        openGraph: {
            title: data.title,
            description,
            url,
            type: 'article',
        },
        twitter: {
            title: data.title,
            description,
        },
    };
};

const Page = async ({params}: {params: Promise<{slug: string}>}) => {
    const resolvedParams = await params;
    const {content, ...post} = await getPost(resolvedParams.slug);
    // Show the API credit only on posts that actually render affiliate cards.
    const hasAffiliates = content.includes('<Affiliates');
    const postUrl = `https://zalgo-official.com/blog/${resolvedParams.slug}`;
    const siteTitle = 'ブログ | ざるご Official Website';
    const authorAccount = 'zalgo3';
    const breadcrumbs = [
        {label: 'ブログ', href: '/blog'},
        {label: post.data.title, href: `/blog/${resolvedParams.slug}`},
    ];
    // Related posts: prefer the same category, then fill with the most recent
    // other posts. (The full list is already sorted newest-first.)
    const otherPosts = (await getPostDataAll()).filter(
        p => p.slug !== resolvedParams.slug
    );
    const relatedPosts = [
        ...otherPosts.filter(p => p.category === post.data.category),
        ...otherPosts.filter(p => p.category !== post.data.category),
    ].slice(0, 3);
    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.data.title,
        datePublished: new Date(post.data.createdAt * 1000).toISOString(),
        dateModified: new Date(post.data.updatedAt * 1000).toISOString(),
        author: {'@type': 'Person', name: 'Hiroki Tanabe'},
        mainEntityOfPage: postUrl,
        url: postUrl,
    };
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd),
                }}
            />
            <Breadcrumbs items={breadcrumbs} />
            <div className={`${styles.container} container`}>
                <div>
                    <h1 className={styles.title}>{post.data.title}</h1>
                    <p className={styles.date}>
                        投稿日時:{' '}
                        {formatTZ(
                            toZonedTime(
                                post.data.createdAt * 1000,
                                'Asia/Tokyo'
                            ),
                            'yyyy/MM/dd HH:mm'
                        )}
                    </p>
                    <p className={styles.date}>
                        最終更新日時:{' '}
                        {formatTZ(
                            toZonedTime(
                                post.data.updatedAt * 1000,
                                'Asia/Tokyo'
                            ),
                            'yyyy/MM/dd HH:mm'
                        )}
                    </p>
                    <MDXRemote
                        source={content}
                        components={{
                            Affiliates,
                            YouTubeEmbed,
                            NicoNicoEmbed,
                            img: PostImage,
                        }}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [
                                    remarkMath,
                                    remarkGfm,
                                    [
                                        remarkImagesToFullPaths,
                                        {slug: resolvedParams.slug},
                                    ],
                                ],
                                rehypePlugins: [
                                    rehypePrettyCode,
                                    rehypeKatex,
                                    rehypeSlug,
                                    [
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        rehypeToc as any,
                                        {
                                            headings: ['h2', 'h3'],
                                            nav: true,
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            customizeTOC: (toc: any) => {
                                                return {
                                                    type: 'element',
                                                    tagName: 'details',
                                                    properties: {open: false},
                                                    children: [
                                                        {
                                                            type: 'element',
                                                            tagName: 'summary',
                                                            properties: {},
                                                            children: [
                                                                {
                                                                    type: 'text',
                                                                    value: '目次',
                                                                },
                                                            ],
                                                        },
                                                        toc,
                                                    ],
                                                };
                                            },
                                        },
                                    ],
                                ],
                            },
                        }}
                    />
                    <ShareButtons
                        url={postUrl}
                        title={post.data.title}
                        siteTitle={siteTitle}
                        authorAccount={authorAccount}
                    />
                    {hasAffiliates && <ApiCredit />}
                    <RelatedPosts posts={relatedPosts} />
                </div>
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
