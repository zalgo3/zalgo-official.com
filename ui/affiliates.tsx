import retry from 'async-retry';
import {truncateTitle} from 'lib/string';
import Image from 'next/image';
import Link from 'next/link';
import fetch from 'node-fetch';
import styles from 'styles/ui/affiliates.module.css';

type RakutenItem = {
    affiliateUrl: string;
    itemName: string;
    imageUrl: string;
};

const getRakutenItem = async (
    query: string,
    itemCode?: string
): Promise<RakutenItem | null> => {
    try {
        if (itemCode != null) {
            const params = {
                applicationId: process.env.RAKUTEN_API_APPLICATION_ID as string,
                affiliateId: process.env.RAKUTEN_AFFILIATE_ID as string,
                itemCode: itemCode,
                hits: '1',
            };
            const urlSearchParams = new URLSearchParams(params).toString();
            const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${urlSearchParams}`;
            const item = await retry(async bail => {
                const response = await fetch(endpoint);
                if (response.status === 400) {
                    bail(new Error(`Parameter is not valid: ${endpoint}.`));
                    return;
                }
                if (response.status == 404) {
                    bail(new Error(`Not found: ${endpoint}.`));
                    return;
                }
                if (response.status === 429) {
                    throw new Error(`Too many requests: ${endpoint}`);
                }
                const items = ((await response.json()) as any).Items;
                if (items.length === 0) {
                    console.warn(`No hits: ${endpoint}.`);
                    return;
                }
                return items[0].Item;
            });
            if (item != null) {
                return {
                    affiliateUrl: item.affiliateUrl,
                    itemName: item.itemName,
                    imageUrl: item.mediumImageUrls[0].imageUrl,
                };
            }
        }
        const params = {
            applicationId: process.env.RAKUTEN_API_APPLICATION_ID as string,
            affiliateId: process.env.RAKUTEN_AFFILIATE_ID as string,
            keyword: query,
            hits: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${urlSearchParams}`;
        const item = await retry(async bail => {
            const response = await fetch(endpoint);
            if (response.status === 400) {
                bail(new Error(`Parameter is not valid: ${endpoint}.`));
                return;
            }
            if (response.status == 404) {
                bail(new Error(`Not found: ${endpoint}.`));
                return;
            }
            if (response.status === 429) {
                throw new Error(`Too many requests: ${endpoint}`);
            }
            const items = ((await response.json()) as any).Items;
            if (items.length === 0) {
                bail(new Error(`No hits: ${endpoint}.`));
                return;
            }
            return items[0].Item;
        });
        return {
            affiliateUrl: item.affiliateUrl,
            itemName: item.itemName,
            imageUrl: item.mediumImageUrls[0].imageUrl,
        };
    } catch (error) {
        console.error('Error fetching Rakuten item:', error);
        return null;
    }
};

const getYahooUrl = async (query: string, JAN?: string): Promise<string | null> => {
    try {
        if (JAN != null) {
            const params = {
                appid: process.env.YAHOO_API_APP_ID as string,
                affiliate_type: 'vc',
                affiliate_id: `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${process.env.VALUE_COMMERCE_SID}&pid=${process.env.VALUE_COMMERCE_PID}&vc_url=`,
                jan_code: JAN,
                results: '1',
            };
            const urlSearchParams = new URLSearchParams(params).toString();
            const endpoint = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${urlSearchParams}`;
            const itemUrl = await retry(async bail => {
                const response = await fetch(endpoint);
                if (response.status === 400) {
                    bail(new Error(`Parameter is not valid: ${endpoint}`));
                    return;
                }
                if (response.status == 404) {
                    bail(new Error(`Not found: ${endpoint}.`));
                    return;
                }
                if (response.status === 429) {
                    throw new Error(`Too many requests: ${endpoint}`);
                }
                const hits = ((await response.json()) as any).hits;
                if (hits.length === 0) {
                    console.warn(`No hits: ${endpoint}.`);
                    return;
                }
                return hits[0].url;
            });
            if (itemUrl != null) {
                return itemUrl;
            }
        }
        const params = {
            appid: process.env.YAHOO_API_APP_ID as string,
            affiliate_type: 'vc',
            affiliate_id: `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${process.env.VALUE_COMMERCE_SID}&pid=${process.env.VALUE_COMMERCE_PID}&vc_url=`,
            query: query,
            results: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const endpoint = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${urlSearchParams}`;
        const itemUrl = await retry(async bail => {
            const response = await fetch(endpoint);
            if (response.status === 400) {
                bail(new Error(`Parameter is not valid: ${endpoint}`));
                return;
            }
            if (response.status == 404) {
                bail(new Error(`Not found: ${endpoint}.`));
                return;
            }
            if (response.status === 429) {
                throw new Error(`Too many requests: ${endpoint}`);
            }
            const hits = ((await response.json()) as any).hits;
            if (hits.length === 0) {
                bail(new Error(`No hits: ${endpoint}.`));
                return;
            }
            return hits[0].url;
        });
        return itemUrl;
    } catch (error) {
        console.error('Error fetching Yahoo URL:', error);
        return null;
    }
};

const Affiliates = async ({
    query,
    asin,
    rakutenItemCode,
    JAN,
}: {
    query: string;
    asin?: string;
    rakutenItemCode?: string;
    JAN?: string;
}) => {
    const rakutenItem = await getRakutenItem(query, rakutenItemCode);
    const yahooUrl = await getYahooUrl(query, JAN);
    const amazonUrl = asin
        ? `https://www.amazon.co.jp/dp/${asin}?tag=${process.env.AMAZON_ASSOCIATE_PARTNER_TAG}`
        : null;
    const cardUrl =
        amazonUrl ||
        (rakutenItem ? rakutenItem.affiliateUrl : null) ||
        yahooUrl;
    return (
        <div className={styles.card}>
            {rakutenItem && (
                <>
                    <Link className={styles.imageContainer} href={cardUrl}>
                        <Image
                            src={rakutenItem.imageUrl}
                            alt={rakutenItem.itemName}
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
                        {truncateTitle(rakutenItem.itemName)}
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
                {rakutenItem && (
                    <Link
                        href={rakutenItem.affiliateUrl}
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
