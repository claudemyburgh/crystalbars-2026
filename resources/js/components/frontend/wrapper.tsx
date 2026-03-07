import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';



export default function Wrapper({
    className,
    children,
    ...props
}: ComponentProps<any>) {
    return (
        <div
            className={cn('mx-auto w-full max-w-7xl px-4', className)}
            {...props}
        >
            {children}
        </div>
    );
}
