import type {Metadata} from 'next';
import Link from 'next/link';
import styles from 'styles/app/notFound.module.css';

import Header from './header';

export const metadata: Metadata = {
    title: 'ページが見つかりません',
};

const NotFound = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <h1>404 - ページが見つかりません</h1>
                <p>
                    お探しのページは存在しないか、移動・削除された可能性があります。
                </p>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>
                        ホームに戻る
                    </Link>
                    <Link href="/blog" className={styles.link}>
                        ブログ一覧へ
                    </Link>
                </div>
            </main>
        </>
    );
};

export default NotFound;
