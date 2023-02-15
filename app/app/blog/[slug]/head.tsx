const Head = () => {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
                integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                // @ts-expect-error
                precedence="default"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-nord.min.css"
                integrity="sha512-/1nWQ0aAin0IGM5zDndLyY+6xUSiqA1ILh4Mm0XjSqqj4cXOH36rB/2Ep96sT4FOxvNEnUxyPNwqPlEmuImAFw=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                // @ts-expect-error
                precedence="default"
            />
        </>
    );
};

export default Head;
