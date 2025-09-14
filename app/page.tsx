import Image from 'next/image';
import Link from 'next/link';
import {FaLinkedin, FaYoutube} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

import styles from 'styles/app/Home.module.css';
import ShareButtons from 'ui/share-buttons';

import Header from './header';
import SocialLinks from './social-links';

const Page = () => {
    const url = 'https://zalgo-official.com';
    const title = 'ざるご Official Website';
    const authorAccount = 'zalgo3';
    return (
        <>
            <Header />
            <SocialLinks />
            <main className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2>YouTube</h2>
                        <p>ゲーム実況や歌ってみた動画を投稿しています。</p>
                        <a
                            href="https://www.youtube.com/c/zalgo33?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            <FaYoutube color="#FF0000" /> YouTube
                        </a>
                    </div>

                    <div className={styles.card}>
                        <h2>ニコニコ動画</h2>
                        <p>
                            YouTubeと同じく、ゲーム実況や歌ってみた動画を投稿しています。
                        </p>
                        <a
                            href="https://www.nicovideo.jp/user/1473771"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            ニコニコ動画
                        </a>
                    </div>

                    <div className={styles.card}>
                        <h2>X（旧Twitter）</h2>
                        <p>日常や技術や動画に関することをつぶやいています。</p>
                        <a
                            href="https://twitter.com/zalgo3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            <FaXTwitter color="#000000" /> @zalgo3
                        </a>
                        <a
                            href="https://twitter.com/zalgo_video"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            <FaXTwitter color="#000000" /> @zalgo_video (動画用)
                        </a>
                    </div>

                    <div className={styles.card}>
                        <h2>ブログ</h2>
                        <p>140文字では書ききれないことを書いています。</p>
                        <Link href="/blog" className={styles.link}>
                            ざるごのブログ
                        </Link>
                    </div>

                    <div className={styles.card}>
                        <h2>経歴</h2>
                        <p>LinkedInのプロフィールをご覧ください。</p>
                        <a
                            href="https://www.linkedin.com/in/hiroki-tanabe/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            <FaLinkedin color="#0077B5" /> LinkedIn
                        </a>
                    </div>

                    <div className={styles.card}>
                        <h2>オリジナルグッズ販売中</h2>
                        <div className={styles.suzuriProducts}>
                            <div className={styles.suzuriProduct}>
                                <a href="https://suzuri.jp/zalgo/15079349/acrylic-keychain/50x50mm/clear">
                                    <Image
                                        src="/images/acrylic-keychain.png"
                                        alt="アクリルキーホルダー"
                                        width={150}
                                        height={150}
                                    />
                                </a>
                                <a
                                    href="https://suzuri.jp/zalgo/15079349/acrylic-keychain/50x50mm/clear"
                                    className={styles.link}
                                >
                                    アクリルキーホルダー
                                </a>
                            </div>
                            <div className={styles.suzuriProduct}>
                                <a href="https://suzuri.jp/zalgo/15079384/can-badge/75mm/white">
                                    <Image
                                        src="/images/can-badge.png"
                                        alt="缶バッジ"
                                        width={150}
                                        height={150}
                                    />
                                </a>
                                <a
                                    href="https://suzuri.jp/zalgo/15079384/can-badge/75mm/white"
                                    className={styles.link}
                                >
                                    缶バッジ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <ShareButtons
                    url={url}
                    title={title}
                    authorAccount={authorAccount}
                />
            </main>
        </>
    );
};

export default Page;
