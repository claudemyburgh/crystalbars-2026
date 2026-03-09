import { Head, router } from '@inertiajs/react';
import { Download, Search, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { index as clientIndex, exportMethod as clientExport, destroy, bulkDestroy } from '@/actions/App/Http/Controllers/Admin/ClientController';
import Heading from '@/components/heading';
import { Pagination } from '@/components/pagination';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import type { BreadcrumbItem } from '@/types';

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
}

interface PaginatedClients {
    data: Client[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    clients: PaginatedClients;
    filters: {
        search?: string;
        sort?: string;
        direction?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/admin/clients',
    },
];

export default function Index({ clients, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [sort, setSort] = useState(filters.sort || 'id');
    const [direction, setDirection] = useState(filters.direction || 'desc');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Dialog state
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params: any = {};
            if (search) params.search = search;
            if (sort !== 'id' || direction !== 'desc') {
                params.sort = sort;
                params.direction = direction;
            }

            const currentParams = new URLSearchParams(window.location.search);
            const hasChanged =
                search !== (filters.search || '') ||
                sort !== (filters.sort || 'id') ||
                direction !== (filters.direction || 'desc');

            if (hasChanged) {
                router.get(
                    clientIndex.url({ query: params }),
                    {},
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, sort, direction, filters]);

    const handleSortChange = (value: string) => {
        const [newSort, newDirection] = value.split(':');
        setSort(newSort);
        setDirection(newDirection);
    };

    const handleExport = () => {
        const params: any = {};
        if (search) {
            params.search = search;
        }
        params.sort = sort;
        params.direction = direction;

        window.location.href = clientExport.url({ query: params });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(clients.data.map(c => c.id));
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
            <Head title="Clients Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Heading title="Clients" description="Manage all clients who have requested quotes." />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search clients..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <Select value={`${sort}:${direction}`} onValueChange={handleSortChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="id:desc">Newest First</SelectItem>
                                <SelectItem value="id:asc">Oldest First</SelectItem>
                                <SelectItem value="name:asc">Name (A-Z)</SelectItem>
                                <SelectItem value="name:desc">Name (Z-A)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{selectedIds.length} selected</span>
                            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected
                            </Button>
                        </div>
                    )}
                    <Button variant="outline" onClick={handleExport} className="ml-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40px]">
                                    <Checkbox 
                                        checked={clients.data.length > 0 && selectedIds.length === clients.data.length}
                                        onCheckedChange={handleSelectAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                                <TableHead className="w-[32px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No clients found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                clients.data.map((client) => (
                                <TableRow key={client.id}>
                                        <TableCell>
                                            <Checkbox 
                                                checked={selectedIds.includes(client.id)}
                                                onCheckedChange={(checked) => handleSelectOne(!!checked, client.id)}
                                                aria-label="Select row"
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            #{client.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="text-xs">
                                                        {client.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{client.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{client.phone}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Pagination links={clients.links} />

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
                                    ? 'this client'
                                    : `${idsToDelete.length} clients`}
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

