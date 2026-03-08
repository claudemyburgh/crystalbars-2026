import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) return null;

    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            {links.map((link, index) => {
                const isFirst = index === 0;
                const isLast = index === links.length - 1;

                let content: React.ReactNode = link.label;
                if (isFirst) content = <ChevronLeft className="h-4 w-4" />;
                if (isLast) content = <ChevronRight className="h-4 w-4" />;
                if (link.label === '...') content = <MoreHorizontal className="h-4 w-4" />;

                if (link.url === null) {
                    return (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            disabled
                            className="h-8 w-8"
                        >
                            {content}
                        </Button>
                    );
                }

                return (
                    <Button
                        key={index}
                        variant={link.active ? 'default' : 'ghost'}
                        size="icon"
                        asChild
                        className="h-8 w-8"
                    >
                        <Link href={link.url} preserveScroll>
                            {content}
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
}
