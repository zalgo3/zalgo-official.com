import styles from 'styles/app/footer.module.css';
import Link from 'next/link';
import moment from 'moment';

const Footer = () => {
    const now = moment().format('YYYY');
    const years = now === '2018' ? now : `2018 - ${now}`;
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link href="/">ホーム</Link>
                    </li>
                    <li>
                        <Link href="/blog">ブログ</Link>
                    </li>
                    <li>
                        <Link href="#">SNS</Link>
                        <ul>
                            <li>
                                <Link href="https://www.youtube.com/@zalgosing?sub_confirmation=1">
                                    YouTube (歌ってみた)
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.youtube.com/@zalgogame?sub_confirmation=1">
                                    YouTube (ゲーム実況)
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.nicovideo.jp/user/1473771/">
                                    ニコニコ動画
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.twitter.com/zalgo3">
                                    Twitter (@zalgo3)
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.twitter.com/zalgo_video">
                                    Twitter (@zalgo_video)
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.linkedin.com/in/hiroki-tanabe/">
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className={styles.copyright}>© {years} Hiroki Tanabe</div>
        </>
    );
};

export default Footer;
