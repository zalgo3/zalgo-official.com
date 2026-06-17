import {getPostAll, getPost} from 'lib/posts';
import {truncateTitle} from 'lib/string';
import {ImageResponse} from 'next/og';

export const size = {width: 1200, height: 630};
export const contentType = 'image/png';
export const alt = 'ざるご Official Website のブログ記事';

export const generateStaticParams = async () => {
    const posts = await getPostAll();
    return posts.map(post => ({slug: post.data.slug}));
};

// Fetch only the glyphs used in this image as a Noto Sans JP subset. This old
// macOS Safari User-Agent makes Google Fonts return a TTF; satori cannot parse
// the woff2 that modern User-Agents receive. Retried a few times so a transient
// build-time network hiccup doesn't fail the whole build.
const FONT_USER_AGENT =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_0) AppleWebKit/533.4 (KHTML, like Gecko) Version/4.1 Safari/533.4';

const loadFont = async (text: string): Promise<ArrayBuffer> => {
    let lastError: unknown;
    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            const api = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`;
            const css = await fetch(api, {
                headers: {'User-Agent': FONT_USER_AGENT},
            }).then(response => response.text());
            const fontUrl =
                /src:\s*url\((https:[^)]+)\)\s*format\('truetype'\)/.exec(
                    css
                )?.[1];
            if (!fontUrl) {
                throw new Error('Noto Sans JP truetype subset not found');
            }
            return await fetch(fontUrl).then(response =>
                response.arrayBuffer()
            );
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError instanceof Error
        ? lastError
        : new Error('Failed to load font');
};

const Image = async ({
    params,
}: {
    params: Promise<{slug: string}>;
}): Promise<ImageResponse> => {
    const {slug} = await params;
    const {data} = await getPost(slug);
    const title = truncateTitle(data.title);
    const siteName = 'ざるご Official Website';

    const fontData = await loadFont(`${title}ブログ${siteName}`);

    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '80px',
                backgroundColor: '#ebf2fa',
                fontFamily: 'NotoSansJP',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    fontSize: 40,
                    fontWeight: 700,
                    color: '#00aa90',
                }}
            >
                ブログ
            </div>
            <div
                style={{
                    display: 'flex',
                    fontSize: 64,
                    fontWeight: 700,
                    color: '#3b3d3f',
                    lineHeight: 1.3,
                }}
            >
                {title}
            </div>
            <div
                style={{
                    display: 'flex',
                    fontSize: 36,
                    color: '#3b3d3f',
                }}
            >
                {siteName}
            </div>
        </div>,
        {
            ...size,
            fonts: [
                {
                    name: 'NotoSansJP',
                    data: fontData,
                    weight: 700,
                    style: 'normal',
                },
            ],
        }
    );
};

export default Image;
