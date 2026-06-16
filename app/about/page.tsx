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

// TODO: 経歴・実績など追記したい事実があれば、下の facts に項目を足してください。
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
                    本業はデータサイエンティストです。歌い手・ゲーム実況者としても活動しています。
                </p>

                <dl className={styles.facts}>
                    <dt>活動名</dt>
                    <dd>ざるご</dd>
                    <dt>本業</dt>
                    <dd>データサイエンティスト</dd>
                    <dt>分野</dt>
                    <dd>データサイエンス・機械学習・数理最適化</dd>
                    <dt>創作活動</dt>
                    <dd>歌ってみた / ゲーム実況</dd>
                </dl>

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
