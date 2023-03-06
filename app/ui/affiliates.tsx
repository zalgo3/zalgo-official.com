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
    };
};

const getAmazonItem = async (asin: string): Promise<AmazonItem> => {
    const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
    defaultClient.accessKey = process.env.AMAZON_PA_API_ACCESS_KEY_ID;
    defaultClient.secretKey = process.env.AMAZON_PA_API_SECRET_KEY;
    defaultClient.host = 'webservices.amazon.co.jp';
    defaultClient.region = 'us-west-2';
    const api = new ProductAdvertisingAPIv1.DefaultApi();
    const getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();
    getItemsRequest.ItemIds = [asin];
    getItemsRequest.PartnerTag = process.env.AMAZON_ASSOCIATE_PARTNER_TAG;
    getItemsRequest.PartnerType = 'Associates';
    getItemsRequest.Resources = [
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'Offers.Listings.Price',
    ];
    const response = await api.getItems(getItemsRequest);
    const amazonItem = response.ItemsResult.Items[0];
    return {
        DetailPageURL: amazonItem.DetailPageURL,
        Images: amazonItem.Images,
        ItemInfo: amazonItem.ItemInfo,
    };
};

const getRakutenUrl = async (rakutenItemCode: string): Promise<string> => {
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
    return (await response.json()).Items[0].Item.affiliateUrl;
};

const getYahooUrl = async (keyword: string): Promise<string> => {
    const params = {
        token: process.env.VALUECOMMERCE_API_TOKEN as string,
        keyword: keyword,
        ec_code: '0hzmc',
        format: 'json',
    };
    const urlSearchParams = new URLSearchParams(params).toString();
    const response = await fetch(
        `http://webservice.valuecommerce.ne.jp/productdb/search?${urlSearchParams}`
    );
    return (await response.json()).link;
};

const Affiliates = async ({
    asin,
    rakutenItemCode,
    keyword,
}: {
    asin: string;
    rakutenItemCode: string;
    keyword: string;
}) => {
    const defaultAmazonUrl = 'https://amzn.to/3ybBse7';
    const defaultRakutenUrl = 'https://a.r10.to/huBEC7';
    const defaultYahooUrl =
        'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3667930&pid=888917603';
    try {
        const amazonItem = await getAmazonItem(asin);
        const amazonItemUrl = amazonItem.DetailPageURL;
        const amazonItemImage = amazonItem.Images.Primary.Medium.URL;
        const amazonItemTitle = amazonItem.ItemInfo.Title.DisplayValue;
        const rakutenUrl = await getRakutenUrl(rakutenItemCode);
        const yahooUrl = await getYahooUrl(keyword);
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
                            Yahoo!ショッピング
                        </Link>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className={styles.card}>
                <p>商品情報を取得できませんでした。</p>
                <div className={styles.buttonGroup}>
                    <Link
                        href={defaultAmazonUrl}
                        className={`${styles.button} ${styles.amazonButton}`}
                    >
                        Amazon
                    </Link>
                    <Link
                        href={defaultRakutenUrl}
                        className={`${styles.button} ${styles.rakutenButton}`}
                    >
                        楽天
                    </Link>
                    <Link
                        href={defaultYahooUrl}
                        className={`${styles.button} ${styles.yahooButton}`}
                    >
                        Yahoo!ショッピング
                    </Link>
                </div>
            </div>
        );
    }
};

export default Affiliates;
