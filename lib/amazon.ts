export const getAmazonUrl = (asin?: string): string | null => {
    if (process.env.AMAZON_ASSOCIATE_PARTNER_TAG == null) {
        console.error('AMAZON_ASSOCIATE_PARTNER_TAG is not set');
        return null;
    }
    if (asin == null) {
        return null;
    }
    return `https://www.amazon.co.jp/dp/${asin}?tag=${process.env.AMAZON_ASSOCIATE_PARTNER_TAG}`;
};
