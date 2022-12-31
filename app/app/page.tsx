'use client';

import Footer from './footer';
import Header from './header';
import Link from 'next/link';
import {Button} from '@fluentui/react-components';

const Page = () => {
    return (
        <>
            <Header />
            <Button>
                <Link href="/blog">ブログ</Link>
            </Button>
            <Footer />
        </>
    );
};

export default Page;
