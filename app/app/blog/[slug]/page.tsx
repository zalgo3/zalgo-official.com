import {getPost, getPostAll} from 'lib/posts';
import {serialize} from 'next-mdx-remote/serialize';
import DisplayPost from './DisplayPost';
import Header from 'app/blog/header';
import Footer from 'app/footer';

const Page = async ({params}: {params: {slug: string}}) => {
    const {content, ...post} = getPost(params.slug);
    const source = await serialize(content, {
        mdxOptions: {development: false},
    });
    return (
        <>
            <Header />
            <DisplayPost source={source} />
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
