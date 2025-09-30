import Link from 'next/link';
import styles from 'styles/app/Breadcrumbs.module.css';

type BreadcrumbItem = {
    label: string;
    href: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav aria-label="breadcrumb" className={styles.container}>
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