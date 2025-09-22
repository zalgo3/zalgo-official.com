import {
    FaApple,
    FaFacebook,
    FaInstagram,
    FaLine,
    FaSpotify,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';
import {SiAmazonmusic} from 'react-icons/si';
import styles from 'styles/ui/DiscographyLinks.module.css';

type DiscographyLinksProps = {
    links: {
        appleMusic?: string;
        spotify?: string;
        youtubeMusic?: string;
        amazonMusic?: string;
        lineMusic?: string;
        awa?: string;
        tiktok?: string;
        instagram?: string;
        facebook?: string;
    };
};

const DiscographyLinks = ({links}: DiscographyLinksProps) => {
    return (
        <div className={styles.container}>
            {links.appleMusic && (
                <a
                    href={links.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{backgroundColor: '#000'}}
                >
                    <FaApple />
                </a>
            )}
            {links.spotify && (
                <a
                    href={links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{backgroundColor: '#1DB954'}}
                >
                    <FaSpotify />
                </a>
            )}
            {links.youtubeMusic && (
                <a
                    href={links.youtubeMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{backgroundColor: '#FF0000'}}
                >
                    <FaYoutube />
                </a>
            )}
            {links.amazonMusic && (
                <a
                    href={links.amazonMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{backgroundColor: '#00A8E1'}}
                >
                    <SiAmazonmusic />
                </a>
            )}
            {links.lineMusic && (
                <a
                    href={links.lineMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{backgroundColor: '#00c300'}}
                >
                    <FaLine />
                </a>
            )}
            {links.tiktok && (
                <a
                    href={links.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{backgroundColor: '#000'}}
                >
                    <FaTiktok />
                </a>
            )}
            {links.instagram && (
                <a
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{
                        background:
                            'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                    }}
                >
                    <FaInstagram />
                </a>
            )}
            {links.facebook && (
                <a
                    href={links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    style={{backgroundColor: '#1877F2'}}
                >
                    <FaFacebook />
                </a>
            )}
        </div>
    );
};

export default DiscographyLinks;
