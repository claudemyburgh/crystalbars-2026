import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import OwnerCTA from '@/components/frontend/owner-cta';

export default function GalleryPage() {
    const placeholders = Array.from({ length: 9 }).map((_, i) => i);
    return (
        <FrontendLayout>
            <Head title="Gallery" />
            <section className="mx-auto w-full max-w-7xl px-4 py-12">
                <h1 className="text-2xl font-semibold">Gallery</h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                    Browse our latest projects and installations.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {placeholders.map((i) => (
                        <div
                            key={i}
                            className="aspect-video w-full overflow-hidden rounded-lg border border-sidebar-border/60 bg-neutral-100 dark:bg-neutral-800"
                        />
                    ))}
                </div>
            </section>

            <OwnerCTA />
        </FrontendLayout>
    );
}
