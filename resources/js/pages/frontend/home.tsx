import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HomeHero from '@/components/frontend/home-hero';
import { Shield, Image as ImageIcon, HelpCircle, Star, CheckCircle2 } from 'lucide-react';
import { gallery, faqs, quote } from '@/routes';
import trellis from '@/routes/trellis';

export default function HomePage() {
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



            {/* Sales Pitch */}
            <section aria-labelledby="sales-pitch-title" className="mx-auto w-full my-18 max-w-7xl px-4 pb-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <h2 id="sales-pitch-title" className="text-3xl font-black tracking-tight md:text-4xl">
                            Crystal	clear security for modern homes
                        </h2>
                        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                            Transparent polycarbonate burglar bars that keep your view and elevate safety.
                        </p>
                        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />A-grade 6 mm UV-protected polycarbonate (engineered for impact and clarity)</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />Crystal	clear sightlines with clean, low-profile installs</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />~7 day lead time, 10-year UV guarantee, 1-year workmanship</li>
                        </ul>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Button asChild size="lg">
                                <Link href={quote.url()}>Get a Free Quote</Link>
                            </Button>
                            <Link href={trellis.gates.url()} className="text-sm text-primary underline-offset-4 hover:underline">
                                Looking for trellis gates?
                            </Link>
                        </div>
                    </div>
                    <Card className="h-full self-start">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Shield className="size-5" /> Why homeowners switch</CardTitle>
                            <CardDescription>Security without the prison-bar look.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            <div>Crystal	clear sightlines, natural light, and strong impact resistance.</div>
                            <div>Rust-free, low-maintenance materials that last.</div>
                            <div>Local team, friendly service, professional fitment.</div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Trust bar: logos + testimonials */}
            <section className="mx-auto w-full max-w-7xl px-4 pb-16">
                                {/* Testimonials */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                        {
                            quote:
                                'Exceptional build quality and very professional team. Installation was quick and neat.',
                            author: 'Mandla K.',
                        },
                        {
                            quote:
                                'Great service from start to finish. The trellis gates glide smoothly and feel solid.',
                            author: 'Bianca S.',
                        },
                        {
                            quote: 'Highly recommend Crystal Bars — reliable, friendly, and quality workmanship.',
                            author: 'Riaan V.',
                        },
                    ].map((t, idx) => (
                        <Card key={idx}>
                            <CardHeader>
                                <div className="flex items-center gap-1 text-amber-500">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="size-4 fill-current" />
                                    ))}
                                </div>
                                <CardTitle className="sr-only">Testimonial</CardTitle>
                                <CardDescription className="sr-only">Five star review</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-foreground">“{t.quote}”</p>
                                <p className="mt-3 text-xs text-muted-foreground">— {t.author}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>


            {/* Quick links */}
            <section className="mx-auto w-full max-w-7xl px-4 pb-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Link href={trellis.gates.url()} className="group">
                        <Card className="h-full transition-colors group-hover:bg-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="size-5" />
                                    Trellis Gates
                                </CardTitle>
                                <CardDescription>Strong, smooth, and built to last.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">Explore our range of customizable trellis solutions.</div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href={gallery.url()} className="group">
                        <Card className="h-full transition-colors group-hover:bg-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="size-5" />
                                    Gallery
                                </CardTitle>
                                <CardDescription>See recent installations and projects.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">Browse photos for inspiration and ideas.</div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href={faqs.url()} className="group">
                        <Card className="h-full transition-colors group-hover:bg-accent/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="size-5" />
                                    FAQs
                                </CardTitle>
                                <CardDescription>Common questions answered.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">Learn about materials, lead times, and more.</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </section>
        </FrontendLayout>
    );
}
