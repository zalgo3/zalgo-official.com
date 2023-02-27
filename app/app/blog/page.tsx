import {getPostDataAll} from 'lib/posts';

import DisplayPosts from './DisplayPosts';

const Page = async () => {
    const posts = await getPostDataAll();
    return (
        <>
            <DisplayPosts posts={posts} />
        </>
    );
};

export default Page;
