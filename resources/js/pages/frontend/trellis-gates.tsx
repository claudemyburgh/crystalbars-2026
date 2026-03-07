import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';

import { Button } from '@/components/ui/button';
import { quote } from '@/routes';


export default function TrellisGatesPage() {

    return (
        <FrontendLayout>
            <Head title="Trellis Gates" />

            <section className="relative isolate">
                <div className="absolute inset-0 -z-10">
                    {/* Background image placeholder: replace /images/hero.jpg with a real asset when available */}
                    <div className="h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-60" />
                    {/* Gradient overlay to ensure text contrast */}
                    <div className="absolute inset-0 bg-linear-to-br from-background/80 via-background/60 to-background/70" />
                </div>

                <div className="mx-auto w-full max-w-7xl px-4 py-20">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Secure your home with premium trellis gates and
                                doors
                            </h1>
                            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                                We design, manufacture, and install high‑quality
                                security solutions tailored to your space.
                            </p>
                            <div className="mt-6">
                                <Button asChild size="lg">
                                    <Link href={quote.url()}>Get a quote</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                            <div className="text-sm text-neutral-700 dark:text-neutral-200">
                                Trusted local craftsmanship. Fast lead times.
                                Professional installation.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
