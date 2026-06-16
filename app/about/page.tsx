import {defaultOgImage, siteUrl} from 'lib/siteMetadata';
import type {Metadata} from 'next';
import Link from 'next/link';
import styles from 'styles/app/about.module.css';

import Breadcrumbs from '../Breadcrumbs';
import Header from '../header';

export const metadata: Metadata = {
    title: 'プロフィール',
    description:
        '歌い手 / ゲーム実況者 / データサイエンティスト「ざるご」のプロフィール。',
    openGraph: {
        title: 'プロフィール',
        description:
            '歌い手 / ゲーム実況者 / データサイエンティスト「ざるご」のプロフィール。',
        url: `${siteUrl}/about`,
        siteName: 'ざるご Official Website',
        images: [defaultOgImage],
    },
    twitter: {
        title: 'プロフィール',
        description:
            '歌い手 / ゲーム実況者 / データサイエンティスト「ざるご」のプロフィール。',
        images: [defaultOgImage],
    },
};

// TODO: 以下の本文はすべて下書きです。経歴・実績・人物像はご本人の言葉に
// 合わせて編集してください。
const AboutPage = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Breadcrumbs
                    items={[{label: 'プロフィール', href: '/about'}]}
                />
                <h1 className={styles.title}>プロフィール</h1>
                <p className={styles.lead}>
                    ざるごです。歌い手・ゲーム実況者として動画を投稿しつつ、データサイエンティストとしても活動しています。歌・ゲーム・技術と、一見ばらばらに見える領域を横断しながら、面白いと思ったことを形にして発信しています。
                </p>

                <section className={styles.section}>
                    <h2>歌い手</h2>
                    <p>
                        YouTube・ニコニコ動画を中心に「歌ってみた」を投稿しています。配信中の楽曲は楽曲ページからご覧いただけます。
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>ゲーム実況者</h2>
                    <p>
                        ゲーム実況動画を投稿しています。攻略情報やプレイの様子をお届けしています。
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>データサイエンティスト</h2>
                    <p>
                        データサイエンス・機械学習・数理最適化などに取り組んでいます。技術的な内容はブログでも発信しています。
                    </p>
                </section>

                <div className={styles.links}>
                    <Link href="/discography" className={styles.link}>
                        楽曲を聴く
                    </Link>
                    <Link href="/blog" className={styles.link}>
                        ブログを読む
                    </Link>
                    <a
                        href="https://www.youtube.com/c/zalgo33?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        YouTube
                    </a>
                    <a
                        href="https://twitter.com/zalgo3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        X (@zalgo3)
                    </a>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
