import retry from 'async-retry';
import fetch from 'node-fetch';

const RATE_LIMIT_INTERVAL_MS = 100; // QPS=10
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

type YahooApiResponse = {
    hits: {
        url: string;
    }[];
};

export const getYahooUrl = async (
    query: string,
    JAN?: string
): Promise<string | null> => {
    const appid = process.env.YAHOO_API_APP_ID;
    const sid = process.env.VALUE_COMMERCE_SID;
    const pid = process.env.VALUE_COMMERCE_PID;

    if (!appid || !sid || !pid) {
        console.error(
            'YAHOO_API_APP_ID, VALUE_COMMERCE_SID, or VALUE_COMMERCE_PID is not set'
        );
        return null;
    }

    const trimmedJAN = JAN?.trim();
    const trimmedQuery = query.trim();

    try {
        if (trimmedJAN) {
            const params = {
                appid,
                affiliate_type: 'vc',
                affiliate_id: `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=`,
                jan_code: trimmedJAN,
                results: '1',
            };
            const urlSearchParams = new URLSearchParams(params).toString();
            const endpoint = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${urlSearchParams}`;
            const itemUrl = await retry(async bail => {
                await waitForRateLimit();
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
                const hits = ((await response.json()) as YahooApiResponse).hits;
                if (hits.length === 0) {
                    bail(new Error(`No hits: ${endpoint}.`));
                    return;
                }
                return hits[0].url;
            });
            if (itemUrl != null) {
                return itemUrl;
            }
        }

        if (!trimmedQuery) {
            return null;
        }

        const params = {
            appid,
            affiliate_type: 'vc',
            affiliate_id: `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=`,
            query: trimmedQuery,
            results: '1',
        };
        const urlSearchParams = new URLSearchParams(params).toString();
        const endpoint = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${urlSearchParams}`;
        const itemUrl = await retry(async bail => {
            await waitForRateLimit();
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
            const hits = ((await response.json()) as YahooApiResponse).hits;
            if (hits.length === 0) {
                bail(new Error(`No hits: ${endpoint}.`));
                return;
            }
            return hits[0].url;
        });
        return itemUrl ?? null;
    } catch (error) {
        console.error('Error fetching Yahoo URL:', error);
        return null;
    }
};
