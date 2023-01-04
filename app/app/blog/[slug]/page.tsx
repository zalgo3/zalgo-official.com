import {getPost, getPostAll} from 'lib/posts';
import {serialize} from 'next-mdx-remote/serialize';
import Article from './article';
import Header from 'app/blog/header';
import Footer from 'app/footer';
import remarkMath from 'remark-math';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeKatex from 'rehype-katex';

const Page = async ({params}: {params: {slug: string}}) => {
    const {content, ...post} = getPost(params.slug);
    const source = await serialize(content, {
        mdxOptions: {
            development: false,
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        },
    });
    const mathSource = await serialize('Hello *world* and $1+1=2$ math mode', {
        mdxOptions: {
            development: false,
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        },
    });
    return (
        <>
            <Header />
            <Article source={mathSource} />
            <Article source={source} />
            <Footer />
        </>
    );
};

const generateStaticParams = async () => {
    const posts = getPostAll();
    return posts.map(post => ({
        slug: post.data.slug,
    }));
};

export default Page;
