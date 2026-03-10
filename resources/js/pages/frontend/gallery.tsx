import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
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
    const [filter, setFilter] = useState<'all' | 'crystal-bars' | 'trellis-gates'>('all');
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    const filteredImages = images.filter((img) => filter === 'all' || img.group === filter);

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
            <Head title="Gallery" />
            <Wrapper className="py-12">
                <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
                <p className="mt-2 text-muted-foreground">
                    Browse our latest projects and installations of Crystal Bars and Trellis Gates.
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
                                onClick={() => setSelectedImage(image)}
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
                <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                    <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:bg-black/50 [&>button]:rounded-full [&>button]:p-2 [&>button]:border-[1px] [&>button]:border-white/20">
                        <DialogTitle className="sr-only">Image View</DialogTitle>
                        <DialogDescription className="sr-only">Viewing full size image</DialogDescription>
                        {selectedImage && (
                            <div className="relative flex h-full max-h-[90vh] w-full items-center justify-center p-2">
                                <img
                                    src={selectedImage.url || selectedImage.original}
                                    alt={selectedImage.name}
                                    className="max-h-[85vh] w-auto max-w-full rounded-md object-contain shadow-2xl"
                                />
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </Wrapper>
        </FrontendLayout>
    );
}
