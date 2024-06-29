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
        '京都大学博士 (情報学)/歌い手/ゲーム実況者/RTAランナー ハンドルネームはざるご、本名は田辺広樹 (Hiroki Tanabe) 「数理最適化」の研究を行う傍ら、YouTube、ニコニコ動画への動画投稿を行い、総再生回数は500万回超',
    openGraph: {
        title: 'ざるご / 田辺広樹',
        description:
            '京都大学博士 (情報学)/歌い手/ゲーム実況者/RTAランナー ハンドルネームはざるご、本名は田辺広樹 (Hiroki Tanabe) 「数理最適化」の研究を行う傍ら、YouTube、ニコニコ動画への動画投稿を行い、総再生回数は500万回超',
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
            '京都大学博士 (情報学)/歌い手/ゲーム実況者/RTAランナー ハンドルネームはざるご、本名は田辺広樹 (Hiroki Tanabe) 「数理最適化」の研究を行う傍ら、YouTube、ニコニコ動画への動画投稿を行い、総再生回数は500万回超',
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
