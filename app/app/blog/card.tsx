import { type PostData } from 'lib/posts';
import Link from 'next/link';
import styles from 'styles/app/blog/card.module.css';
import { format } from 'date-fns';

const Card = ({ post }: { post: PostData }) => {
    return (
        <article className={styles.card}>
            <Link href={`/blog/${post.slug}`} key={post.slug}>
                <h2>{post.title}</h2>
                <footer>
                    {format(post.createdAt * 1000, 'yyyy年MM月dd日')} (最終更新: {format(post.updatedAt * 1000, 'yyyy年MM月dd日')})
                </footer>
            </Link>
        </article>
    );
};

export default Card;
