import { cn } from '@/lib/utils';

export default function BarsComponent({
    className,
}: {
    className?: string;
}) {
    return (
        <div
            aria-hidden={true}
            className={cn(
                'pointer-events-none absolute inset-0 flex flex-col justify-evenly py-12',
                className,
            )}
        >
            <div className="block h-20 w-full border-y-2 border-white/20 bg-transparent shadow-lg backdrop-blur-sm"></div>
            <div className="block h-20 w-full border-y-2 border-white/20 bg-transparent shadow-lg backdrop-blur-sm"></div>
            <div className="block h-20 w-full border-y-2 border-white/20 bg-transparent shadow-lg backdrop-blur-sm"></div>
        </div>
    );
}
