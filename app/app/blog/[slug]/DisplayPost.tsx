'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

const DisplayPost = ({ source }: { source: MDXRemoteSerializeResult }) => {
  return <MDXRemote {...source} />;
};

export default DisplayPost;
