import {format as formatTZ, utcToZonedTime} from 'date-fns-tz';
import {type PostData} from 'lib/posts';
import {truncateTitle} from 'lib/string';
import Link from 'next/link';
import styles from 'styles/app/blog/card.module.css';

const Card = ({post}: {post: PostData}) => {
    return (
        <article className={styles.card}>
            <Link href={`/blog/${post.slug}`} key={post.slug}>
                <h2>{truncateTitle(post.title)}</h2>
                <footer>
                    {formatTZ(
                        utcToZonedTime(post.createdAt * 1000, 'Asia/Tokyo'),
                        'yyyy年MM月dd日'
                    )}{' '}
                    (最終更新:{' '}
                    {formatTZ(
                        utcToZonedTime(post.updatedAt * 1000, 'Asia/Tokyo'),
                        'yyyy年MM月dd日'
                    )}
                    )
                </footer>
            </Link>
        </article>
    );
};

export default Card;
