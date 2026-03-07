import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Marquee } from '@/components/shadcn-space/animations/marquee';
import { Star } from 'lucide-react';

type Review = {
    name: string;
    username: string;
    body: string;
    profile: string;
    rating: number;
};

const reviews: Review[] = [
    {
        name: 'Ken Masters',
        username: '@kmasters',
        body: 'Exceptional build quality and very professional team. Installation was quick and neat.',
        profile: 'https://images.shadcnspace.com/assets/profiles/rough.webp',
        rating: 5,
    },
    {
        name: 'Kira Athrun',
        username: '@kathrun',
        body: 'Great service from start to finish. The trellis gates glide smoothly and feel solid.',
        profile: 'https://images.shadcnspace.com/assets/profiles/albert.webp',
        rating: 5,
    },
    {
        name: 'Lirael Nassun',
        username: '@lnassun',
        body: 'Highly recommend Crystal Bars — reliable, friendly, and quality workmanship.',
        profile: 'https://images.shadcnspace.com/assets/profiles/linda.webp',
        rating: 5,
    },
    {
        name: 'Jessica',
        username: '@jessica',
        body: 'Switching to this platform streamlined our entire workflow. Setup was effortless, performance improved instantly.',
        profile: 'https://images.shadcnspace.com/assets/profiles/jessica.webp',
        rating: 5,
    },
    {
        name: 'Jenny',
        username: '@jenny',
        body: 'We evaluated multiple solutions, but this stood out immediately. Fast, scalable, and thoughtfully designed.',
        profile: 'https://images.shadcnspace.com/assets/profiles/jenny.webp',
        rating: 5,
    },
    {
        name: 'Kira Athrun',
        username: '@kathrun2',
        body: 'What surprised us most was how quickly our team adapted. Minimal learning curve and powerful features.',
        profile: 'https://images.shadcnspace.com/assets/profiles/albert.webp',
        rating: 5,
    },
    {
        name: 'Ken Masters',
        username: '@kmasters2',
        body: 'Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks.',
        profile: 'https://images.shadcnspace.com/assets/profiles/rough.webp',
        rating: 5,
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    profile,
    name,
    username,
    body,
    rating,
    onClick,
}: {
    profile: string;
    name: string;
    username: string;
    body: string;
    rating: number;
    onClick: () => void;
}) => {
    return (
        <Card
            className="relative h-full w-64 cursor-pointer overflow-hidden border-border bg-card p-4 shadow-none transition-transform hover:scale-105"
            onClick={onClick}
        >
            <CardContent className="flex flex-col gap-2 p-0">
                <div className="flex flex-row items-center gap-2">
                    <img
                        className="rounded-full"
                        width="32"
                        height="32"
                        alt=""
                        src={profile}
                    />
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-foreground">
                            {name}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground">
                            {username}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`size-3.5 ${i < rating ? 'fill-current' : ''}`}
                        />
                    ))}
                </div>
                <p className="line-clamp-2 text-sm text-foreground">{body}</p>
            </CardContent>
        </Card>
    );
};

export default function TestimonialMarqueeDemo() {
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    return (
        <>
            <Dialog
                open={!!selectedReview}
                onOpenChange={() => setSelectedReview(null)}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            {selectedReview && (
                                <img
                                    className="rounded-full"
                                    width="40"
                                    height="40"
                                    alt=""
                                    src={selectedReview.profile}
                                />
                            )}
                            {selectedReview?.name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`size-5 ${i < (selectedReview?.rating ?? 0) ? 'fill-current' : ''}`}
                            />
                        ))}
                    </div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {selectedReview?.body}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                        {selectedReview?.username}
                    </p>
                </DialogContent>
            </Dialog>

            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard
                            key={review.username}
                            {...review}
                            onClick={() => setSelectedReview(review)}
                        />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard
                            key={review.username}
                            {...review}
                            onClick={() => setSelectedReview(review)}
                        />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
        </>
    );
}
