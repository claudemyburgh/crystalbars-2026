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
        name: 'Michelle van der Berg',
        username: 'Tableview, Cape Town',
        body: 'Absolutely love my new crystal bars! They look so modern and you can barely tell they\'re there. Installed in one morning, very neat workmanship.',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=MvdB&backgroundColor=0ea5e9',
        rating: 5,
    },
    {
        name: 'Pieter Botha',
        username: 'Bellville, Cape Town',
        body: 'The trellis gate is exactly what I was looking for — solid aluminium, smooth slam lock, and free installation. Highly recommend Crystal Bars.',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=PB&backgroundColor=6366f1',
        rating: 5,
    },
    {
        name: 'Samantha Naidoo',
        username: 'Durbanville, Cape Town',
        body: 'We were worried bars would block the garden view. These polycarbonate bars are crystal clear — you forget they\'re even there. 10/10.',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=SN&backgroundColor=f59e0b',
        rating: 5,
    },
    {
        name: 'Deon Fourie',
        username: 'Somerset West',
        body: 'Quick quote, quick install. The team was professional and the bars look amazing on my newly renovated house. No more ugly steel bars!',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=DF&backgroundColor=10b981',
        rating: 5,
    },
    {
        name: 'Yusra Adams',
        username: 'Paarl',
        body: 'Very happy with the service and product. The bars won\'t rust which is great for the coastal climate. Fair pricing and great communication throughout.',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=YA&backgroundColor=ec4899',
        rating: 5,
    },
    {
        name: 'Gavin Steyn',
        username: 'Milnerton, Cape Town',
        body: 'I replaced my old steel burglar bars with these and the difference is night and day. Natural light floods in and the UV guarantee gives real peace of mind.',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=GS&backgroundColor=8b5cf6',
        rating: 5,
    },
    {
        name: 'Anette du Plessis',
        username: 'Strand',
        body: 'Couldn\'t be happier. The installer was on time, tidy, and explained everything. The bars are strong — my husband tested them himself!',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=AdP&backgroundColor=f97316',
        rating: 5,
    },
    {
        name: 'Tariq Hendricks',
        username: 'Stellenbosch',
        body: 'Went with the trellis gate for the front door. Very heavy-duty and the slam lock is reassuring. Quoted and installed within a week.',
        profile: 'https://api.dicebear.com/9.x/initials/svg?seed=TH&backgroundColor=14b8a6',
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
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
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
