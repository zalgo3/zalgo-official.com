import Script from 'next/script';

const DefaultTags = () => {
    return (
        <>
            <meta name="robots" content="noindex" />
            <Script
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3520947091484443"
            />
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-KVTMLPFHK5"
            />
        </>
    );
};

export default DefaultTags;
