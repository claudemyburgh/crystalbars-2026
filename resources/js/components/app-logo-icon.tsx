
import Logo from '@/../images/logo.png'
import { cn } from '@/lib/utils';

interface AppLogoIconProps {
    className?: string;
    [key: string]: any;
}

export default function AppLogoIcon({ className, ...props }: AppLogoIconProps) {
    return (
        <img className={cn('', className)} src={Logo} alt="Crystalbars" {...props} />
    );
}
