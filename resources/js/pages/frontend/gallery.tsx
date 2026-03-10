import { Head } from '@inertiajs/react';
import FsLightbox from 'fslightbox-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Wrapper from '@/components/frontend/wrapper';
import FrontendLayout from '@/layouts/frontend-layout';

type Image = {
    id: number;
    group: string;
    url: string;
    thumbnail: string;
    original: string;
    name: string;
    order: number;
};

export default function GalleryPage({ images = [] }: { images: Image[] }) {
    const [filter, setFilter] = useState<
        'all' | 'crystal-bars' | 'trellis-gates'
    >('all');
    const [toggler, setToggler] = useState(false);
    const [slideIndex, setSlideIndex] = useState(1);

    const filteredImages = images.filter(
        (img) => filter === 'all' || img.group === filter,
    );

    // Simple pattern for bento grid alternating spans
    const getBentoClasses = (index: number) => {
        const pattern = [
            'col-span-1 row-span-1',
            'col-span-1 row-span-1 sm:col-span-2 sm:row-span-2',
            'col-span-1 row-span-1',
            'col-span-1 row-span-1',
            'col-span-1 row-span-1 sm:col-span-2',
            'col-span-1 row-span-1',
        ];
        return pattern[index % pattern.length];
    };

    return (
        <FrontendLayout>
            <Head title="Gallery">
                <meta
                    name="description"
                    content="Browse our gallery of Crystal Bars and trellis gate installations across Cape Town, South Africa."
                />
                <meta property="og:title" content="Crystal Bars | Gallery" />
                <meta
                    property="og:description"
                    content="View our portfolio of transparent polycarbonate burglar bars and trellis security gate installations."
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
                <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
                <p className="mt-2 text-muted-foreground">
                    Browse our latest projects and installations of Crystal Bars
                    and Trellis Gates.
                </p>

                {/* Filters */}
                <div className="mt-8 flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            filter === 'all'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('crystal-bars')}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            filter === 'crystal-bars'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                        }`}
                    >
                        Crystal Bars
                    </button>
                    <button
                        onClick={() => setFilter('trellis-gates')}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            filter === 'trellis-gates'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                        }`}
                    >
                        Trellis Gates
                    </button>
                </div>

                {/* Bento Grid Gallery */}
                <motion.div
                    layout
                    className="mt-8 grid auto-rows-[250px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    <AnimatePresence>
                        {filteredImages.map((image, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={image.id}
                                onClick={() => {
                                    setSlideIndex(index + 1);
                                    setToggler(!toggler);
                                }}
                                className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-muted/30 shadow-sm transition-all hover:shadow-md ${getBentoClasses(index)}`}
                            >
                                <img
                                    src={image.thumbnail || image.url}
                                    alt={image.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredImages.length === 0 && (
                        <div className="col-span-full py-20 text-center text-muted-foreground">
                            No images found.
                        </div>
                    )}
                </motion.div>

                {/* Lightbox */}
                <FsLightbox
                    toggler={toggler}
                    sources={filteredImages.map((img) => img.url || img.original)}
                    slide={slideIndex}
                    type="image"
                />
            </Wrapper>
        </FrontendLayout>
    );
}
