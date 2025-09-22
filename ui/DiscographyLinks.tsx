import {
    FaApple,
    FaFacebook,
    FaInstagram,
    FaLine,
    FaSpotify,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';
import {SiAmazon, SiAmazonmusic} from 'react-icons/si';
import styles from 'styles/ui/DiscographyLinks.module.css';

import {type DiscographyData} from '../lib/discography';

type DiscographyLinksProps = {
    links: DiscographyData['links'];
};

const streamingServices = [
    {
        key: 'appleMusic',
        name: 'Apple Music',
        icon: <FaApple />,
        color: '#000',
    },
    {key: 'spotify', name: 'Spotify', icon: <FaSpotify />, color: '#1DB954'},
    {
        key: 'youtubeMusic',
        name: 'YouTube Music',
        icon: <FaYoutube />,
        color: '#FF0000',
    },
    {
        key: 'amazonMusic',
        name: 'Amazon Music',
        icon: <SiAmazonmusic />,
        color: '#00A8E1',
    },
    {
        key: 'lineMusic',
        name: 'LINE MUSIC',
        icon: <FaLine />,
        color: '#00c300',
    },
    {key: 'awa', name: 'AWA', color: '#000'},
    {key: 'recochoku', name: 'レコチョク', color: '#ff4a01'},
];

const downloadServices = [
    {
        key: 'itunesStore',
        name: 'iTunes Store',
        icon: <FaApple />,
        color: '#ea4cc0',
    },
    {
        key: 'amazonDigitalMusic',
        name: 'Amazon Music',
        icon: <SiAmazon />,
        color: '#252f3d',
    },
    {key: 'dwango', name: 'ドワンゴジェイピー', color: '#f05b00'},
    {key: 'animelo', name: 'animelo mix', color: '#6a155f'},
];

const socialLinks = [
    {key: 'tiktok', name: 'TikTok', icon: <FaTiktok />, color: '#000'},
    {
        key: 'instagram',
        name: 'Instagram',
        icon: <FaInstagram />,
        gradient:
            'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    },
    {
        key: 'facebook',
        name: 'Facebook',
        icon: <FaFacebook />,
        color: '#1877F2',
    },
];

const DiscographyLinks = ({links}: DiscographyLinksProps) => {
    const availableStreaming = streamingServices.filter(s => links[s.key]);
    const availableDownloads = downloadServices.filter(s => links[s.key]);
    const availableSocial = socialLinks.filter(s => links[s.key]);

    return (
        <>
            {availableStreaming.length > 0 && (
                <>
                    <h3 className={styles.categoryTitle}>ストリーミング</h3>
                    <div className={styles.container}>
                        {availableStreaming.map(service => (
                            <a
                                key={service.key}
                                href={links[service.key] as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconLink}
                                style={{
                                    backgroundColor: service.color,
                                    background: service.gradient,
                                }}
                            >
                                {service.icon || ''}
                                <span className={styles.serviceName}>
                                    {service.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </>
            )}

            {availableDownloads.length > 0 && (
                <>
                    <h3 className={styles.categoryTitle}>ダウンロード</h3>
                    <div className={styles.container}>
                        {availableDownloads.map(service => (
                            <a
                                key={service.key}
                                href={links[service.key] as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconLink}
                                style={{
                                    backgroundColor: service.color,
                                    background: service.gradient,
                                }}
                            >
                                {service.icon || ''}
                                <span className={styles.serviceName}>
                                    {service.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </>
            )}

            {availableSocial.length > 0 && (
                <>
                    <h3 className={styles.categoryTitle}>SNS</h3>
                    <div className={styles.container}>
                        {availableSocial.map(service => (
                            <a
                                key={service.key}
                                href={links[service.key] as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconLink}
                                style={{
                                    backgroundColor: service.color,
                                    background: service.gradient,
                                }}
                            >
                                {service.icon || ''}
                                <span className={styles.serviceName}>
                                    {service.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default DiscographyLinks;
