import type {Metadata} from 'next';

import Header from '../header';
import Search from './search';
import SocialLinks from './social-links';

export const metadata: Metadata = {
    title: {
        default: 'ブログ',
        template: '%s | ブログ | ざるご Official Website',
    },
    description:
        '歌い手/ゲーム実況者/データサイエンティストであるざるごのブログ',
    openGraph: {
        title: 'ブログ',
        description:
            '歌い手/ゲーム実況者/データサイエンティストであるざるごのブログ',
        url: 'https://zalgo-official.com/blog',
        siteName: 'ざるご Official Website',
    },
    twitter: {
        title: 'ブログ',
        description:
            '歌い手/ゲーム実況者/データサイエンティストであるざるごのブログ',
    },
};

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Header />
            <Search />
            <SocialLinks />
            {children}
        </>
    );
};

export default Layout;
