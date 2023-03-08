import retry from 'async-retry';
import fetch from 'node-fetch';
import {truncateTitle} from 'lib/string';
import Image from 'next/image';
import Link from 'next/link';
import ProductAdvertisingAPIv1 from 'paapi5-nodejs-sdk';
import styles from 'styles/ui/affiliates.module.css';

type AmazonItem = {
    DetailPageURL: string;
    Images: {
        Primary: {
            Medium: {
                URL: string;
            };
        };
    };
    ItemInfo: {
        Title: {
            DisplayValue: string;
        };
        ExternalIds?: {
            EANs: {
                DisplayValues: string[];
                Label: string;
                Locale: string;
            };
            ISBNs: {
                DisplayValues: string[];
                Label: string;
                Locale: string;
            };
            UPCs: {
                DisplayValues: string[];
                Label: string;
                Locale: string;
            };
        };
    };
};

const getAmazonItem = async (
    query: string,
    asin?: string
): Promise<AmazonItem> => {
    const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
    defaultClient.accessKey = process.env.AMAZON_PA_API_ACCESS_KEY_ID;
    defaultClient.secretKey = process.env.AMAZON_PA_API_SECRET_KEY;
    defaultClient.host = 'webservices.amazon.co.jp';
    defaultClient.region = 'us-west-2';
    const api = new ProductAdvertisingAPIv1.DefaultApi();
    const request =
        asin != null
            ? new ProductAdvertisingAPIv1.GetItemsRequest()
            : new ProductAdvertisingAPIv1.SearchItemsRequest();
    if (asin) {
        request.ItemIds = [asin];
    } else {
        request.Keywords = query;
        request.ItemCount = 1;
    }
    request.PartnerTag = process.env.AMAZON_ASSOCIATE_PARTNER_TAG;
    request.PartnerType = 'Associates';
    request.Resources = [
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'ItemInfo.ExternalIds',
        'Offers.Listings.Price',
    ];
    const response =
        asin != null
            ? await api.getItems(request)
            : await api.searchItems(request);
    const item =
        asin != null
            ? response.ItemsResult.Items[0]
            : response.SearchResult.Items[0];
    return {
        DetailPageURL: item.DetailPageURL,
        Images: item.Images,
        ItemInfo: item.ItemInfo,
    };
};

const getRakutenUrl = async (
    query: string,
    rakutenItemCode?: string
): Promise<string> => {
    if (rakutenItemCode != null) {
        const params = {
            applicationId: process.env.RAKUTEN_API_APPLICATION_ID as string,
            affiliateId: process.env.RAKUTEN_AFFILIATE_ID as string,
            itemCode: rakutenItemCode,
            hits: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const response = await fetch(
            `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${urlSearchParams}`
        );
        return ((await response.json()) as any).Items[0].Item.affiliateUrl;
    } else {
        const params = {
            applicationId: process.env.RAKUTEN_API_APPLICATION_ID as string,
            affiliateId: process.env.RAKUTEN_AFFILIATE_ID as string,
            keyword: query,
            hits: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const response = await fetch(
            `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${urlSearchParams}`
        );
        return ((await response.json()) as any).Items[0].Item.affiliateUrl;
    }
};

const getYahooUrl = async (query: string, JAN?: string): Promise<string> => {
    if (JAN != null) {
        const params = {
            appid: process.env.YAHOO_API_APP_ID as string,
            affiliate_type: 'vc',
            affiliate_id:
                'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3667930&pid=888917603&vc_url=',
            jan_code: JAN,
            results: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const response = await fetch(
            `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${urlSearchParams}`
        );
        return ((await response.json()) as any).hits[0].url;
    } else {
        const params = {
            appid: process.env.YAHOO_API_APP_ID as string,
            affiliate_type: 'vc',
            affiliate_id:
                'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3667930&pid=888917603&vc_url=',
            query: query,
            results: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const response = await fetch(
            `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${urlSearchParams}`
        );
        return ((await response.json()) as any).hits[0].url;
    }
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
    const amazonItem = await retry(async () => {
        return await getAmazonItem(query, asin);
    });
    const amazonItemUrl = amazonItem.DetailPageURL;
    const amazonItemImage = amazonItem.Images.Primary.Medium.URL;
    const amazonItemInfo = amazonItem.ItemInfo;
    const amazonItemTitle = amazonItemInfo.Title.DisplayValue;
    const rakutenUrl = await retry(async () => {
        return await getRakutenUrl(query, rakutenItemCode);
    });
    const JAN =
        amazonItemInfo.ExternalIds != null
            ? amazonItemInfo.ExternalIds.EANs.DisplayValues[0]
            : undefined;
    const yahooUrl = await retry(async () => {
        return await getYahooUrl(query, JAN);
    });
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link href={amazonItemUrl}>
                    <Image
                        src={amazonItemImage}
                        alt={amazonItemTitle}
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
                <Link href={amazonItemUrl}>
                    <h2 className={styles.title}>
                        {truncateTitle(amazonItemTitle)}
                    </h2>
                </Link>
                <div className={styles.buttonGroup}>
                    <Link
                        href={amazonItemUrl}
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
};

export default Affiliates;
