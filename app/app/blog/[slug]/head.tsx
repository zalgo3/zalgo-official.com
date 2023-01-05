import DefaultTags from "app/DefaultTags";

const Head = () => {
    return (
        <>
            <DefaultTags />
            <title>ざるご / 田辺広樹</title>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
                integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
                crossOrigin="anonymous"
                // @ts-ignore
                precedence="default"
            />
        </>
        );
};

export default Head;
