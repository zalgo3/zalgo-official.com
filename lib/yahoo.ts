import retry from 'async-retry';
import {unstable_cache} from 'next/cache';

const RATE_LIMIT_INTERVAL_MS = 100; // QPS=10
// Affiliate links rarely change, so cache fetch results in Next.js' Data Cache
// (persisted under .next/cache and restored in CI) to avoid re-hitting the API
// on every build.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7; // 1 week
// Abort a stuck request instead of letting it block static generation for up to
// `staticPageGenerationTimeout`, which would balloon build time.
const FETCH_TIMEOUT_MS = 10_000;
// Thrown for "there is genuinely no item for this query" (no hits / 404). Such a
// result is safe to cache; any other failure (rate limit, timeout, network,
// 4xx/5xx) is transient and must NOT be cached as a null miss.
class PermanentError extends Error {}
let lastRequestTime = 0;
let requestQueue: Promise<void> = Promise.resolve();

const waitForRateLimit = (): Promise<void> => {
    requestQueue = requestQueue.then(
        () =>
            new Promise<void>(resolve => {
                const now = Date.now();
                const elapsed = now - lastRequestTime;
                const waitTime = Math.max(0, RATE_LIMIT_INTERVAL_MS - elapsed);
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

const fetchYahooUrl = async (
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
            const itemUrl = await retry(
                async bail => {
                    await waitForRateLimit();
                    const response = await fetch(endpoint, {
                        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
                    });
                    if (response.status === 400) {
                        bail(new Error(`Parameter is not valid: ${endpoint}`));
                        return;
                    }
                    if (response.status == 404) {
                        bail(new PermanentError(`Not found: ${endpoint}.`));
                        return;
                    }
                    if (response.status === 429) {
                        throw new Error(`Too many requests: ${endpoint}`);
                    }
                    const hits = ((await response.json()) as YahooApiResponse)
                        .hits;
                    if (hits.length === 0) {
                        bail(new PermanentError(`No hits: ${endpoint}.`));
                        return;
                    }
                    return hits[0].url;
                },
                {retries: 3, minTimeout: 500}
            );
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
        const itemUrl = await retry(
            async bail => {
                await waitForRateLimit();
                const response = await fetch(endpoint, {
                    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
                });
                if (response.status === 400) {
                    bail(new Error(`Parameter is not valid: ${endpoint}`));
                    return;
                }
                if (response.status == 404) {
                    bail(new PermanentError(`Not found: ${endpoint}.`));
                    return;
                }
                if (response.status === 429) {
                    throw new Error(`Too many requests: ${endpoint}`);
                }
                const hits = ((await response.json()) as YahooApiResponse).hits;
                if (hits.length === 0) {
                    bail(new PermanentError(`No hits: ${endpoint}.`));
                    return;
                }
                return hits[0].url;
            },
            {retries: 3, minTimeout: 500}
        );
        return itemUrl ?? null;
    } catch (error) {
        // A genuine "no item" result is cacheable; rethrow anything else so the
        // transient failure is not persisted as a null miss.
        if (error instanceof PermanentError) {
            return null;
        }
        throw error;
    }
};

// Cache the whole lookup (not just the fetch) so warm builds skip the rate-limit
// queue and network entirely on a cache hit. The result is persisted in Next.js'
// Data Cache under .next/cache, which CI restores across builds. Only resolved
// values are cached, so transient failures (thrown above) are retried next build.
export const getYahooUrl = async (
    query: string,
    JAN?: string
): Promise<string | null> => {
    try {
        return await unstable_cache(
            () => fetchYahooUrl(query, JAN),
            ['yahoo-url', query, JAN ?? ''],
            {revalidate: REVALIDATE_SECONDS}
        )();
    } catch (error) {
        console.error('Error fetching Yahoo URL:', error);
        return null;
    }
};
