import {type PostData} from 'lib/posts';
import Link from 'next/link';
import styles from 'styles/app/blog/card.module.css';

const Card = ({post}: {post: PostData}) => {
    return (
        <article className={styles.card}>
            <Link href={`/blog/${post.slug}`} key={post.slug}>
                <h2>{post.title}</h2>
                <footer>{post.createdAt}</footer>
            </Link>
        </article>
    );
};

export default Card;
