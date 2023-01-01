import Link from 'next/link';
import styles from 'styles/app/blog/header.module.css';

const Header = () => {
    return (
        <header>
            <h1 className={styles.logo}>
                <Link href="/" className={styles.logoLink}>
                    ざるご のブログ
                </Link>
            </h1>
        </header>
    );
};

export default Header;
