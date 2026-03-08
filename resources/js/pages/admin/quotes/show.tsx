import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Mail, Phone, User, Send } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { reply } from '@/routes/admin/quotes';
import type { BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';

interface WindowData {
    type?: string;
    height?: string;
    drop?: string;
    quantity?: string;
}

interface QuoteMessage {
    text: string;
    windows?: WindowData[];
}

interface Quote {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: QuoteMessage;
    read_at: string | null;
    replied_at: string | null;
    created_at: string;
}

interface Props {
    quote: Quote;
}

export default function Show({ quote }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Quotes',
            href: '/admin/quotes',
        },
        {
            title: `Quote #${quote.id}`,
            href: `/admin/quotes/${quote.id}`,
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const submitReply = (e: React.FormEvent) => {
        e.preventDefault();
        post(reply({ quote: quote.id }).url, {
            onSuccess: () => reset('message'),
        });
    };

    const hasWindows = quote.message.windows && quote.message.windows.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Quote #${quote.id}`} />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Quote Request from ${quote.name}`}
                        description={`Received on ${format(new Date(quote.created_at), 'PPP at p')}`}
                    />
                    <div className="flex gap-2">
                        {quote.replied_at ? (
                            <Badge className="bg-emerald-500">Replied on {format(new Date(quote.replied_at), 'PPP')}</Badge>
                        ) : (
                            <Badge variant="secondary">Needs Reply</Badge>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Customer Details */}
                    <Card className="md:col-span-1 border-muted bg-muted/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Customer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium leading-none">{quote.name}</span>
                                    <span className="text-xs text-muted-foreground mt-1">Name</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex flex-col">
                                    <a href={`mailto:${quote.email}`} className="text-sm font-medium leading-none hover:underline">{quote.email}</a>
                                    <span className="text-xs text-muted-foreground mt-1">Email Address</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex flex-col">
                                    <a href={`tel:${quote.phone}`} className="text-sm font-medium leading-none hover:underline">{quote.phone}</a>
                                    <span className="text-xs text-muted-foreground mt-1">Phone Number</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="md:col-span-2 flex flex-col gap-6">
                        {/* Quote Message & Windows Data */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quote Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div>
                                    <Label className="text-xs uppercase text-muted-foreground tracking-wider mb-2 block">Message</Label>
                                    <div className="rounded-md border bg-muted/20 p-4 text-sm whitespace-pre-wrap">
                                        {quote.message.text || <span className="text-muted-foreground italic">No message provided.</span>}
                                    </div>
                                </div>

                                {hasWindows && (
                                    <div>
                                        <Label className="text-xs uppercase text-muted-foreground tracking-wider mb-2 block">Requested Windows/Doors</Label>
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader className="bg-muted/30">
                                                    <TableRow>
                                                        <TableHead>Type</TableHead>
                                                        <TableHead>Width (mm)</TableHead>
                                                        <TableHead>Drop (mm)</TableHead>
                                                        <TableHead className="text-right">Qty</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {quote.message.windows!.map((window, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium capitalize">{window.type?.replace('-', ' ') || 'N/A'}</TableCell>
                                                            <TableCell>{window.height || '-'}</TableCell>
                                                            <TableCell>{window.drop || '-'}</TableCell>
                                                            <TableCell className="text-right">{window.quantity || '-'}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Reply Form */}
                        <Card>
                            <form onSubmit={submitReply}>
                                <CardHeader>
                                    <CardTitle>Send Reply</CardTitle>
                                    <CardDescription>
                                        This will send an email directly to the customer.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        <Label htmlFor="message">Your Message</Label>
                                        <Textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Write your response here..."
                                            className="min-h-[150px]"
                                            required
                                        />
                                        <InputError message={errors.message} />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={processing} className="w-full  sm:w-auto">
                                        <Send className="mr-2 h-4 w-4" />
                                        {processing ? 'Sending...' : 'Send Email Reply'}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
