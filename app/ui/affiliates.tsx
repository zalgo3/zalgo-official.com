import ProductAdvertisingAPIv1 from 'paapi5-nodejs-sdk';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/ui/affiliates.module.css';
import {truncateTitle} from 'lib/string';

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
    getItemsRequest.PartnerTag = 'zalgo-22';
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

const Affiliates = async ({
    asin,
    rakuten,
    yahoo,
}: {
    asin: string;
    rakuten?: string;
    yahoo?: string;
}) => {
    try {
        const amazonItem = await getAmazonItem(asin);
        const amazonItemURL = amazonItem.DetailPageURL;
        const amazonItemImage = amazonItem.Images.Primary.Medium.URL;
        const amazonItemTitle = amazonItem.ItemInfo.Title.DisplayValue;
        return (
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <Link href={amazonItemURL}>
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
                    <Link href={amazonItemURL}>
                        <h2 className={styles.title}>
                            {truncateTitle(amazonItemTitle)}
                        </h2>
                        <div className={styles.buttonGroup}>
                            <button
                                className={`${styles.button} ${styles.amazonButton}`}
                                type="button"
                            >
                                Amazon
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className={styles.card}>
                <p>商品情報を取得できませんでした。</p>
                <Link href="https://amzn.to/3ybBse7">
                    Amazon で商品を探す。
                </Link>
            </div>
        );
    }
};

export default Affiliates;
