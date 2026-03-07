import { Head, Link } from '@inertiajs/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import FrontendLayout from '@/layouts/frontend-layout';
import { quote } from '@/routes';
import OwnerCTA from '@/components/frontend/owner-cta';

type Faq = { id: number; question: string; answer: string };

export default function FaqsPage({ faqs }: { faqs: Faq[] }) {
    return (
        <FrontendLayout>
            <Head title="FAQs" />

            <section className="relative isolate">
                <div className="absolute inset-0 -z-10">
                    <div className="h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-60" />
                    <div className="absolute inset-0 bg-linear-to-br from-background/80 via-background/60 to-background/70" />
                </div>

                <div className="mx-auto w-full max-w-7xl px-4 py-20">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Frequently asked questions
                            </h1>
                            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                                Answers to common questions about our crystal
                                bars, installations, timelines, and more.
                            </p>
                            <div className="mt-6">
                                <Button asChild size="lg">
                                    <Link href={quote.url()}>Get a quote</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="rounded-xl border border-sidebar-border/60 bg-linear-to-br from-primary/10 to-accent/10 p-8">
                            <div className="text-sm text-neutral-700 dark:text-neutral-200">
                                Still have questions? Call 079 491 2812,
                                WhatsApp 072 755 4303, or email
                                info@crystalbars.co.za.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-3xl px-4 py-12">
                <div className="mt-6">
                    <Accordion type="single" className="space-y-3">
                        {faqs.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={String(item.id)}
                                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                            >
                                <AccordionTrigger className="w-full rounded-lg px-4 py-4 text-left text-base font-semibold transition-colors hover:bg-muted/30 data-[state=open]:bg-muted/30 md:px-6 md:text-lg">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 leading-7 text-muted-foreground md:px-6">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            <OwnerCTA />
        </FrontendLayout>
    );
}
