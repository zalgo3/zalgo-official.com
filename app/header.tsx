import Link from 'next/link';
import styles from 'styles/app/header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <Link href="/" className={styles.logoLink}>
                    ざるご Official Website
                </Link>
            </h1>
            <nav className={styles.nav} aria-label="グローバルナビゲーション">
                <Link href="/" className={styles.navLink}>
                    ホーム
                </Link>
                <Link href="/blog" className={styles.navLink}>
                    ブログ
                </Link>
                <Link href="/discography" className={styles.navLink}>
                    楽曲
                </Link>
                <Link href="/about" className={styles.navLink}>
                    プロフィール
                </Link>
            </nav>
        </header>
    );
};

export default Header;
