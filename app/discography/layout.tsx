import type {Metadata} from 'next';

import Header from '../header';

export const metadata: Metadata = {
    title: '楽曲一覧',
    description: 'ざるごの配信楽曲一覧です。',
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
