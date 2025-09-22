'use client';

import {type DiscographyData} from 'lib/discography';
import styles from 'styles/app/discography/DisplayDiscography.module.css';

import Card from './card';

const DisplayDiscography = ({items}: {items: DiscographyData[]}) => {
    return (
        <div className={styles.container}>
            {items.map((item: DiscographyData) => (
                <Card key={item.slug} item={item} />
            ))}
        </div>
    );
};

export default DisplayDiscography;
