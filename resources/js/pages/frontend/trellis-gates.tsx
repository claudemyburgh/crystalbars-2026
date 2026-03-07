import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { quote } from '@/routes';
import OwnerCTA from '@/components/frontend/owner-cta';

export default function TrellisGatesPage() {
    /* function FAQsAccordion() {
        const items = [
            {
                q: 'Can I install it on any type of window?',
                a: 'Wood, Aluminium, Steel and PVC Windows, are all the windows that we can install the clear bars to.',
            },
            {
                q: 'How are the polycarbonate burglar bars fixed to the windows?',
                a: 'Burglar bars are mounted to your window frames, unless you have sliding windows, we use aluminium square tubing the same colour as your frames for support.',
            },
            {
                q: 'How do I go about getting a quote?',
                a: (
                    <>
                        If you already have your window sizes you can mail them to us for a quote, or we will come to your house and take all the window measurements for you.{' '}
                        <Link className="text-primary hover:underline" href={quote.url()}>
                            get quote
                        </Link>
                    </>
                ),
            },
            {
                q: 'How long from accepting the quote to installation?',
                a: 'Normally 2-3 days before installation.',
            },
            {
                q: 'Can you cut the bars?',
                a: 'Yes, you can cut the bars with a grinder but so can any burglar bar that you install.',
            },
            {
                q: 'Can you burn the burglar bars?',
                a: 'The bars need a tremendous amount of heat to be burnt and polycarbonate is flame-retardant, and it extinguishes itself as it is being burnt. So yes, it can be melted with very high heat, like a blue flame but it will be time-consuming.',
            },
            {
                q: 'What guarantee do you give?',
                a: 'Burglar bars are guaranteed not to fade or discolour in direct sunlight for 10 years as they are UV protective. We also offer a one-year workmanship guarantee.',
            },
            {
                q: 'How do you keep the burglar bars clean?',
                a: 'Use soapy water and a soft microfibre cloth, no strong chemicals or ammonia-based cleaning chemicals as they damage the bars making them discolour.',
            },
            {
                q: 'Do insurance companies accept clear burglar bars?',
                a: 'Yes, always check with your insurance company before installation as their policies do differ.',
            },
            {
                q: 'Are the polycarbonate burglar bars expensive?',
                a: 'The polycarbonate bars are more cost-effective than the traditional metal burglar bars and the turnaround time from quote to installation is by far the fastest.',
            },
            {
                q: 'Any maintenance on the burglar bars?',
                a: 'No maintenance, bars will never rust or need painting.',
            },
            {
                q: 'What is the difference between "crystal bars", "clear view bars" and "transparent bars”?',
                a: (
                    <>
                        <strong>Nothing:</strong> Crystal Bars is just the name of our company and what we like to refer to as our product. Other company just name their product crystal bars due to the popularity of our company brand.
                    </>
                ),
            },
            {
                q: 'How long will it take to install the transparent burglar bars?',
                a: 'No longer than one working day. For the average home size, it may take 1 to 3 hours to install your transparent burglar bars.',
            },
        ];

        return (
            <Accordion type="single" collapsible className="divide-y divide-sidebar-border/60 rounded-md border bg-background">
                {items.map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="px-4 md:px-6 lg:px-8">
                        <AccordionTrigger className="text-xl font-black tracking-tight md:text-2xl">
                            {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="leading-8 text-base md:text-lg">
                            {item.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        );
    } */
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

            {/* Removed FAQs section (moved to FAQs page) */}
            {/* <section className="mx-auto w-full max-w-3xl px-4 py-12">
                <h1 className="mb-10 text-center text-3xl font-black tracking-tight md:text-4xl">
                    <span className="relative z-10">Here are some of the frequently asked </span>
                    <br />
                    <span className="relative inline-block">
                        <strong className="relative z-10 text-white">questions.</strong>
                        <span aria-hidden className="absolute -inset-2 -skew-x-6 -rotate-2 rounded-md bg-primary/70"></span>
                    </span>
                </h1>

                <FAQsAccordion />
            </section> */}

            <OwnerCTA />
        </FrontendLayout>
    );
}
