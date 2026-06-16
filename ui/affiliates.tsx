import {getAmazonUrl} from 'lib/amazon';
import {getRakutenProduct} from 'lib/rakuten';
import {truncateTitle} from 'lib/string';
import {getYahooUrl} from 'lib/yahoo';
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/ui/affiliates.module.css';

const Affiliates = async ({
    query,
    asin,
    JAN,
}: {
    query: string;
    asin?: string;
    JAN?: string;
}) => {
    const [rakutenProduct, yahooUrl] = await Promise.all([
        getRakutenProduct(query, JAN),
        getYahooUrl(query, JAN),
    ]);
    const amazonUrl = getAmazonUrl(asin);
    return (
        <div className={styles.card}>
            {rakutenProduct && (
                <>
                    {rakutenProduct.imageUrl && (
                        <div className={styles.imageContainer}>
                            <Image
                                src={rakutenProduct.imageUrl}
                                alt={rakutenProduct.productName}
                                width={200}
                                height={200}
                                style={{
                                    borderRadius: '10px',
                                    width: '85%',
                                    height: 'auto',
                                    boxShadow: 'var(--box-shadow-background)',
                                }}
                            />
                        </div>
                    )}
                    <span className={styles.title}>
                        {truncateTitle(rakutenProduct.productName)}
                    </span>
                </>
            )}
            <div className={styles.buttonGroup}>
                {amazonUrl && (
                    <Link
                        href={amazonUrl}
                        className={`${styles.button} ${styles.amazonButton}`}
                    >
                        Amazon
                    </Link>
                )}
                {rakutenProduct && (
                    <Link
                        href={rakutenProduct.affiliateUrl}
                        className={`${styles.button} ${styles.rakutenButton}`}
                    >
                        楽天
                    </Link>
                )}
                {yahooUrl && (
                    <Link
                        href={yahooUrl}
                        className={`${styles.button} ${styles.yahooButton}`}
                    >
                        Yahoo!
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Affiliates;
