"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export const DisplayPost = ({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) => {
  return <MDXRemote {...source} />;
};
