import 'styles/global.css';

import {GoogleAnalytics} from '@next/third-parties/google';
import type {Metadata} from 'next';
import Script from 'next/script';

import Footer from './footer';

export const metadata: Metadata = {
    title: {
        default: 'ざるご / 田辺広樹',
        template: '%s | ざるご / 田辺広樹',
    },
    description:
        '歌い手/ゲーム実況者/博士 (情報学)/データサイエンティスト ハンドルネームはざるご、本名は田辺広樹 (Hiroki Tanabe)',
    openGraph: {
        title: 'ざるご / 田辺広樹',
        description:
            '歌い手/ゲーム実況者/博士 (情報学)/データサイエンティスト ハンドルネームはざるご、本名は田辺広樹 (Hiroki Tanabe)',
        url: 'https://zalgo-official.com',
        siteName: 'ざるご / 田辺広樹',
        locale: 'ja_JP',
        type: 'website',
    },
    icons: {
        icon: [
            {url: '/favicons/favicon-32x32.png', sizes: '32x32'},
            {url: '/favicons/favicon-16x16.png', sizes: '16x16'},
        ],
        apple: [{url: '/favicons/apple-touch-icon.png', sizes: '180x180'}],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ざるご / 田辺広樹',
        description:
            '歌い手/ゲーム実況者/博士 (情報学)/データサイエンティスト ハンドルネームはざるご、本名は田辺広樹 (Hiroki Tanabe)',
        creator: '@zalgo3',
    },
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <html lang="ja">
            <GoogleAnalytics gaId="G-KVTMLPFHK5" />
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3520947091484443"
                crossOrigin="anonymous"
            />
            <body>
                {children}
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
