'use client';

import {type PostData} from 'lib/posts';
import styles from 'styles/app/blog/DisplayPosts.module.css';

import Card from './card';

const DisplayPosts = ({posts}: {posts: PostData[]}) => {
    return (
        <div className={styles.container}>
            {posts.map((post: PostData) => (
                <Card key={post.slug} post={post} />
            ))}
        </div>
    );
};

export default DisplayPosts;
