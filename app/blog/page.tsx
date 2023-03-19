import {getPostDataAll} from 'lib/posts';
import ShareButtons from 'ui/share-buttons';

import DisplayPosts from './DisplayPosts';

const Page = async () => {
    const posts = await getPostDataAll();
    const url = 'https://zalgo-official.com/blog';
    const title = 'ざるごのブログ';
    const authorAccount = 'zalgo3';
    return (
        <>
            <DisplayPosts posts={posts} />
            <ShareButtons
                url={url}
                title={title}
                authorAccount={authorAccount}
            />
        </>
    );
};

export default Page;
