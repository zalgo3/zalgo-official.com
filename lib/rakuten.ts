import retry from 'async-retry';
import fetch from 'node-fetch';

const RATE_LIMIT_INTERVAL_MS = 1000; // QPS=1
let lastRequestTime = 0;
let requestQueue: Promise<void> = Promise.resolve();

const waitForRateLimit = (): Promise<void> => {
    requestQueue = requestQueue.then(
        () =>
            new Promise<void>(resolve => {
                const now = Date.now();
                const elapsed = now - lastRequestTime;
                const waitTime = Math.max(
                    0,
                    RATE_LIMIT_INTERVAL_MS - elapsed
                );
                setTimeout(() => {
                    lastRequestTime = Date.now();
                    resolve();
                }, waitTime);
            })
    );
    return requestQueue;
};

type RakutenProductSearchResponse = {
    Products: {
        Product: {
            productId: string;
            productName: string;
            brandName: string;
            productUrlPC: string;
            mediumImageUrl: string;
            affiliateUrl?: string;
        };
    }[];
};

export type RakutenProduct = {
    productId: string;
    productName: string;
    affiliateUrl: string;
    imageUrl: string;
};

export const getRakutenProduct = async (
    query: string,
    JAN?: string
): Promise<RakutenProduct | null> => {
    if (
        process.env.RAKUTEN_API_APPLICATION_ID == null ||
        process.env.RAKUTEN_API_ACCESS_KEY == null ||
        process.env.RAKUTEN_AFFILIATE_ID == null
    ) {
        console.error(
            'RAKUTEN_API_APPLICATION_ID, RAKUTEN_API_ACCESS_KEY, or RAKUTEN_AFFILIATE_ID is not set'
        );
        return null;
    }

    const params: Record<string, string> = {
        applicationId: process.env.RAKUTEN_API_APPLICATION_ID,
        accessKey: process.env.RAKUTEN_API_ACCESS_KEY,
        affiliateId: process.env.RAKUTEN_AFFILIATE_ID,
        keyword: query,
        hits: '1',
    };
    if (JAN != null) {
        params.productCode = JAN;
    }
    const urlSearchParams = new URLSearchParams(params).toString();
    const endpoint = `https://openapi.rakuten.co.jp/ichibaproduct/api/Product/Search/20250801?${urlSearchParams}`;

    try {
        const item = await retry(async bail => {
            await waitForRateLimit();
            const response = await fetch(endpoint, {
                headers: {
                    Origin: 'https://zalgo-official.com',
                    Referer: 'https://zalgo-official.com/',
                },
            });

            if (response.status === 400) {
                const text = await response.text();
                bail(new Error(`Rakuten API 400: ${text}`));
                return;
            }
            if (response.status === 403) {
                const text = await response.text();
                bail(new Error(`Rakuten API 403 (Forbidden): ${text}`));
                return;
            }
            if (response.status === 404) {
                bail(new Error(`Not found: ${endpoint}`));
                return;
            }
            if (response.status === 429) {
                throw new Error(`Too many requests: ${endpoint}`);
            }

            if (!response.ok) {
                const text = await response.text();
                bail(
                    new Error(
                        `Rakuten API Error ${response.status.toString()}: ${text}`
                    )
                );
                return;
            }

            const data =
                (await response.json()) as RakutenProductSearchResponse;
            if (data.Products.length === 0) {
                bail(new Error(`No hits: ${endpoint}`));
                return;
            }
            return data.Products[0].Product;
        });

        if (item == null) {
            return null;
        }

        return {
            productId: item.productId,
            productName: item.productName,
            affiliateUrl: item.affiliateUrl ?? item.productUrlPC,
            imageUrl: item.mediumImageUrl,
        };
    } catch (error) {
        console.error('Error fetching Rakuten product:', error);
        return null;
    }
};
