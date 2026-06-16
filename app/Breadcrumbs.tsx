import {siteUrl} from 'lib/siteMetadata';
import Link from 'next/link';
import styles from 'styles/app/Breadcrumbs.module.css';

type BreadcrumbItem = {
    label: string;
    href: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

const Breadcrumbs = ({items}: BreadcrumbsProps) => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {'@type': 'ListItem', position: 1, name: 'ホーム', item: siteUrl},
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: `${siteUrl}${item.href}`,
            })),
        ],
    };
    return (
        <nav aria-label="breadcrumb" className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <ol className={styles.list}>
                <li className={styles.listItem}>
                    <Link href="/">ホーム</Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                        {index < items.length - 1 ? (
                            <Link href={item.href}>{item.label}</Link>
                        ) : (
                            <span aria-current="page">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
