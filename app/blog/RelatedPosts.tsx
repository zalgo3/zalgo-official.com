import {type PostData} from 'lib/posts';
import styles from 'styles/app/blog/relatedPosts.module.css';

import Card from './card';

const RelatedPosts = ({posts}: {posts: PostData[]}) => {
    if (posts.length === 0) {
        return null;
    }
    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>関連記事</h2>
            <div className={styles.list}>
                {posts.map(post => (
                    <Card key={post.slug} post={post} />
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;
