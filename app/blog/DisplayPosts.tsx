'use client';

import {CATEGORIES} from 'lib/postCategories';
import {type PostData} from 'lib/posts';
import {useState} from 'react';
import styles from 'styles/app/blog/DisplayPosts.module.css';

import Card from './card';

const DisplayPosts = ({posts}: {posts: PostData[]}) => {
    const [active, setActive] = useState<string | null>(null);
    const presentCategories = CATEGORIES.filter(category =>
        posts.some(post => post.category === category)
    );
    const shownPosts = active
        ? posts.filter(post => post.category === active)
        : posts;

    return (
        <>
            <div className={styles.filters}>
                <button
                    type="button"
                    onClick={() => {
                        setActive(null);
                    }}
                    className={`${styles.filter} ${active === null ? styles.activeFilter : ''}`}
                >
                    すべて
                </button>
                {presentCategories.map(category => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => {
                            setActive(category);
                        }}
                        className={`${styles.filter} ${active === category ? styles.activeFilter : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className={styles.container}>
                {shownPosts.map((post: PostData) => (
                    <Card key={post.slug} post={post} />
                ))}
            </div>
        </>
    );
};

export default DisplayPosts;
