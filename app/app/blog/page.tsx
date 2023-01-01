import {getPostDataAll} from 'lib/posts';
import DisplayPosts from './DisplayPosts';
import Footer from 'app/footer';

const Page = () => {
    const posts = getPostDataAll({limit: 3});
    return (
        <>
            <DisplayPosts posts={posts} />
            <Footer />
        </>
    );
};

export default Page;
