import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { InertiaLinkProps } from '@inertiajs/react';
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
            <div className="mx-auto w-full max-w-7xl px-4 py-8">
                <nav aria-label="Footer Navigation">
                    <ul className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                        {items.map((item) => (
                            <li key={item.title}>
                                <Link href={item.href} className="hover:underline">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <p className="mt-4 text-xs text-neutral-500">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
