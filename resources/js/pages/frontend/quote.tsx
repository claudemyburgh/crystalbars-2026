import { Head, useForm } from '@inertiajs/react';
import confetti from 'canvas-confetti';
import { Trash2 } from 'lucide-react';
import { Fragment } from 'react';
import { toast } from 'sonner';
import Wrapper from '@/components/frontend/wrapper';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import FrontendLayout from '@/layouts/frontend-layout';
import { store } from '@/routes/quote';

interface Window {
    id: number;
    type: 'burglar-bars' | 'trellis';
    height: string;
    drop: string;
    quantity: string;
}

export default function QuotePage() {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            email: '',
            phone: '',
            message: '',
            windows: [] as Window[], // Changed initial state to empty array with proper type
        });

    const success = () => {
        const colors = ['#25A4DFFF', '#A142FEFF', '#fd672e', '#7aeaf8'];
        toast.success('Quote request sent');
        confetti({
            particleCount: 400,
            spread: 320,
            origin: { y: 0.6 },
            colors: colors,
        });
    };

    const addWindow = () => {
        setData('windows', [
            ...data.windows,
            {
                id: data.windows.length + 1,
                type: 'burglar-bars',
                height: '',
                drop: '',
                quantity: '',
            },
        ]);
    };

    const removeWindow = (id: number) => {
        setData(
            'windows',
            data.windows.filter((window) => window.id !== id),
        );
    };

    const updateWindow = (id: number, field: string, value: string) => {
        setData(
            'windows',
            data.windows.map((window) => {
                if (window.id !== id) return window;

                const updatedWindow = { ...window, [field]: value };
                if (field === 'type' && value === 'trellis') {
                    updatedWindow.drop = '2100';
                }

                return updatedWindow;
            }),
        );
    };

    return (
        <FrontendLayout>
            <Head title="Quote">
                <meta
                    name="description"
                    content="Get a free quote for transparent polycarbonate burglar bars or trellis security gates in Cape Town. Fast response, professional service."
                />
                <meta
                    property="og:title"
                    content="Crystal Bars | Get a Quote"
                />
                <meta
                    property="og:description"
                    content="Request a free, no-obligation quote for your security needs. Fast response and professional installation."
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'LocalBusiness',
                            name: 'Crystal Bars',
                            url: 'https://crystalbars.co.za',
                            telephone: '+27794912812',
                            email: 'info@crystalbars.co.za',
                            areaServed: 'ZA',
                            sameAs: ['https://wa.me/27727554303'],
                            contactPoint: [
                                {
                                    '@type': 'ContactPoint',
                                    telephone: '+27794912812',
                                    contactType: 'customer service',
                                    availableLanguage: 'en',
                                },
                            ],
                        }),
                    }}
                />
            </Head>
            <Wrapper className="py-12">
                <h1 className="text-2xl font-semibold">Get a Quote</h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                    Request a custom quote for your project.
                </p>
                <Card className={`my-12`}>
                    <CardHeader>
                        <CardTitle>Get Free Quote</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                post(store().url, {
                                    onSuccess: () => {
                                        success(); // Show success toast/confetti
                                        reset(); // Reset ALL form fields to initial state on success
                                    },
                                    onError: () => {
                                        // Inertia automatically populates 'errors' and 'data'
                                        // No explicit action needed here for errors to display
                                    },
                                    preserveScroll: true,
                                    onFinish: () => {
                                        // This runs after success or error.
                                        // No explicit reset needed here, as reset() on success handles it.
                                        // If errors occurred, data remains to display validation issues.
                                    },
                                });
                            }}
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Name{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Jane Doe"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData('name', e.target.value);
                                        clearErrors('name');
                                    }}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="jane@example.com"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData('email', e.target.value);
                                        clearErrors('email');
                                    }}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="col-span-full space-y-2">
                                <Label htmlFor="phone">
                                    Phone{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="081 555 5555"
                                    value={data.phone}
                                    onChange={(e) => {
                                        setData('phone', e.target.value);
                                        clearErrors('phone');
                                    }}
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="col-span-full space-y-2">
                                <Label htmlFor="message">
                                    Message{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="message"
                                    value={data.message}
                                    onChange={(e) => {
                                        setData('message', e.target.value);
                                        clearErrors('message');
                                    }}
                                    autoGrow
                                />
                                <InputError message={errors.message} />
                            </div>
                            <div
                                className={`col-span-full -mx-4 space-y-4 rounded-md bg-muted/50 p-4`}
                            >
                                <h3 className="text-lg leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Window/Trellis Details
                                </h3>
                                {data.windows.map((window, index) => (
                                    <Fragment key={window.id}>
                                        <div className="flex w-full flex-wrap items-start gap-4">
                                            <div className="min-w-[120px] flex-1 space-y-2">
                                                <Label
                                                    htmlFor={`type-${window.id}`}
                                                >
                                                    Type{' '}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </Label>
                                                <Select
                                                    value={window.type}
                                                    onValueChange={(value) => {
                                                        updateWindow(
                                                            window.id,
                                                            'type',
                                                            value,
                                                        );
                                                        clearErrors(
                                                            `windows.${index}.type`,
                                                        );
                                                    }}
                                                >
                                                    <SelectTrigger
                                                        id={`type-${window.id}`}
                                                        className="w-full"
                                                    >
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="burglar-bars">
                                                            Burglar Bars
                                                        </SelectItem>
                                                        <SelectItem value="trellis">
                                                            Trellis
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={
                                                        errors[
                                                            `windows.${index}.type`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="min-w-[80px] flex-1 space-y-2">
                                                <Label
                                                    htmlFor={`height-${window.id}`}
                                                >
                                                    Width (mm){' '}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    id={`height-${window.id}`}
                                                    type="number"
                                                    value={window.height}
                                                    onChange={(e) => {
                                                        updateWindow(
                                                            window.id,
                                                            'height',
                                                            e.target.value,
                                                        );
                                                        clearErrors(
                                                            `windows.${index}.height`,
                                                        );
                                                    }}
                                                    placeholder="e.g., 1200"
                                                    className="w-full"
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `windows.${index}.height`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="min-w-[80px] flex-1 space-y-2">
                                                <Label
                                                    htmlFor={`drop-${window.id}`}
                                                >
                                                    Drop (Height) (mm){' '}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    id={`drop-${window.id}`}
                                                    type="number"
                                                    value={window.drop}
                                                    onChange={(e) => {
                                                        updateWindow(
                                                            window.id,
                                                            'drop',
                                                            e.target.value,
                                                        );
                                                        clearErrors(
                                                            `windows.${index}.drop`,
                                                        );
                                                    }}
                                                    placeholder="e.g., 900"
                                                    className="w-full"
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `windows.${index}.drop`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="min-w-[80px] flex-1 space-y-2">
                                                <Label
                                                    htmlFor={`quantity-${window.id}`}
                                                >
                                                    Quantity{' '}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    id={`quantity-${window.id}`}
                                                    type="number"
                                                    value={window.quantity}
                                                    onChange={(e) => {
                                                        updateWindow(
                                                            window.id,
                                                            'quantity',
                                                            e.target.value,
                                                        );
                                                        clearErrors(
                                                            `windows.${index}.quantity`,
                                                        );
                                                    }}
                                                    placeholder="e.g., 2"
                                                    className="w-full"
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `windows.${index}.quantity`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="flex-shrink-0 pt-[24px]">
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="default"
                                                    className="w-14"
                                                    onClick={() =>
                                                        removeWindow(window.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {index < data.windows.length - 1 && (
                                            <div className="my-4 w-full border-b border-gray-200 dark:border-gray-700" />
                                        )}
                                    </Fragment>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addWindow}
                                    className="w-full"
                                >
                                    Add Window/Trellis
                                </Button>
                            </div>

                            <div className="sm:col-span-2">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Requesting...'
                                        : 'Request Quote'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Wrapper>
        </FrontendLayout>
    );
}
