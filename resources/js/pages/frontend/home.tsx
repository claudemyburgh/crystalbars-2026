import { Head, Link } from '@inertiajs/react';
import {
    Shield,
    Image as ImageIcon,
    HelpCircle,
    CheckCircle2,
    Sun,
    Hammer,
    Wrench,
    Clock,
    Award,
    Users,
    Phone,
    MessageCircle,
    ArrowRight,
    Eye,
    X,
} from 'lucide-react';
import BarsImage from '@/../images/bars.png';
import WhatsAppImage from '@/../images/examples/WhatsApp Image 2022-11-19 at 17.39.40.jpg';
import HomeHero from '@/components/frontend/home-hero';
import OwnerCTA from '@/components/frontend/owner-cta';
import MarqueeReviews from '@/components/shadcn-space/marquee/marquee-reviews';
import Gallery01 from '@/components/shadcn-space/gallery/gallery-01';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Highlighter } from '@/components/ui/highlighter';
import FrontendLayout from '@/layouts/frontend-layout';
import { gallery, faqs, quote } from '@/routes';
import trellis from '@/routes/trellis';

type Faq = {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
};

type HomePageProps = {
    canRegister?: boolean;
    faqs: Faq[];
};

export default function HomePage({ faqs: dbFaqs }: HomePageProps) {
    const schema = {
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
    } as const;

    const benefits = [
        {
            icon: Sun,
            title: 'UV Protected',
            description:
                '10-year UV guarantee prevents yellowing and degradation from sun exposure.',
        },
        {
            icon: Shield,
            title: 'Impact Resistant',
            description:
                'A-grade 6mm polycarbonate engineered to withstand strong impact.',
        },
        {
            icon: Eye,
            title: 'Crystal Clear',
            description:
                'Maintains your view and allows natural light into your home.',
        },
        {
            icon: CheckCircle2,
            title: 'Rust Free',
            description:
                'Will never rust or corrode - perfect for coastal areas.',
        },
        {
            icon: Wrench,
            title: 'Low Maintenance',
            description:
                'No painting or special treatment needed. Just occasional cleaning.',
        },
        {
            icon: Hammer,
            title: 'Professional Install',
            description:
                'Expert measurement and installation by our local team.',
        },
    ];

    return (
        <FrontendLayout>
            <Head title="Home">
                <meta
                    name="description"
                    content="Crystal Bars — Quality trellis gates, security doors, and custom security solutions in South Africa."
                />
                <meta property="og:title" content="Crystal Bars — Home" />
                <meta
                    property="og:description"
                    content="Quality trellis gates, security doors, and custom security solutions in South Africa."
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </Head>

            {/* Hero with background image */}
            <HomeHero />

            {/* Trust Stats Bar - Gradient Divider */}
            <div className="relative overflow-hidden bg-primary/10 py-10">
                <div className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4">
                    <div className="flex items-center gap-3 rounded-full bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                        <Award className="size-5 text-primary" />
                        <span className="text-sm font-semibold">
                            10+ Years Experience
                        </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-full bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                        <Users className="size-5 text-primary" />
                        <span className="text-sm font-semibold">
                            500+ Installations
                        </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-full bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                        <Sun className="size-5 text-primary" />
                        <span className="text-sm font-semibold">
                            10-Year UV Warranty
                        </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-full bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                        <Clock className="size-5 text-primary" />
                        <span className="text-sm font-semibold">
                            ~2 Day Lead Time
                        </span>
                    </div>
                </div>
                <svg
                    className={`absolute inset-0 fill-primary`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 100"
                >
                    <path d="M0 0v100l500-48 500 48V0H0z" opacity=".5"></path>
                    <path d="M0 0h1000v52H0z" opacity=".5"></path>
                    <path d="M0 0v4l500 48 500-48V0H0z" opacity=".5"></path>
                    <path d="M0 0v4l500 48 500-48V0H0z"></path>
                </svg>
            </div>

            {/* Bento Grid - Main Feature Section */}
            <section className="py-16">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* Main Content */}
                        <div className="rounded-3xl bg-linear-to-br from-primary/5 to-primary/10 p-8 lg:col-span-7">
                            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                                Transparent Polycarbonate Burglar Bars
                            </h2>
                            <p className="mt-2 text-lg font-medium text-primary">
                                The Perfect Blend of Style and Security
                            </p>
                            <div className="mt-6 space-y-4 text-muted-foreground">
                                <p>
                                    Are you tired of traditional burglar bars
                                    that block your view and ruin the aesthetic
                                    of your home? Our transparent polycarbonate
                                    burglar bars are the solution you've been
                                    looking for.
                                </p>
                                <p>
                                    Made with A-grade polycarbonate imported
                                    from Europe, our burglar bars are not only
                                    stylish and modern, but also incredibly
                                    durable and strong. At 6mm thick and 35mm
                                    wide, they are able to withstand significant
                                    force and protect your home from potential
                                    intruders.
                                </p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button asChild size="lg">
                                    <Link href={quote.url()}>
                                        Get a Free Quote
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href={faqs.url()}>Learn More</Link>
                                </Button>
                            </div>
                        </div>
                        {/* Key Benefits Card */}
                        <div className="rounded-3xl border bg-background p-8 shadow-lg lg:col-span-5">
                            <h3 className="text-xl font-bold">Key Benefits</h3>
                            <ul className="mt-4 space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                                    <span>
                                        A-grade 6mm thick polycarbonate from
                                        Europe
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                                    <span>
                                        35mm wide bars for maximum strength
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                                    <span>
                                        UV protection - no discoloring in sun
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                                    <span>
                                        Will never rust - perfect for coastal
                                        areas
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                                    <span>Zero maintenance required</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                                    <span>
                                        Quick and easy professional installation
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider with gradient */}
            <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            {/* Bento Grid - Benefits */}
            <section className="py-16">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                            Why Choose{' '}
                            <Highlighter
                                animationDuration={2500}
                                isView={true}
                                color={'goldenrod'}
                                action={`underline`}
                            >
                                Crystal Bars
                            </Highlighter>{' '}
                            ?
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                            Premium polycarbonate security solutions designed
                            for modern South African homes.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-2xl border bg-background p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="relative">
                                    <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10">
                                        <benefit.icon className="size-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold">
                                        {benefit.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider with gradient */}
            <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            {/* Bento Grid - Product Comparison */}
            <section className="bg-linear-to-b from-muted/20 to-muted/40 py-16">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                            <Highlighter
                                animationDuration={2500}
                                isView={true}
                                color={'goldenrod'}
                                action={`underline`}
                            >
                                Crystal Clear
                            </Highlighter>{' '}
                            vs{' '}
                            <Highlighter
                                animationDuration={2500}
                                isView={true}
                                color={'firebrick'}
                                action={`circle`}
                            >
                                Traditional Bars
                            </Highlighter>
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                            See why more homeowners are choosing transparent
                            polycarbonate security bars.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Comparison Table */}
                        <div className="rounded-2xl border bg-background p-6 shadow-lg">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 text-left font-black">
                                            Feature
                                        </th>
                                        <th className="pb-3 text-center font-black text-primary">
                                            Crystal Bars
                                        </th>
                                        <th className="pb-3 text-center font-black text-muted-foreground">
                                            Traditional
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr>
                                        <td className="py-3 font-medium">
                                            View
                                        </td>
                                        <td className="py-3 text-center font-medium text-primary">
                                            Crystal Clear
                                        </td>
                                        <td className="py-3 text-center text-muted-foreground">
                                            Blocks View
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-medium">
                                            UV Protection
                                        </td>
                                        <td className="py-3 text-center">
                                            <CheckCircle2 className="mx-auto size-5 text-primary" />
                                        </td>
                                        <td className="py-3 text-center">
                                            <X className="mx-auto size-5 text-muted-foreground" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-medium">
                                            Rust Resistant
                                        </td>
                                        <td className="py-3 text-center">
                                            <CheckCircle2 className="mx-auto size-5 text-primary" />
                                        </td>
                                        <td className="py-3 text-center">
                                            <X className="mx-auto size-5 text-muted-foreground" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-medium">
                                            Maintenance
                                        </td>
                                        <td className="py-3 text-center font-medium text-primary">
                                            Low
                                        </td>
                                        <td className="py-3 text-center text-muted-foreground">
                                            High
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-medium">
                                            Aesthetics
                                        </td>
                                        <td className="py-3 text-center font-medium text-primary">
                                            Modern
                                        </td>
                                        <td className="py-3 text-center text-muted-foreground">
                                            Prison-like
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Image */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={BarsImage}
                                alt="Crystal clear polycarbonate burglar bars"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            <div className="absolute right-6 bottom-6 left-6">
                                <p className="font-medium text-white">
                                    Clear view, maximum security
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider with gradient */}
            <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            {/* Bento Grid - Local Service */}
            <section className="py-16">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={WhatsAppImage}
                                alt="Professional installation"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-xl font-bold text-white">
                                    Professional Service
                                </h3>
                                <p className="text-white/80">
                                    Cape Town & Surrounding Areas
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center rounded-2xl border bg-linear-to-br from-primary/10 to-background p-8">
                            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
                                Professional Service in Cape Town & Surrounding
                                Areas
                            </h2>
                            <p className="mt-4 text-muted-foreground">
                                If you live in the Cape Town area or surrounding
                                areas, we would be happy to provide you with the
                                peace of mind that comes with secure and stylish
                                home protection.
                            </p>
                            <div className="mt-6 flex flex-col gap-3">
                                <Button asChild size="lg">
                                    <Link href={quote.url()}>
                                        Request a Quote
                                    </Link>
                                </Button>
                                <div className="flex gap-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="flex-1"
                                    >
                                        <a
                                            href="tel:+27794912812"
                                            className="flex items-center justify-center"
                                        >
                                            <Phone className="mr-2 size-4" />{' '}
                                            Call Us
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="flex-1"
                                    >
                                        <a
                                            href="https://wa.me/27727554303"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center"
                                        >
                                            <MessageCircle className="mr-2 size-4" />{' '}
                                            WhatsApp
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider with gradient */}
            <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            {/* Bento Grid - Testimonials */}
            <section className="bg-linear-to-b from-muted/20 to-muted/40 py-16">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                            What Our Clients Say
                        </h2>
                    </div>
                    <MarqueeReviews />
                </div>
            </section>

            {/* Divider with gradient */}
            <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            {/* Bento Grid - Gallery Preview */}
            <section className="py-16">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                            Our Work
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            See examples of our recent installations across Cape Town,
                            South Africa.
                        </p>
                    </div>
                    <Gallery01 />
                    <div className="mt-8 text-center">
                        <Button asChild variant="outline" size="lg">
                            <Link href={gallery.url()}>
                                View Full Gallery{' '}
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Divider with gradient */}
            <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            {/* FAQ Section */}
            <section className="bg-linear-to-b from-muted/20 to-muted/40 py-16">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Quick answers to common questions about our
                            products.
                        </p>
                    </div>
                    <div className="rounded-2xl border bg-background shadow-lg">
                        <Accordion
                            type="single"
                            collapsible
                            className="divide-y"
                        >
                            {dbFaqs.map((item, idx) => (
                                <AccordionItem
                                    key={idx}
                                    value={`faq-${idx}`}
                                    className="px-6"
                                >
                                    <AccordionTrigger className="font-medium hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className="mt-6 text-center">
                        <Link
                            href={faqs.url()}
                            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                        >
                            View all FAQs <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA - Gradient Background */}
            <section className="relative overflow-hidden bg-linear-to-r from-primary via-primary/80 to-primary py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent)]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-30" />
                <div className="relative mx-auto w-full max-w-4xl px-4 text-center">
                    <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                        Ready to Secure Your Home?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-white/90">
                        Get a free, no-obligation quote from our team. Fast
                        response, professional service.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button asChild size="lg" variant="secondary">
                            <Link href={quote.url()}>
                                Get a Free Quote{' '}
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                        >
                            <a href="tel:+27794912812">
                                <Phone className="mr-2 size-4" /> Call Us
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                        >
                            <a
                                href="https://wa.me/27727554303"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="mr-2 size-4" />{' '}
                                WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Owner CTA - Reusable Component */}
            <OwnerCTA />

            {/* Quick links - Footer */}
            <section className="bg-background py-12">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <Link href={trellis.gates.url()} className="group">
                            <div className="rounded-xl border p-6 transition-all group-hover:border-primary/50 group-hover:bg-primary/5">
                                <Shield className="mb-3 size-8 text-primary" />
                                <h3 className="font-bold">Trellis Gates</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Strong, smooth, and built to last.
                                </p>
                            </div>
                        </Link>
                        <Link href={gallery.url()} className="group">
                            <div className="rounded-xl border p-6 transition-all group-hover:border-primary/50 group-hover:bg-primary/5">
                                <ImageIcon className="mb-3 size-8 text-primary" />
                                <h3 className="font-bold">Gallery</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    See recent installations.
                                </p>
                            </div>
                        </Link>
                        <Link href={faqs.url()} className="group">
                            <div className="rounded-xl border p-6 transition-all group-hover:border-primary/50 group-hover:bg-primary/5">
                                <HelpCircle className="mb-3 size-8 text-primary" />
                                <h3 className="font-bold">FAQs</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Common questions answered.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
