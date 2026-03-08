import type { LucideIcon } from 'lucide-react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

interface BenefitCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn('[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]')}
            />
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
                <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
