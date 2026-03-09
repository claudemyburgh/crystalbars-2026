import type { InertiaLinkProps} from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import AppLogo from '@/components/frontend/app-logo';
import Wrapper from '@/components/frontend/wrapper';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/ui/theme-toggle';

import { useFrontendRoutes  } from '@/hooks/use-frontend-routes';
import type {FrontendNavLinks} from '@/hooks/use-frontend-routes';
import { cn } from '@/lib/utils';

type Props = {
    links?: FrontendNavLinks;
};

export default function FrontendTopNav({ links }: Props) {
    const hrefs = useFrontendRoutes(links);


    const page = usePage();
    const currentPath = (page.url || '').split('?')[0] || '/';
    const isActive = (href: NonNullable<InertiaLinkProps['href']>) => {
        const target = typeof href === 'string' ? href : String(href);
        const getPath = (t: string) => {
            try {
                const u = new URL(t, window.location.origin);
                return u.pathname;
            } catch {
                return t;
            }
        };
        const normalize = (s: string) => {
            if (!s) return '/';
            return s.endsWith('/') && s !== '/' ? s.slice(0, -1) : s;
        };
        const a = normalize(getPath(currentPath));
        const b = normalize(getPath(target));
        if (b === '/') {
            return a === '/';
        }
        return a === b || a.startsWith(b + '/');
    };

    const items: { title: string; href: NonNullable<InertiaLinkProps['href']> }[] = [
        { title: 'Home', href: hrefs.home },
        { title: 'Trellis Gates', href: hrefs.trellisGates },
        { title: 'Gallery', href: hrefs.gallery },
        { title: "FAQ's", href: hrefs.faqs },
        { title: "Free Quote", href: hrefs.quote },
    ];

    return (
        <div className="sticky top-10 z-50 w-full bg-background/80 drop-shadow-xl drop-shadow-sidebar-border backdrop-blur supports-backdrop-filter:bg-background/60 dark:drop-shadow-black">
            <Wrapper className="flex h-16 items-center justify-between">
                <Link
                    href={hrefs.home}
                    prefetch
                    className="relative flex items-center space-x-2"
                >
                    <AppLogo />
                </Link>

                {/* Mobile hamburger (right) */}
                <div className="ml-auto lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-9"
                            >
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="z-70 flex h-full w-64 flex-col justify-between bg-sidebar"
                        >
                            <SheetHeader className="text-left">
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <div className="py-2">
                                    <Link
                                        href={hrefs.home}
                                        prefetch={'hover'}
                                        className="relative flex items-center space-x-2"
                                    >
                                        <AppLogo />
                                    </Link>
                                </div>
                            </SheetHeader>
                            <nav className="flex-1 p-4 text-sm">
                                <ul className="flex flex-col space-y-4">
                                    {items.map((item) => (
                                        <li key={item.title}>
                                            {item.title === 'Free Quote' ? (
                                                <RainbowButton asChild size="default">
                                                    <Link
                                                        href={item.href}
                                                        prefetch={'hover'}
                                                        aria-current={
                                                            isActive(item.href)
                                                                ? 'page'
                                                                : undefined
                                                        }
                                                        className={cn(
                                                            'inline-flex h-9 w-full items-center rounded-md px-3 py-2 text-sm font-medium justify-center', // Added justify-center for alignment
                                                            isActive(item.href) &&
                                                                'bg-primary/10 text-foreground',
                                                        )}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </RainbowButton>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    prefetch={'hover'}
                                                    aria-current={
                                                        isActive(item.href)
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                    className={cn(
                                                        'inline-flex h-9 w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground',
                                                        isActive(item.href) &&
                                                            'bg-primary/10 text-foreground',
                                                    )}
                                                >
                                                    {item.title}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop */}
                <div className="ml-4 hidden h-full items-center space-x-6 lg:flex">
                    <NavigationMenu className="flex h-full flex-1 items-center">
                        <NavigationMenuList className="flex h-full flex-1 gap-2">
                            {items.map((item, index) => (
                                <NavigationMenuItem
                                    key={index}
                                    className="relative flex h-full flex-1 items-center whitespace-nowrap"
                                >
                                    {item.title === 'Free Quote' ? (
                                        <RainbowButton asChild size="default">
                                            <Link
                                                href={item.href}
                                                prefetch={'hover'}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    'relative h-9 w-full justify-center rounded-md px-3 after:absolute after:bottom-0 after:left-1/4 after:h-0.5 after:w-1/2 after:bg-primary after:opacity-0 after:content-[""]',
                                                    isActive(item.href) &&
                                                        'bg-primary/10 text-foreground after:opacity-100',
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </RainbowButton>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            prefetch={'hover'}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                'relative h-9 w-full justify-center rounded-md px-3 after:absolute after:bottom-0 after:left-1/4 after:h-0.5 after:w-1/2 after:bg-primary after:opacity-0 after:content-[""]',
                                                isActive(item.href) &&
                                                    'bg-primary/10 text-foreground after:opacity-100',
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="-ml-4 flex items-center">
                        <ThemeToggle />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
