import type {MetadataRoute} from 'next';

const manifest = (): MetadataRoute.Manifest => ({
    name: 'ざるご Official Website',
    short_name: 'ざるご',
    description:
        '歌い手/ゲーム実況者/データサイエンティストであるざるごのオフィシャルウェブサイト',
    start_url: '/',
    display: 'standalone',
    background_color: '#ebf2fa',
    theme_color: '#00aa90',
    icons: [
        {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
        },
        {
            src: '/favicons/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
        },
    ],
});

export default manifest;
