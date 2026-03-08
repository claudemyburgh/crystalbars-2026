import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye, Reply } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface Props {
    quotes: Quote[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotes',
        href: '/admin/quotes',
    },
];

export default function Index({ quotes }: Props) {
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
                            {quotes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No quotes found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                quotes.map((quote) => (
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
            </div>
        </AppLayout>
    );
}
