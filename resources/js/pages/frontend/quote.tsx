import { Form, Head } from '@inertiajs/react';
import confetti from "canvas-confetti"
import { toast } from 'sonner';
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
import { Textarea } from '@/components/ui/textarea';
import FrontendLayout from '@/layouts/frontend-layout';
import { store } from '@/routes/quote';



export default function QuotePage() {
    const success = () => {
        const colors = ['#25A4DFFF', '#A142FEFF', '#fd672e', '#7aeaf8'];
        toast.success('Quote request sent')
        confetti({
            particleCount: 400,
            spread: 320,
            origin: { y: 0.6 },
            colors: colors,
        });
    }
    return (
        <FrontendLayout>
            <Head title="Quote" />
            <section className="mx-auto w-full max-w-7xl px-4 py-12">
                <h1 className="text-2xl font-semibold">Get a Quote</h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                    Request a custom quote for your project.
                </p>
                <Card className={`my-12 max-w-2xl`}>
                    <CardHeader>
                        <CardTitle>Get Free Quote</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
                            {...store()}
                            onSuccess={success}
                            resetOnSuccess
                        >
                            {({ errors, processing, clearErrors }) => (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Jane Doe"
                                            onChange={() => clearErrors('name')}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="jane@example.com"
                                            onChange={() =>
                                                clearErrors('email')
                                            }
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="col-span-full space-y-2">
                                        <Label htmlFor="phone">
                                            Phone <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            placeholder="081 555 5555"
                                            onChange={() =>
                                                clearErrors('phone')
                                            }
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    <div className="col-span-full space-y-2">
                                        <Label htmlFor="message">
                                            Message <span className="text-destructive">*</span>
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="message"
                                            onChange={() =>
                                                clearErrors('message')
                                            }
                                            autoGrow
                                        />
                                        <InputError message={errors.message} />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Requesting...'
                                                : 'Request Quote'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </section>
        </FrontendLayout>
    );
}
