'use client';

import Link from 'next/link';
import styles from 'styles/app/notFound.module.css';

const Error = ({
    reset,
}: {
    error: Error & {digest?: string};
    reset: () => void;
}) => {
    return (
        <main className={styles.main}>
            <h1>エラーが発生しました</h1>
            <p>
                ページの表示中に問題が発生しました。お手数ですが、再試行するかホームにお戻りください。
            </p>
            <div className={styles.links}>
                <button type="button" onClick={reset} className={styles.button}>
                    再試行
                </button>
                <Link href="/" className={styles.link}>
                    ホームに戻る
                </Link>
            </div>
        </main>
    );
};

export default Error;
