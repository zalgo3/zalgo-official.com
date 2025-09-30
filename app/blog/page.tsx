import {getPostDataAll} from 'lib/posts';
import ShareButtons from 'ui/share-buttons';

import Breadcrumbs from '../Breadcrumbs';
import DisplayPosts from './DisplayPosts';

const Page = async () => {
    const posts = await getPostDataAll();
    const url = 'https://zalgo-official.com/blog';
    const title = 'ブログ';
    const authorAccount = 'zalgo3';
    const breadcrumbs = [{label: 'ブログ', href: '/blog'}];
    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
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
