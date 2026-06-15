'use client';

import {useEffect} from 'react';

import {googleAdsId} from '../lib/googleAds';

const retryIntervalMs = 100;
const maxRetryCount = 50;

const GoogleAds = () => {
    useEffect(() => {
        const googleTagWindow = window as typeof window & {
            dataLayer?: unknown[];
            gtag?: (...args: unknown[]) => void;
        };
        let retryCount = 0;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const configureGoogleAds = () => {
            if (typeof googleTagWindow.gtag === 'function') {
                googleTagWindow.gtag('config', googleAdsId);
                return;
            }

            if (retryCount < maxRetryCount) {
                retryCount += 1;
                timeoutId = setTimeout(configureGoogleAds, retryIntervalMs);
                return;
            }

            googleTagWindow.dataLayer = googleTagWindow.dataLayer ?? [];
            googleTagWindow.dataLayer.push(['config', googleAdsId]);
        };

        configureGoogleAds();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    return null;
};

export default GoogleAds;
