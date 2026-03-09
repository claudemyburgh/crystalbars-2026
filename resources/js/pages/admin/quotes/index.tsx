import { Head, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { index as quoteIndex } from '@/actions/App/Http/Controllers/Admin/QuoteController';
import Heading from '@/components/heading';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { show } from '@/routes/admin/quotes';
import type { BreadcrumbItem } from '@/types';

interface Quote {
    id: number;
    name: string;
    email: string;
    phone: string;
    read_at: string | null;
    replied_at: string | null;
    created_at: string;
}

interface PaginatedQuotes {
    data: Quote[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    quotes: PaginatedQuotes;
    filters: {
        search?: string;
        sort?: string;
        direction?: string;
        status?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotes',
        href: '/admin/quotes',
    },
];

export default function Index({ quotes, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [sort, setSort] = useState(filters.sort || 'created_at');
    const [direction, setDirection] = useState(filters.direction || 'desc');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params: Record<string, string> = {};
            if (search) {
                params.search = search;
            }
            params.sort = sort;
            params.direction = direction;
            if (status) {
                params.status = status;
            }

            router.get(
                quoteIndex.url({ query: params }),
                {},
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, sort, direction, status]);

    const handleSortChange = (value: string) => {
        const [newSort, newDirection] = value.split(':');
        setSort(newSort);
        setDirection(newDirection);
    };

    const handleStatusChange = (value: string) => {
        setStatus(value === 'all' ? '' : value);
    };

    const getStatusBadge = (quote: Quote) => {
        if (quote.replied_at) {
            return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Replied</Badge>;
        }
        if (quote.read_at) {
            return <Badge variant="secondary">Read</Badge>;
        }
        return <Badge variant="destructive">Unread</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quotes Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Heading title="Quotes" description="Manage all incoming quote requests." />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search quotes..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Select value={status || 'all'} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="unread">Unread</SelectItem>
                                <SelectItem value="read">Read</SelectItem>
                                <SelectItem value="replied">Replied</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <Select value={`${sort}:${direction}`} onValueChange={handleSortChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="created_at:desc">Newest First</SelectItem>
                                <SelectItem value="created_at:asc">Oldest First</SelectItem>
                                <SelectItem value="name:asc">Name (A-Z)</SelectItem>
                                <SelectItem value="name:desc">Name (Z-A)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quotes.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No quotes found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                quotes.data.map((quote) => (
                                    <TableRow key={quote.id}>
                                        <TableCell className="font-medium">
                                            {format(new Date(quote.created_at), 'MMM d, yyyy h:mm a')}
                                        </TableCell>
                                        <TableCell>{quote.name}</TableCell>
                                        <TableCell>{quote.email}</TableCell>
                                        <TableCell>{quote.phone}</TableCell>
                                        <TableCell>{getStatusBadge(quote)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={show({ quote: quote.id })}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Pagination links={quotes.links} />
            </div>
        </AppLayout>
    );
}
