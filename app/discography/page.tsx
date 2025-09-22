import {getDiscographyDataAll} from 'lib/discography';
import styles from 'styles/app/discography/page.module.css';

import DisplayDiscography from './DisplayDiscography';

const Page = async () => {
    const items = await getDiscographyDataAll();
    return (
        <div className={styles.listContainer}>
            <h1 className={styles.title} style={{textAlign: 'center'}}>
                配信楽曲一覧
            </h1>
            <DisplayDiscography items={items} />
        </div>
    );
};

export default Page;
