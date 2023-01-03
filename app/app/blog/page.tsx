import DisplayPosts from './DisplayPosts';
import Header from './header';
import Footer from 'app/footer';
import React, {useState, useEffect} from 'react';
import {getPostDataAll} from 'lib/posts';

const Page = async () => {
    const posts = await getData();
    return (
        <>
            <Header />
            <DisplayPosts posts={posts} />
            <Footer />
        </>
    );
};

const getData = async () => {
    return await getPostDataAll();
};

export default Page;
