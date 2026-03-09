import type { PropsWithChildren } from 'react';
import OwnerCTA from '@/components/frontend/owner-cta';
import { Toaster } from '@/components/ui/sonner';
import type { FrontendNavLinks } from '@/hooks/use-frontend-routes';
import FrontendFooterNav from '@/layouts/frontend/footer-nav';
import FrontendNoticeBar from '@/layouts/frontend/notice-bar';
import FrontendTopNav from '@/layouts/frontend/top-nav';

export type FrontendLayoutProps = PropsWithChildren<{
    links?: FrontendNavLinks;
}>;

export default function FrontendLayout({ children, links }: FrontendLayoutProps) {
    const defaultLinks = {
        trellisGates: '/trellis-gates',
        gallery: '/gallery',
        faqs: '/faqs',
        quote: '/quote',
    } satisfies Partial<FrontendNavLinks>;

    const mergedLinks = { ...defaultLinks, ...links } as FrontendNavLinks | undefined;

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <FrontendNoticeBar />
            <FrontendTopNav links={mergedLinks} />
            <main className="flex-1">{children}</main>
            {/* Owner CTA - Reusable Component */}
            <OwnerCTA />
            <FrontendFooterNav links={mergedLinks} />
            <Toaster position={`top-right`} />
        </div>
    );
}
