import type {Metadata} from 'next';
import styles from 'styles/app/blog/page.module.css';

export const metadata: Metadata = {
    title: 'プライバシーポリシー',
    description: '当サイトのプライバシーポリシーです。',
};

const PrivacyPolicyPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>プライバシーポリシー</h1>

            <section>
                <h2>1. Cookie（クッキー）について</h2>
                <p>
                    当サイトでは、一部のコンテンツについてCookieを利用しています。Cookieとは、サイトにアクセスした際にブラウザに保存される情報ですが、お名前やメールアドレス等の個人情報は含まれません。
                </p>
            </section>

            <section>
                <h2>2. アクセス解析ツールについて</h2>
                <p>
                    当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
                    <a
                        href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google アナリティクス利用規約
                    </a>
                    をご覧ください。
                </p>
            </section>

            <section>
                <h2>3. 広告の配信について</h2>
                <p>
                    当サイトは、第三者配信の広告サービス「Googleアドセンス」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを無効にする設定およびGoogleアドセンスに関する詳細は
                    <a
                        href="https://policies.google.com/technologies/ads?hl=ja"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        広告 – ポリシーと規約 – Google
                    </a>
                    をご覧ください。
                </p>
            </section>

            <section>
                <h2>4. アフィリエイトプログラムについて</h2>
                <p>
                    当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
                </p>
                <p>
                    また、当サイトでは、楽天アフィリエイト、バリューコマースのアフィリエイトプログラムを利用しています。これらのプログラムにより、第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したり、これを認識したりする場合があります。
                </p>
            </section>

            <section>
                <h2>5. 免責事項</h2>
                <p>
                    当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                </p>
            </section>

            <section>
                <h2>6. 著作権について</h2>
                <p>
                    当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、ご連絡ください。迅速に対応いたします。
                </p>
            </section>

            <section>
                <h2>7. プライバシーポリシーの変更について</h2>
                <p>
                    当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
