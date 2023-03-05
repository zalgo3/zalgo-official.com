export const truncateTitle = (title: string) => {
    const maxLength = 52;
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    } else {
        return title;
    }
};
