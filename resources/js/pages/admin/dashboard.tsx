import { Head, Link } from '@inertiajs/react';
import { Users, MessageSquare, MailOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as clientsIndex } from '@/routes/admin/clients';
import { index as quotesIndex } from '@/routes/admin/quotes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

interface Stats {
    totalClients: number;
    totalQuotes: number;
    unreadQuotes: number;
}

interface Props {
    stats: Stats;
}

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <Link prefetch={'hover'} href={clientsIndex()} className="block">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                                <Users className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.totalClients}</div>
                                <p className="mt-1 text-xs text-muted-foreground">All registered clients</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link prefetch={'hover'} href={quotesIndex()} className="block">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
                                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.totalQuotes}</div>
                                <p className="mt-1 text-xs text-muted-foreground">All incoming quote requests</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link prefetch={'hover'} href={quotesIndex()} className="block">
                        <Card className={`transition-shadow hover:shadow-md ${stats.unreadQuotes > 0 ? 'border-destructive/50' : ''}`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Unread Quotes</CardTitle>
                                <MailOpen className={`h-5 w-5 ${stats.unreadQuotes > 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-3xl font-bold ${stats.unreadQuotes > 0 ? 'text-destructive' : ''}`}>
                                    {stats.unreadQuotes}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {stats.unreadQuotes === 0 ? 'All caught up!' : 'Awaiting your attention'}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
