import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: {
        default: 'ざるごのブログ',
        template: '%s | ざるごのブログ',
    },
    description:
        '京都大学博士 (情報学)/歌い手/ゲーム実況者/RTAランナーであるざるご (田辺広樹) のブログです。',
    openGraph: {
        title: 'ざるごのブログ',
        description:
            '京都大学博士 (情報学)/歌い手/ゲーム実況者/RTAランナーであるざるご (田辺広樹) のブログです。',
        url: 'https://zalgo-official.com/blog',
        siteName: 'ざるごのブログ',
    },
    twitter: {
        title: 'ざるごのブログ',
        description:
            '京都大学博士 (情報学)/歌い手/ゲーム実況者/RTAランナーであるざるご (田辺広樹) のブログです。',
    },
};

const Layout = ({children}: {children: React.ReactNode}) => {
    return <>{children}</>;
};

export default Layout;
