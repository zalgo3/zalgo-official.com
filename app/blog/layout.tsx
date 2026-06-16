import {defaultOgImage, siteUrl} from 'lib/siteMetadata';
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
        url: `${siteUrl}/blog`,
        siteName: 'ざるご Official Website',
        images: [defaultOgImage],
    },
    twitter: {
        title: 'ブログ',
        description:
            '歌い手/ゲーム実況者/データサイエンティストであるざるごのブログ',
        images: [defaultOgImage],
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
