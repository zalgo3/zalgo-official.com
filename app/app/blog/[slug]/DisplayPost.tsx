"use client"

import { MDXRemote } from "next-mdx-remote"

export const DisplayPost = ({ source }) => {
    return <MDXRemote {...source} />
}
