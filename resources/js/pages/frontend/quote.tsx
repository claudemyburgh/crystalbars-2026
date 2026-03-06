import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function QuotePage() {
    return (
        <FrontendLayout>
            <Head title="Quote" />
            <section className="mx-auto w-full max-w-7xl px-4 py-12">
                <h1 className="text-2xl font-semibold">Get a Quote</h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">Request a custom quote for your project.</p>

                <form className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="jane@example.com" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="message">Message</Label>
                        <Input id="message" name="message" placeholder="Tell us about your project" />
                    </div>
                    <div className="sm:col-span-2">
                        <Button type="button">Submit request</Button>
                    </div>
                </form>
            </section>
        </FrontendLayout>
    );
}
