import {type PostData} from 'lib/posts';
import Link from 'next/link';
import styles from 'styles/app/blog/card.module.css';
import moment from 'moment';
import {useEffect, useState} from 'react';

const Card = ({post}: {post: PostData}) => {
    const [createdAt, setCreatedAt] = useState(''); // 状態変数を作る
    const [updatedAt, setUpdatedAt] = useState(''); // 状態変数を作る
    useEffect(() => {
        // クライアント側でのみ実行される
        setCreatedAt(moment.unix(post.createdAt).format('YYYY年MM月DD日')); // 状態変数を更新する
        setUpdatedAt(moment.unix(post.updatedAt).format('YYYY年MM月DD日')); // 状態変数を更新する
    }, []); // 空の配列を渡して、最初のレンダリング時にのみ実行されるようにする
    return (
        <article className={styles.card}>
            <Link href={`/blog/${post.slug}`} key={post.slug}>
                <h2>{post.title}</h2>
                <footer>
                    {createdAt} (最終更新: {updatedAt})
                </footer>
            </Link>
        </article>
    );
};

export default Card;
