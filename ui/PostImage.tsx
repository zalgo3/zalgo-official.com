import Image from 'next/image';

type PostImageProps = {
    src?: string;
    alt?: string;
    title?: string;
    width?: number | string;
    height?: number | string;
};

const toNumber = (value: number | string | undefined): number | undefined => {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number.parseInt(value, 10);
        return Number.isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
};

// MDX `img` renderer. Local images come with intrinsic width/height injected by
// remarkImagesToFullPaths, so they render through next/image (optimized,
// responsive, no layout shift). Remote or unmeasured images fall back to a
// plain responsive <img>.
const PostImage = ({src, alt, title, width, height}: PostImageProps) => {
    const w = toNumber(width);
    const h = toNumber(height);

    if (!src || !w || !h) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt={alt ?? ''}
                title={title}
                style={{maxWidth: '100%', height: 'auto'}}
            />
        );
    }

    return (
        <Image
            src={src}
            alt={alt ?? ''}
            title={title}
            width={w}
            height={h}
            sizes="(max-width: 768px) 100vw, 768px"
            style={{maxWidth: '100%', height: 'auto'}}
        />
    );
};

export default PostImage;
