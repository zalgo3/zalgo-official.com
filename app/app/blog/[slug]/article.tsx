'use client';

import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';

const Article = ({source}: {source: MDXRemoteSerializeResult}) => {
    return <MDXRemote {...source} />;
};

export default Article;
