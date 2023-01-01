'use client';

import {type PostData} from 'lib/posts';
import Link from 'next/link';
import Card from './card';

const DisplayPosts = ({posts}: {posts: PostData[]}) => {
    return (
        <>
            {posts.map((post: PostData) => (
                <Card post={post} />
            ))}
        </>
    );
};

export default DisplayPosts;
