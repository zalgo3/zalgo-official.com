export const truncateTitle = (title: string) => {
    const maxLength = 52;
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    } else {
        return title;
    }
};

// Build a plain-text meta description from MDX post content. Heuristically
// strips code, MDX/HTML tags, links, images and markdown syntax so each post
// gets a unique description instead of inheriting the generic site one.
export const excerpt = (markdown: string, maxLength = 120): string => {
    const text = markdown
        .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
        .replace(/`[^`]*`/g, ' ') // inline code
        .replace(/<[^>]*>/g, ' ') // MDX/HTML tags
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
        .replace(/\$+[^$]*\$+/g, ' ') // math
        .replace(/[#>*_~`|-]/g, ' ') // markdown symbols
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
};
