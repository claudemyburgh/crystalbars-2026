import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import Wrapper from '@/components/frontend/wrapper';
import { useFrontendRoutes  } from '@/hooks/use-frontend-routes';
import type {FrontendNavLinks} from '@/hooks/use-frontend-routes';

export type FrontendFooterLinks = FrontendNavLinks;

export default function FrontendFooterNav({ links }: { links?: FrontendFooterLinks }) {
    const hrefs = useFrontendRoutes(links);

    const items: { title: string; href: NonNullable<InertiaLinkProps['href']> }[] = [
        { title: 'Home', href: hrefs.home },
        { title: 'Trellis Gates', href: hrefs.trellisGates },
        { title: 'Gallery', href: hrefs.gallery },
        { title: "FAQ's", href: hrefs.faqs },
        { title: 'Quote', href: hrefs.quote },
    ];

    return (
        <footer className="border-t border-sidebar-border/70 bg-background/80">
            <Wrapper className="py-8">
                <nav aria-label="Footer Navigation">
                    <ul className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                        {items.map((item) => (
                            <li key={item.title}>
                                <Link prefetch={'hover'} href={item.href} className="hover:underline">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                    <p>©2013–{new Date().getFullYear()} Crystal Bars. All rights reserved.</p>
                    <p>
                        Designed &amp; Developed by{' '}
                        <a
                            href="https://designbycode.co.za"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline"
                        >
                            DesignByCode
                        </a>
                    </p>
                </div>
            </Wrapper>
        </footer>
    );
}
