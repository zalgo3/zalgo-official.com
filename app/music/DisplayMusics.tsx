'use client';

import {type MusicData} from 'lib/musics';
import styles from 'styles/app/music/DisplayMusics.module.css';

import Card from './card';

const DisplayMusics = ({musics}: {musics: MusicData[]}) => {
    return (
        <div className={styles.container}>
            {musics.map((music: MusicData) => (
                <Card key={music.slug} music={music} />
            ))}
        </div>
    );
};

export default DisplayMusics;
