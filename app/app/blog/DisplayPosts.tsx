'use client';

import { type PostData } from 'lib/posts';
import Card from './card';
import styles from 'styles/app/blog/DisplayPosts.module.css';

const DisplayPosts = ({ posts }: { posts: PostData[] }) => {
    return (
        <div className={styles.container}>
            {posts.map((post: PostData) => (
                <Card post={post} />
            ))}
        </div>
    );
};

export default DisplayPosts;
