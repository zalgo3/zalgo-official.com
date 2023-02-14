import { type PostData } from 'lib/posts';
import Link from 'next/link';
import styles from 'styles/app/blog/card.module.css';
import { utcToZonedTime, format as formatTZ } from 'date-fns-tz';

const truncateTitle = (title: string) => {
    const maxLength = 52;
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    } else {
        return title;
    }
};

const Card = ({ post }: { post: PostData }) => {
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
