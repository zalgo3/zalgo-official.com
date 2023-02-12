import DisplayPosts from './DisplayPosts';
import Header from './header';
import Footer from 'app/footer';
import { getPostDataAll } from 'lib/posts';

const Page = async () => {
    const posts = getPostDataAll();
    return (
        <>
            <Header />
            <DisplayPosts posts={posts} />
            <Footer />
        </>
    );
};

export default Page;
