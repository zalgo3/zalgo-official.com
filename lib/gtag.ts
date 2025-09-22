declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Window {
        gtag: (
            event: 'event',
            action: string,
            params: {
                event_category: string;
                event_label: string;
                value?: number;
            }
        ) => void;
    }
}

type GtagEvent = {
    action: string;
    category: string;
    label: string;
    value?: number;
};

export const event = ({action, category, label, value}: GtagEvent): void => {
    if (typeof window.gtag === 'undefined') {
        console.warn(
            'window.gtag is not defined. Google Analytics may not be initialized.'
        );
        return;
    }

    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
