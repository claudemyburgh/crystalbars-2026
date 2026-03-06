import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HomeHero from '@/components/frontend/home-hero';
import { Shield, Image as ImageIcon, HelpCircle, Star } from 'lucide-react';
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


            {/* Trust bar: logos + testimonials */}
            <section className="mx-auto w-full max-w-7xl px-4 pb-16">
                {/* Logo strip */}
                <div className="mb-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="flex h-12 items-center justify-center rounded-md border border-sidebar-border/60 bg-background/60 text-xs text-muted-foreground"
                        >
                            Logo {i}
                        </div>
                    ))}
                </div>

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
