import Image from 'next/image';
import Link from 'next/link';
import {FaBlog, FaYoutube} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

import styles from 'styles/app/social-links.module.css';

const SocialLinks = () => {
    return (
        <div className={styles.socialIcons}>
            <a
                href="https://www.youtube.com/channel/UC7z2KWNBuF8PQPUxd-rE0pQ?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaYoutube color="#FF0000" size={32} />
                <span>YouTube</span>
            </a>
            <a
                href="https://www.nicovideo.jp/user/1473771"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/icons/niconico.png"
                    alt="NicoNico"
                    width={40}
                    height={40}
                    style={{marginBottom: 0}}
                />
                <span style={{marginTop: 0}}>ニコ動</span>
            </a>
            <a
                href="https://twitter.com/zalgo3"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaXTwitter color="#000000" size={32} />
                <span>X</span>
            </a>
            <Link href="/blog">
                <FaBlog color="#1E3050" size={32} />
                <span>ブログ</span>
            </Link>
        </div>
    );
};

export default SocialLinks;
