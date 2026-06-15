import styles from 'styles/ui/apiCredit.module.css';

// API credit required by the Rakuten Web Service and Yahoo! JAPAN developer
// terms. Render at the bottom of pages that display data from those APIs.
const ApiCredit = () => (
    <div className={styles.credits}>
        <a
            href="https://developers.rakuten.com/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Supported by Rakuten Developers
        </a>
        <a
            href="https://developer.yahoo.co.jp/sitemap/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Webサービス by Yahoo! JAPAN
        </a>
    </div>
);

export default ApiCredit;
