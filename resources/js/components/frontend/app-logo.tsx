import { useAppearance } from '@/hooks/use-appearance';
import logoDark from '../../../images/logo-dark.png';
import logoLight from '../../../images/logo-light.png';

export default function AppLogo() {
    const { resolvedAppearance } = useAppearance();
    return (
        <div className={`relative`}>
            <div
                aria-hidden={true}
                className={`absolute -left-1 -top-1 size-18 rounded-full bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/90 lg:size-26 lg:-left-2 lg:-top-2`}
            ></div>

            <img
                className={'relative z-50 h-16 lg:h-22'}
                src={resolvedAppearance === 'dark' ? logoDark : logoLight}
                alt={'Crystal bars'}
            />
        </div>
    );
}
