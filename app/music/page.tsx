import {getMusicDataAll} from 'lib/musics';
import styles from 'styles/app/music/page.module.css';

import DisplayMusics from './DisplayMusics';

const Page = async () => {
    const musics = await getMusicDataAll();
    return (
        <div className={styles.listContainer}>
            <h1 className={styles.title} style={{textAlign: 'center'}}>
                配信楽曲一覧
            </h1>
            <DisplayMusics musics={musics} />
        </div>
    );
};

export default Page;
