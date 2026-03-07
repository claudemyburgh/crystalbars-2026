import { Link } from '@inertiajs/react';
import {  Shield, Eye, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Highlighter } from '@/components/ui/highlighter';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { gallery, quote } from '@/routes';
import BarsComponent from '@/components/frontend/bars-component';

export default function HomeHero() {
    // Mount + reduced motion handling for subtle entrance animations and media preferences
    const [mounted, setMounted] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
    );

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
        const onChange = () => setReduceMotion(!!mq?.matches);
        mq?.addEventListener?.('change', onChange);
        return () => {
            clearTimeout(t);
            mq?.removeEventListener?.('change', onChange);
        };
    }, []);

    // Media
    const videoSrc = new URL('../../../videos/file.mp4', import.meta.url).href;
    const posterSrc = new URL('../../../images/file.jpg', import.meta.url).href;

    return (
        <section
            aria-labelledby="home-hero-title"
            className="relative isolate min-h-[70vh] overflow-hidden md:min-h-[85vh]"
        >
            {/* Background media */}
            {reduceMotion ? (
                <div
                    aria-hidden
                    className="absolute inset-0 -z-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${posterSrc})` }}
                />
            ) : (
                <video
                    aria-hidden
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={posterSrc}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}

            {/* Readability overlays */}
            <div className="absolute inset-0 -z-10 bg-linear-to-b dark:from-black/80 dark:via-black/60 dark:to-black/70" />
            <div className="pointer-events-none absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black,black,transparent)]">
                <PlaceholderPattern className="h-full w-full stroke-white/10 opacity-40 mix-blend-soft-light dark:stroke-white/5" />
            </div>
            {/* Soft glows */}
            <div
                className="absolute -top-20 -left-24 -z-10 size-[32rem] rounded-full bg-primary/15 blur-3xl"
                aria-hidden
            />
            <div
                className="absolute right-[-6rem] bottom-[-6rem] -z-10 size-[22rem] rounded-full bg-primary/15 blur-3xl"
                aria-hidden
            />

            {/* Content */}
            <div className="relative z-50 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-28 md:grid-cols-3 md:py-40">
                {/* Lead copy */}
                <div
                    className={`max-w-4xl transition-all duration-200 ease-out md:col-span-2 ${
                        mounted && !reduceMotion
                            ? 'translate-y-0' + ' opacity-100'
                            : 'translate-y-2' + ' opacity-0'
                    }`}
                >
                    <h1
                        id="home-hero-title"
                        className="text-4xl font-black tracking-tight text-balance text-white text-shadow-2xs text-shadow-black/30 sm:text-5xl md:text-6xl"
                    >
                        Experience the{' '}
                        <Highlighter color={'#25a4df'} action={`highlight`}>
                            Best
                        </Highlighter>{' '}
                        in Home Security with Transparent{' '}
                        <Highlighter color={'goldenrod'} action={`highlight`}>
                            Polycarbonate
                        </Highlighter>{' '}
                        <Highlighter color={'#25a4df'} action={`highlight`}>
                            Burglar Bars
                        </Highlighter>
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-neutral-200/95 md:text-lg">
                        Keep your view, boost your security. Precision-measured,
                        locally installed, and built to last.
                    </p>

                    {/* Feature chips */}
                    <ul className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <li className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                            <Shield className="size-3.5" /> Secure + Durable
                        </li>
                        <li className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                            <Eye className="size-3.5" /> Clear Sightlines
                        </li>
                        <li className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                            <Timer className="size-3.5" /> ~2 Day Lead Time
                        </li>
                    </ul>

                    {/* Actions */}
                    <div
                        className="mt-7 flex flex-col items-start gap-3 sm:flex-row"
                        style={{
                            transitionDelay:
                                mounted && !reduceMotion ? '120ms' : '0ms',
                        }}
                    >
                        <Link href={quote.url()} className="shrink-0">
                            <RainbowButton
                                variant={'outline'}
                                className="h-11 rounded-md px-6 text-base font-semibold"
                            >
                                Get a Free Quote
                            </RainbowButton>
                        </Link>
                    </div>
                </div>

                {/* Highlight card */}
                <div className="relative isolate">
                    <div
                        className={
                            'relative max-w-xl justify-self-center rounded-2xl border border-white/15 bg-white p-5 text-foreground dark:bg-background ' +
                            ' shadow-xl' +
                            ' backdrop-blur' +
                            'transition-all duration-200 ease-out' +
                            (mounted && !reduceMotion
                                ? 'translate-y-0 opacity-100 delay-150'
                                : 'translate-y-3 opacity-0')
                        }
                    >
                        <div
                            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset"
                            aria-hidden
                        />
                        <div className="text-md mb-3 font-semibold text-foreground/80">
                            Why homeowners choose Crystal Bars
                        </div>
                        <ul className="space-y-2.5 text-sm text-foreground/90">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                                Engineered polycarbonate that resists impact,
                                yellowing, and UV damage.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                                Clean, near-invisible installation that
                                preserves natural light and views.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                                Local team, on-site measurement, and quick,
                                professional fitment.
                            </li>
                        </ul>
                    </div>
                    <div
                        className={
                            'absolute inset-0 -z-10 w-full max-w-xl origin-bottom-left translate-y-1 scale-95 rotate-1 justify-self-center rounded-2xl border' +
                            ' border-white/15' +
                            ' bg-white/80' +
                            ' p-5' +
                            ' text-foreground' +
                            ' dark:bg-background/90' +
                            ' shadow-xl' +
                            ' backdrop-blur' +
                            'transition-all duration-200 ease-out' +
                            (mounted && !reduceMotion
                                ? 'translate-y-0 opacity-100 delay-150'
                                : 'translate-y-3 opacity-0')
                        }
                    ></div>
                    <div
                        className={
                            'absolute inset-0 -z-12 w-full max-w-xl origin-bottom-left translate-y-2 scale-90 rotate-2 justify-self-center rounded-2xl' +
                            ' border border-white/15' +
                            ' bg-white/70' +
                            ' p-5' +
                            ' text-foreground' +
                            ' dark:bg-background/90' +
                            ' shadow-xl' +
                            ' backdrop-blur' +
                            'transition-all duration-200 ease-out' +
                            (mounted && !reduceMotion
                                ? 'translate-y-0 opacity-100 delay-150'
                                : 'translate-y-3 opacity-0')
                        }
                    ></div>
                </div>
            </div>
            <BarsComponent />
        </section>
    );
}
