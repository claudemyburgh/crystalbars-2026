import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface WrapperProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    children: ReactNode;
}

export default function Wrapper({
    className,
    children,
    as: Component = 'div',
    ...props
}: WrapperProps) {
    return (
        <Component
            className={cn('mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8', className)}
            {...props}
        >
            {children}
        </Component>
    );
}
