import Footer from './footer';
import Header from './header';
import styles from 'styles/app/Home.module.css';
import Link from 'next/link';

const Page = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.description}>
                    <p>京都大学博士 (情報学)/歌い手/ゲーム実況者/RTAランナー</p>
                    <p>
                        ハンドルネームはざるご、本名は田辺広樹 (Hiroki Tanabe)
                    </p>
                    <p>
                        「数理最適化」の研究を行う傍ら、
                        <br />
                        YouTube、ニコニコ動画への動画投稿を行い、総再生回数は500万回超
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2>略歴</h2>
                        <p>
                            2014年4月、京都大学工学部情報学科に首席で入学し、2018年3月同学科を首席で卒業。同年4月、京都大学大学院情報学研究科数理工学専攻に進学。研究業績優秀のため、通常修業年限の2年に比べて半年の期間短縮が認められ、2019年9月に修士課程を首席で早期修了。同年10月に同博士後期課程に進学後は、日本学術振興会特別研究員(DC1)としても研究活動を行い、2022年9月、博士
                            (情報学)の学位を取得。2022年10月、ヤフー株式会社に入社。データサイエンティストとして、Web広告のCVR予測業務を担当。
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h2>詳しい経歴</h2>
                        <p>LinkedInのプロフィールをご覧ください。</p>
                        <a
                            href="https://www.linkedin.com/in/hiroki-tanabe/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            LinkedIn
                        </a>
                    </div>

                    <div className={styles.card}>
                        <h2>YouTube (ゲーム実況・RTA)</h2>
                        <p>
                            マリオオデッセイ・マリオ64などの3Dアクションゲームを中心に、RTA（最速クリア）や、やり込みをテーマとしたゲーム実況動画を投稿しています。
                        </p>
                        <Link
                            href="https://www.youtube.com/c/zalgo33?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            YouTube (ゲーム実況・RTA)
                        </Link>
                    </div>

                    <div className={styles.card}>
                        <h2>YouTube (歌ってみた)</h2>
                        <p>
                            ボカロやアニソンなどの曲を歌ってみた動画を投稿しています。
                        </p>
                        <a
                            href="https://www.youtube.com/c/zalgosing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            YouTube (歌ってみた)
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
                        <h2>Twitter</h2>
                        <p>日常や研究や動画に関することをつぶやいています。</p>
                        <a
                            href="https://twitter.com/zalgo3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            Twitter
                        </a>
                        <a
                            href="https://twitter.com/zalgo_video"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            Twitter (動画用)
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Page;
