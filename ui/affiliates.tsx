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
): Promise<RakutenItem> => {
    if (itemCode != null) {
        const params = {
            applicationId: process.env.RAKUTEN_API_APPLICATION_ID as string,
            affiliateId: process.env.RAKUTEN_AFFILIATE_ID as string,
            itemCode: itemCode,
            hits: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const item = await retry(
            async bail => {
                const response = await fetch(
                    `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${urlSearchParams}`
                );
                if (response.status === 400) {
                    bail(
                        new Error(
                            `Rakuten API error: Parameter ${urlSearchParams} is not valid.`
                        )
                    );
                    return;
                }
                if (response.status == 404) {
                    bail(
                        new Error(
                            `Rakuten API error: Item not found for the parameter ${urlSearchParams}.`
                        )
                    );
                    return;
                }
                if (response.status === 429) {
                    throw new Error('Rakuten API error: Too many requests.');
                }
                return ((await response.json()) as any).Items[0].Item;
            },
            {
                onRetry: error => {
                    console.warn(
                        `Rakuten API warning: ${urlSearchParams} has raised ${error}. Retry fetching.`
                    );
                },
            }
        );
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
    const item = await retry(
        async bail => {
            const response = await fetch(
                `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${urlSearchParams}`
            );
            if (response.status === 400) {
                bail(
                    new Error(
                        `Rakuten API error: Parameter ${urlSearchParams} is not valid.`
                    )
                );
                return;
            }
            if (response.status == 404) {
                bail(
                    new Error(
                        `Rakuten API error: Item not found for the parameter ${urlSearchParams}.`
                    )
                );
                return;
            }
            if (response.status === 429) {
                throw new Error('Rakuten API error: Too many requests.');
            }
            return ((await response.json()) as any).Items[0].Item;
        },
        {
            onRetry: error => {
                console.warn(
                    `Rakuten API warning: ${urlSearchParams} has raised ${error}. Retry fetching.`
                );
            },
        }
    );
    return {
        affiliateUrl: item.affiliateUrl,
        itemName: item.itemName,
        imageUrl: item.mediumImageUrls[0].imageUrl,
    };
};

const getYahooUrl = async (query: string): Promise<string> => {
    const params = {
        appid: process.env.YAHOO_API_APP_ID as string,
        affiliate_type: 'vc',
        affiliate_id: `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${process.env.VALUE_COMMERCE_SID}&pid=${process.env.VALUE_COMMERCE_PID}&vc_url=`,
        query: query,
        results: '1',
    };
    const urlSearchParams = new URLSearchParams(params).toString();
    const itemUrl = await retry(
        async bail => {
            const response = await fetch(
                `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${urlSearchParams}`
            );
            if (response.status === 400) {
                bail(
                    new Error(
                        `Yahoo API error: Parameter ${urlSearchParams} is not valid.`
                    )
                );
                return;
            }
            if (response.status == 404) {
                bail(
                    new Error(
                        `Yahoo API error: Item not found for the parameter ${urlSearchParams}.`
                    )
                );
                return;
            }
            if (response.status === 429) {
                throw new Error('Yahoo API error: Too many requests.');
            }
            return ((await response.json()) as any).hits[0].url;
        },
        {
            onRetry: error => {
                console.warn(
                    `Yahoo API warning: ${urlSearchParams} has raised ${error}. Retry fetching.`
                );
            },
        }
    );
    return itemUrl;
};

const Affiliates = async ({
    query,
    asin,
    rakutenItemCode,
}: {
    query: string;
    asin?: string;
    rakutenItemCode?: string;
}) => {
    const rakutenItem = await getRakutenItem(query, rakutenItemCode);
    const rakutenUrl = rakutenItem.affiliateUrl;
    const rakutenItemName = rakutenItem.itemName;
    const rakutenImageUrl = rakutenItem.imageUrl;
    const yahooUrl = await getYahooUrl(query);
    if (asin != null) {
        const amazonUrl = `https://www.amazon.co.jp/dp/${asin}/?ref=nosim?tag=${process.env.AMAZON_ASSOCIATE_PARTNER_TAG}`;
        return (
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <Link href={amazonUrl}>
                        <Image
                            src={rakutenImageUrl}
                            alt={rakutenItemName}
                            width={200}
                            height={200}
                            sizes="80vw"
                            style={{
                                borderRadius: '10px',
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </Link>
                </div>
                <div className={styles.contentContainer}>
                    <Link href={amazonUrl}>
                        <h2 className={styles.title}>
                            {truncateTitle(rakutenItemName)}
                        </h2>
                    </Link>
                    <div className={styles.buttonGroup}>
                        <Link
                            href={amazonUrl}
                            className={`${styles.button} ${styles.amazonButton}`}
                        >
                            Amazon
                        </Link>
                        <Link
                            href={rakutenUrl}
                            className={`${styles.button} ${styles.rakutenButton}`}
                        >
                            楽天
                        </Link>
                        <Link
                            href={yahooUrl}
                            className={`${styles.button} ${styles.yahooButton}`}
                        >
                            Yahoo!
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link href={rakutenUrl}>
                    <Image
                        src={rakutenImageUrl}
                        alt={rakutenItemName}
                        width={200}
                        height={200}
                        sizes="80vw"
                        style={{
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </Link>
            </div>
            <div className={styles.contentContainer}>
                <Link href={rakutenUrl}>
                    <h2 className={styles.title}>
                        {truncateTitle(rakutenItemName)}
                    </h2>
                </Link>
                <div className={styles.buttonGroup}>
                    <Link
                        href={rakutenUrl}
                        className={`${styles.button} ${styles.rakutenButton}`}
                    >
                        楽天
                    </Link>
                    <Link
                        href={yahooUrl}
                        className={`${styles.button} ${styles.yahooButton}`}
                    >
                        Yahoo!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Affiliates;
