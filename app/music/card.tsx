import Image from 'next/image';
import Link from 'next/link';

import {type MusicData} from 'lib/musics';
import styles from 'styles/app/music/card.module.css';

const Card = ({music}: {music: MusicData}) => {
    return (
        <article className={styles.card}>
            <Link
                href={`/music/${music.slug}`}
                key={music.slug}
                className={styles.link}
            >
                {music.thumbnailUrl && (
                    <Image
                        src={music.thumbnailUrl}
                        alt={`${music.title}のサムネイル`}
                        width={280}
                        height={280}
                        className={styles.thumbnail}
                    />
                )}
                <h2 className={styles.title}>{music.title}</h2>
            </Link>
        </article>
    );
};

export default Card;
