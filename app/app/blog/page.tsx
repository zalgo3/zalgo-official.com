'use client';

import DisplayPosts from './DisplayPosts';
import Header from './header';
import Footer from 'app/footer';
import React, {useState, useEffect} from 'react';

const Page = () => {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/posts?limit=${limit}`);
            if (res.ok) {
                const {posts: newPosts} = await res.json();
                setPosts([...posts, ...newPosts]);
            } else {
                throw new Error(
                    `Request failed with status code ${res.status}`
                );
            }
        })();
    }, [limit]);

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setLimit(limit + 10);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header />
            <DisplayPosts posts={posts} />
            <Footer />
        </>
    );
};

export default Page;
