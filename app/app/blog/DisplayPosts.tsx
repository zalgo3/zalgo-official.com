'use client';

import {type PostData} from 'lib/posts';
import Link from 'next/link';

const DisplayPosts = ({posts}: {posts: PostData[]}) => {
    return (
        <>
            {posts.map((post: PostData) => (
                    <Link href={`/blog/${post.slug}`}>
                            {post.title}
                            {post.createdAt}
                    </Link>
            ))}
        </>
    );
};

export default DisplayPosts;
