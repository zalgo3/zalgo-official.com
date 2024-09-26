import type {Metadata} from 'next';

import Header from './header';
import Search from './search';
import SocialLinks from './social-links';

export const metadata: Metadata = {
    title: {
        default: 'ざるごのブログ',
        template: '%s | ざるごのブログ',
    },
    description:
        '歌い手/ゲーム実況者/博士 (情報学)/データサイエンティストであるざるご (田辺広樹) のブログです。',
    openGraph: {
        title: 'ざるごのブログ',
        description:
            '歌い手/ゲーム実況者/博士 (情報学)/データサイエンティストであるざるご (田辺広樹) のブログです。',
        url: 'https://zalgo-official.com/blog',
        siteName: 'ざるごのブログ',
    },
    twitter: {
        title: 'ざるごのブログ',
        description:
            '歌い手/ゲーム実況者/博士 (情報学)/データサイエンティストであるざるご (田辺広樹) のブログです。',
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
