import { Head, router, usePoll } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye, Search, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { index as quoteIndex } from '@/actions/App/Http/Controllers/Admin/QuoteController';
import Heading from '@/components/heading';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import { show, destroy, bulkDestroy } from '@/routes/admin/quotes';
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
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    
    usePoll(60000, { only: ['quotes', 'unreadQuotesCount'] });

    // Dialog state
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(quotes.data.map(q => q.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (checked: boolean, id: number) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(i => i !== id));
        }
    };

    const handleDelete = (id: number) => {
        setIdsToDelete([id]);
        setIsConfirmOpen(true);
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        setIdsToDelete(selectedIds);
        setIsConfirmOpen(true);
    };

    function confirmDelete() {
        if (idsToDelete.length === 0) return;
        setIsDeleting(true);

        if (idsToDelete.length === 1) {
            router.delete(destroy.url(idsToDelete[0]), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setIdsToDelete([]);
                    setSelectedIds((prev) =>
                        prev.filter((id) => id !== idsToDelete[0]),
                    );
                },
                onFinish: () => setIsDeleting(false),
            });
        } else {
            router.post(
                bulkDestroy.url(),
                { ids: idsToDelete },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsConfirmOpen(false);
                        setIdsToDelete([]);
                        setSelectedIds([]);
                    },
                    onFinish: () => setIsDeleting(false),
                },
            );
        }
    }

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
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm text-muted-foreground">{selectedIds.length} selected</span>
                            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected
                            </Button>
                        </div>
                    )}
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40px]">
                                    <Checkbox 
                                        checked={quotes.data.length > 0 && selectedIds.length === quotes.data.length}
                                        onCheckedChange={handleSelectAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
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
                                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                        No quotes found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                quotes.data.map((quote) => (
                                <TableRow key={quote.id}>
                                        <TableCell>
                                            <Checkbox 
                                                checked={selectedIds.includes(quote.id)}
                                                onCheckedChange={(checked) => handleSelectOne(!!checked, quote.id)}
                                                aria-label="Select row"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {format(new Date(quote.created_at), 'MMM d, yyyy h:mm a')}
                                        </TableCell>
                                        <TableCell>{quote.name}</TableCell>
                                        <TableCell>{quote.email}</TableCell>
                                        <TableCell>{quote.phone}</TableCell>
                                        <TableCell>{getStatusBadge(quote)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={show({ quote: quote.id })}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(quote.id)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Pagination links={quotes.links} />

                <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                Confirm Deletion
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete{' '}
                                {idsToDelete.length === 1
                                    ? 'this quote'
                                    : `${idsToDelete.length} quotes`}
                                ? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsConfirmOpen(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
