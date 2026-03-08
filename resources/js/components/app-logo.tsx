import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center ">
                <AppLogoIcon className="size-8 " />
            </div>
            <div className="ml-0 grid flex-1 text-left text-lg">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Crystalbars
                </span>
            </div>
        </>
    );
}
