import Link from 'next/link';
import styles from 'styles/app/header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <Link href="/" className={styles.logoLink}>
                    ざるご / 田辺広樹
                </Link>
            </h1>
        </header>
    );
};

export default Header;
