import DisplayPosts from './DisplayPosts';
import Footer from 'app/footer';
import { getPostDataAll } from 'lib/posts';

const Page = async () => {
    const posts = getPostDataAll();
    return (
        <>
            <DisplayPosts posts={posts} />
        </>
    );
};

export default Page;
