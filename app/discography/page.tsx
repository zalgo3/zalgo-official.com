import {getDiscographyDataAll} from 'lib/discography';
import styles from 'styles/app/discography/page.module.css';
import ShareButtons from 'ui/share-buttons';

import Breadcrumbs from '../Breadcrumbs';
import DisplayDiscography from './DisplayDiscography';

const Page = async () => {
    const items = await getDiscographyDataAll();
    const url = 'https://zalgo-official.com/discography';
    const title = '配信楽曲一覧';
    const authorAccount = 'zalgo3';
    const breadcrumbs = [{label: '楽曲一覧', href: '/discography'}];
    return (
        <div className={styles.listContainer}>
            <Breadcrumbs items={breadcrumbs} />
            <h1 className={styles.title} style={{textAlign: 'center'}}>
                配信楽曲一覧
            </h1>
            <DisplayDiscography items={items} />
            <ShareButtons
                url={url}
                title={title}
                authorAccount={authorAccount}
            />
        </div>
    );
};

export default Page;
