'use client'

import { type PostData } from "lib/posts"
import { useStyles } from "lib/styles"
import { Card, CardHeader } from "@fluentui/react-components/unstable"

export const DisplayPosts = ({ posts }: { posts: PostData[] }) => {
    const styles = useStyles()
    return (
            <>
            {posts.map((post: PostData) => (
                <Card className={styles.card} as="a" href={`/blog/${post.slug}`}>
                    <CardHeader header={post.title} description={post.createdAt} />
                </Card>
                        ))}
            </>
           )
}
