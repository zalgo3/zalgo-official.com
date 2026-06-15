import {FaFacebook, FaLine} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';
import {SiHatenabookmark} from 'react-icons/si';
import styles from 'styles/ui/share-buttons.module.css';

const ShareButtons = ({
    url,
    authorAccount,
    title,
    siteTitle,
}: {
    url: string;
    authorAccount: string;
    title: string;
    siteTitle?: string;
}) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = siteTitle
        ? encodeURIComponent(`${title} | ${siteTitle}`)
        : encodeURIComponent(title);

    return (
        <div className={styles.container}>
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&via=${authorAccount}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="Xでシェア"
            >
                <FaXTwitter color="#000000" />
            </a>
            <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="LINEでシェア"
            >
                <FaLine color="#00c300" />
            </a>
            <a
                href={`https://b.hatena.ne.jp/add?mode=confirm&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="はてなブックマークに追加"
            >
                <SiHatenabookmark color="#00a4de" />
            </a>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="Facebookでシェア"
            >
                <FaFacebook color="#1877f2" />
            </a>
        </div>
    );
};

export default ShareButtons;
