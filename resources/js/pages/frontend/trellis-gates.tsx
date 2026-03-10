import { Head, Link } from '@inertiajs/react';
import {
    Shield,
    Lock,
    Palette,
    Truck,
    Expand,
    CheckCircle2,
} from 'lucide-react';
import { BenefitCard } from '@/components/frontend/benefit-card';
import Wrapper from '@/components/frontend/wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import FrontendLayout from '@/layouts/frontend-layout';
import { quote } from '@/routes';

import gallery1 from '../../../images/examples/10489802_1474159762822672_9219813355605679489_n.webp';
import gallery2 from '../../../images/examples/225357565_2953614061543894_502644624338730739_n.webp';
import gallery3 from '../../../images/examples/37403523_2103354546569854_5795604190340317184_n.webp';
import ctaImage from '../../../images/examples/42492207_10217443153776554_5487642962064048128_n.webp';
import gallery4 from '../../../images/examples/42513372_10217443138656176_9081619819526094848_n.webp';
import gallery5 from '../../../images/examples/42520445_10217443150256466_6765972413587914752_n.webp';
import gallery6 from '../../../images/examples/55949107_2279441115627862_8651684217282887680_n.webp';
import gallery7 from '../../../images/examples/74238133_2426432990928673_6319285601371684864_n.webp';
import featureExpand from '../../../images/examples/WhatsApp Image 2022-11-19 at 12.39.38.webp';
import featureLock from '../../../images/examples/WhatsApp Image 2022-11-19 at 17.38.32.webp';
import heroImage from '../../../images/examples/WhatsApp Image 2022-11-19 at 17.39.35.webp';

const colors = [
    { name: 'White', color: 'bg-white border-2 border-neutral-200' },
    { name: 'Bronze', color: 'bg-amber-700' },
    { name: 'Charcoal', color: 'bg-neutral-600' },
    { name: 'Black', color: 'bg-neutral-900' },
];

const features = [
    {
        icon: Shield,
        title: 'Durable Aluminum',
        description:
            'Built with premium aluminum construction for lasting strength and corrosion resistance.',
    },
    {
        icon: Lock,
        title: 'Slam Lock Security',
        description:
            'Stainless steel slam lock mechanism ensures maximum protection at all times.',
    },
    {
        icon: Expand,
        title: 'Expandable Design',
        description:
            'Adjustable width to fit your specific needs—perfect for any doorway or opening.',
    },
    {
        icon: Palette,
        title: 'Multiple Colors',
        description:
            "Choose from white, charcoal, bronze, or black to complement your property's style.",
    },
    {
        icon: Truck,
        title: 'Free Installation',
        description:
            'Professional installation included with every purchase at no additional cost.',
    },
    {
        icon: CheckCircle2,
        title: 'Residential & Commercial',
        description:
            'Versatile security solution suitable for homes and businesses alike.',
    },
];

export default function TrellisGatesPage({
    trellises,
}: {
    trellises: Array<{
        id: number;
        width: number;
        drop: number;
        price: number;
    }>;
}) {
    return (
        <FrontendLayout>
            <Head title="Trellis Security Gates">
                <meta
                    name="description"
                    content="Premium aluminum trellis security gates in South Africa. Durable, stylish, and secure with free installation. Available in white, bronze, charcoal, and black."
                />
                <meta
                    property="og:title"
                    content="Crystal Bars | Trellis Security Gates"
                />
                <meta
                    property="og:description"
                    content="Premium aluminum trellis security gates with free installation. Available in multiple colors to match your home."
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
            <div className="min-h-screen bg-background">
                <main>
                    {/* Hero Bento Grid */}
                    <Wrapper as="section" className="py-8 lg:py-12">
                        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-2 lg:grid-cols-4">
                            {/* Main Hero - Large */}
                            <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl bg-secondary md:col-span-2 lg:col-span-2">
                                <img
                                    src={heroImage}
                                    alt="Premium trellis security gate in modern home entrance"
                                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-[0] bg-[linear-gradient(to_top,rgba(0,0,0,0.9),rgba(0,0,0,0.4),transparent)]" />
                                <div className="relative flex h-full flex-col justify-end p-6 lg:p-8">
                                    <Badge className="mb-4 w-fit border-white/30 bg-white/20 text-white backdrop-blur-sm">
                                        Free Installation Included
                                    </Badge>
                                    <h1 className="text-3xl leading-tight font-bold text-balance text-white sm:text-4xl lg:text-5xl">
                                        Trellis Security Gates
                                    </h1>
                                    <p className="mt-4 max-w-md text-base text-gray-300 lg:text-lg">
                                        Premium aluminum security gates
                                        combining style with uncompromising
                                        protection for your property.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <Button
                                            size="lg"
                                            asChild
                                            variant={'secondary'}
                                        >
                                            <Link href={quote.url()}>
                                                Get Started
                                            </Link>
                                        </Button>
                                        <Button
                                            size="lg"
                                            asChild
                                            variant="ghost"
                                            className={`bg-white/10 text-white`}
                                        >
                                            <a href="#gallery">
                                                View Collection
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Color Options Card */}
                            <div className="col-span-1 row-span-1 flex flex-col justify-between rounded-3xl border border-border bg-card p-6">
                                <div>
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        Available Colors
                                    </p>
                                    <p className="text-lg font-semibold text-foreground">
                                        Four Premium Finishes
                                    </p>
                                </div>
                                <div className="flex justify-evenly gap-3">
                                    {colors.map((color) => (
                                        <Tooltip key={color.name}>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={`h-10 w-10 cursor-pointer rounded-full border border-border shadow-sm transition-transform hover:scale-110 ${color.color}`}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {color.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="col-span-1 row-span-1 flex flex-col justify-between rounded-3xl border border-border bg-primary p-6 text-white/80">
                                <div>
                                    <p className="mb-1 text-sm text-white">
                                        Starting From
                                    </p>
                                    <p className="text-3xl font-bold">
                                        R{' '}
                                        {trellises.length > 0
                                            ? new Intl.NumberFormat(
                                                  'en-ZA',
                                              ).format(trellises[0].price)
                                            : '3,800'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                                    Installation included
                                </div>
                            </div>

                            {/* Feature Image 1 */}
                            <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl">
                                <img
                                    src={featureLock}
                                    alt="Close-up of stainless steel slam lock mechanism"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <p className="font-medium text-white">
                                        Slam Lock
                                    </p>
                                    <p className="text-sm text-white/70">
                                        Stainless Steel
                                    </p>
                                </div>
                            </div>

                            {/* Feature Image 2 */}
                            <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl">
                                <img
                                    src={featureExpand}
                                    alt="Expandable trellis gate demonstration"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <p className="font-medium text-white">
                                        Expandable
                                    </p>
                                    <p className="text-sm text-white/70">
                                        Custom Fit
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Wrapper>

                    {/* Features Section */}
                    <section
                        id="features"
                        className="bg-background bg-radial-[at_50%_50%] from-primary/50 to-transparent to-50% py-16 lg:py-24"
                    >
                        <Wrapper>
                            <div className="mb-12 text-center lg:mb-16">
                                <Badge variant="secondary" className="mb-4">
                                    Features
                                </Badge>
                                <h2 className="text-3xl font-bold text-balance text-foreground lg:text-4xl">
                                    Security Meets Style
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                                    Our trellis security gates are engineered
                                    for durability and designed for elegance.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {features.map((feature) => (
                                    <BenefitCard
                                        key={feature.title}
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                    />
                                ))}
                            </div>
                        </Wrapper>
                    </section>

                    {/* Gallery Bento Grid */}
                    <section
                        id="gallery"
                        className="bg-muted/30 py-16 lg:py-24"
                    >
                        <Wrapper>
                            <div className="mb-12 text-center lg:mb-16">
                                <Badge variant="secondary" className="mb-4">
                                    Gallery
                                </Badge>
                                <h2 className="text-3xl font-bold text-balance text-foreground lg:text-4xl">
                                    See Our Gates in Action
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                                    Real installations showcasing the
                                    versatility and beauty of our security
                                    solutions.
                                </p>
                            </div>

                            <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[200px] md:grid-cols-4">
                                <div className="group col-span-2 row-span-2 overflow-hidden rounded-2xl">
                                    <img
                                        src={gallery1}
                                        alt="Modern home entrance with black trellis gate"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="group col-span-1 row-span-1 overflow-hidden rounded-2xl">
                                    <img
                                        src={gallery2}
                                        alt="White trellis gate in residential setting"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="group col-span-1 row-span-1 overflow-hidden rounded-2xl">
                                    <img
                                        src={gallery3}
                                        alt="Bronze trellis gate detail"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="group col-span-1 row-span-1 overflow-hidden rounded-2xl">
                                    <img
                                        src={gallery4}
                                        alt="Commercial installation of trellis gates"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="group col-span-1 row-span-1 overflow-hidden rounded-2xl">
                                    <img
                                        src={gallery5}
                                        alt="Charcoal trellis gate close-up"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="group col-span-2 row-span-1 overflow-hidden rounded-2xl">
                                    <img
                                        src={gallery6}
                                        alt="Wide view of expandable trellis gate system"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="group col-span-2 row-span-1 overflow-hidden rounded-2xl">
                                    <img
                                        src={gallery7}
                                        alt="Professional gate installation process"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </Wrapper>
                    </section>

                    {/* Pricing Section */}
                    <section
                        id="pricing"
                        className="bg-background py-16 lg:py-24"
                    >
                        <Wrapper>
                            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                                <div>
                                    <Badge variant="secondary" className="mb-4">
                                        Pricing
                                    </Badge>
                                    <h2 className="text-3xl font-bold text-balance text-foreground lg:text-4xl">
                                        Transparent Pricing
                                    </h2>
                                    <p className="mt-4 mb-8 text-muted-foreground">
                                        All prices include FREE professional
                                        installation. Choose the size that fits
                                        your space.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    Free Installation
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Professional installation at
                                                    no extra cost
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    Quality Guarantee
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Premium aluminum with
                                                    lasting durability
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    Custom Sizes Available
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Contact us for non-standard
                                                    dimensions
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Card className="overflow-hidden py-0">
                                    <CardContent className="p-0">
                                        <div className="bg-secondary px-6 py-4">
                                            <h3 className="font-semibold text-secondary-foreground">
                                                Size & Pricing Guide
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Standard 2100mm height
                                            </p>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="hover:bg-transparent">
                                                    <TableHead className="font-semibold text-foreground">
                                                        Size (Width x Drop)
                                                    </TableHead>
                                                    <TableHead className="text-right font-semibold text-foreground">
                                                        Price
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {trellises.map(
                                                    (item, index) => (
                                                        <TableRow
                                                            key={item.id}
                                                            className={`${index % 2 === 0 ? 'bg-muted/50' : ''}`}
                                                        >
                                                            <TableCell className="font-medium text-muted-foreground">
                                                                {item.width}mm x{' '}
                                                                {item.drop}mm
                                                            </TableCell>
                                                            <TableCell className="text-right font-semibold text-foreground">
                                                                R{' '}
                                                                {new Intl.NumberFormat(
                                                                    'en-ZA',
                                                                ).format(
                                                                    item.price,
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        </Wrapper>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-primary py-16 text-primary-foreground lg:py-24">
                        <Wrapper>
                            <div className="grid items-center gap-12 lg:grid-cols-2">
                                <div>
                                    <Badge className="mb-4 border-white/20 bg-white/10 text-white">
                                        Get Started Today
                                    </Badge>
                                    <h2 className="text-3xl font-bold text-balance text-primary-foreground lg:text-4xl">
                                        Protect Your Property in Style
                                    </h2>
                                    <p className="mt-4 text-lg text-primary-foreground/80">
                                        Don't settle for just any security gate.
                                        Choose our trellis security gates for
                                        the perfect combination of protection
                                        and elegance.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <Button
                                            size="lg"
                                            asChild
                                            variant={'secondary'}
                                        >
                                            <Link href={quote.url()}>
                                                Contact Us Today
                                            </Link>
                                        </Button>
                                        <Button
                                            size="lg"
                                            asChild
                                            variant="outline"
                                            className="bg-background/25"
                                        >
                                            <Link href={quote.url()}>
                                                Call Now
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:h-[400px]">
                                    <img
                                        src={ctaImage}
                                        alt="Beautiful home protected by Crystal Bars trellis gate"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-[0] bg-[linear-gradient(to_right,rgba(0,0,0,0.5),transparent)]" />
                                </div>
                            </div>
                        </Wrapper>
                    </section>
                </main>
            </div>
        </FrontendLayout>
    );
}
