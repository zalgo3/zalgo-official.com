import 'styles/global.css';

import {GoogleAnalytics} from '@next/third-parties/google';
import {defaultOgImage, siteUrl} from 'lib/siteMetadata';
import type {Metadata, Viewport} from 'next';
import Script from 'next/script';

import Footer from './footer';
import GoogleAds from './google-ads';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    alternates: {
        types: {
            'application/rss+xml': '/feed.xml',
        },
    },
    title: {
        default: 'ざるご Official Website',
        template: '%s | ざるご Official Website',
    },
    description:
        '歌い手/ゲーム実況者/データサイエンティストであるざるごのオフィシャルウェブサイト',
    openGraph: {
        title: 'ざるご Official Website',
        description:
            '歌い手/ゲーム実況者/データサイエンティストであるざるごのオフィシャルウェブサイト',
        url: siteUrl,
        siteName: 'ざるご Official Website',
        locale: 'ja_JP',
        type: 'website',
        images: [defaultOgImage],
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
        title: 'ざるご Official Website',
        description:
            '歌い手/ゲーム実況者/データサイエンティストであるざるごのオフィシャルウェブサイト',
        creator: '@zalgo_video',
        images: [defaultOgImage],
    },
};

export const viewport: Viewport = {
    themeColor: '#00aa90',
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <html lang="ja">
            <GoogleAnalytics gaId="G-KVTMLPFHK5" />
            <GoogleAds />
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
