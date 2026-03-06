import type { InertiaLinkProps } from '@inertiajs/react';
import { home, gallery, faqs, quote } from '@/routes';

export type FrontendNavLinks = {
    home?: NonNullable<InertiaLinkProps['href']>;
    trellisGates?: NonNullable<InertiaLinkProps['href']>;
    gallery?: NonNullable<InertiaLinkProps['href']>;
    faqs?: NonNullable<InertiaLinkProps['href']>;
    quote?: NonNullable<InertiaLinkProps['href']>;
};

export function useFrontendRoutes(links?: FrontendNavLinks) {
    // Prefer Wayfinder route functions' .url() outputs; fall back to provided links or string paths.
    const safe = <T extends string>(val: unknown, fallback: T): T => {
        return typeof val === 'string' && val.length > 0 ? (val as T) : fallback;
    };

    return {
        home: links?.home ?? safe(home.url?.() ?? '/', '/'),
        trellisGates: links?.trellisGates ?? '/trellis-gates',
        gallery: links?.gallery ?? safe(gallery.url?.() ?? '/gallery', '/gallery'),
        faqs: links?.faqs ?? safe(faqs.url?.() ?? '/faqs', '/faqs'),
        quote: links?.quote ?? safe(quote.url?.() ?? '/quote', '/quote'),
    } as const;
}
