import {format} from 'date-fns';
import Link from 'next/link';
import styles from 'styles/app/footer.module.css';

const Footer = () => {
    const now = format(new Date(), 'yyyy');
    const years = now === '2018' ? now : `2018 - ${now}`;
    return (
        <footer>
            <nav className={styles.navFooter}>
                <ul>
                    <li>
                        <Link href="/">ホーム</Link>
                    </li>
                    <li>
                        <Link href="/blog">ブログ</Link>
                    </li>
                    <li>
                        <Link href="/privacy-policy">プライバシーポリシー</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.copyright}>© {years} Hiroki Tanabe</div>
        </footer>
    );
};

export default Footer;
