'use client';

import { type PostData } from 'lib/posts';
import { useStyles } from 'lib/styles';
import { Link } from '@fluentui/react-components';
import { Card, CardHeader } from '@fluentui/react-components/unstable';

const DisplayPosts = ({ posts }: { posts: PostData[] }) => {
  const styles = useStyles();
  return (
    <>
      {posts.map((post: PostData) => (
        <Card className={styles.card}>
          <Link href={`/blog/${post.slug}`}>
            <CardHeader header={post.title} description={post.createdAt} />
          </Link>
        </Card>
      ))}
    </>
  );
};

export default DisplayPosts;
