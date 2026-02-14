import { getAmazonUrl } from 'lib/amazon';
import { getRakutenProduct } from 'lib/rakuten';
import { truncateTitle } from 'lib/string';
import { getYahooUrl } from 'lib/yahoo';
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
    const rakutenProduct = await getRakutenProduct(query, JAN);
    const yahooUrl = await getYahooUrl(query, JAN);
    const amazonUrl = getAmazonUrl(asin);
    const cardUrl =
        amazonUrl ??
        (rakutenProduct ? rakutenProduct.affiliateUrl : null) ??
        yahooUrl ??
        '#';
    return (
        <div className={styles.card}>
            {rakutenProduct && (
                <>
                    <Link className={styles.imageContainer} href={cardUrl}>
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
                    </Link>
                    <Link className={styles.title} href={cardUrl}>
                        {truncateTitle(rakutenProduct.productName)}
                    </Link>
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
