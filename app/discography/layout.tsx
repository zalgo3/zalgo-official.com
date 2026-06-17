import {defaultOgImage, siteUrl} from 'lib/siteMetadata';
import type {Metadata} from 'next';

import Header from '../header';

export const metadata: Metadata = {
    title: '楽曲一覧',
    description: 'ざるごの配信楽曲一覧です。',
    openGraph: {
        title: '楽曲一覧',
        description: 'ざるごの配信楽曲一覧です。',
        url: `${siteUrl}/discography`,
        siteName: 'ざるご Official Website',
        images: [defaultOgImage],
    },
    twitter: {
        title: '楽曲一覧',
        description: 'ざるごの配信楽曲一覧です。',
        images: [defaultOgImage],
    },
};

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;
