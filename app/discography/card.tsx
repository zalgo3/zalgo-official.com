import Image from 'next/image';
import Link from 'next/link';

import {type DiscographyData} from 'lib/discography';
import styles from 'styles/app/discography/card.module.css';

const Card = ({item}: {item: DiscographyData}) => {
    return (
        <article className={styles.card}>
            <Link
                href={`/discography/${item.slug}`}
                key={item.slug}
                className={styles.link}
            >
                {item.thumbnailUrl && (
                    <Image
                        src={item.thumbnailUrl}
                        alt={`${item.title}のサムネイル`}
                        width={280}
                        height={280}
                        className={styles.thumbnail}
                    />
                )}
                <h2 className={styles.title}>{item.title}</h2>
            </Link>
        </article>
    );
};

export default Card;
