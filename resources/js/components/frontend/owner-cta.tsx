import { Link } from '@inertiajs/react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import BG from '@/../images/examples/10489802_1474159762822672_9219813355605679489_n.jpg';
import HendryImage from '@/../images/hendry.jpg';
import { Button } from '@/components/ui/button';
import { quote } from '@/routes';
import Wrapper from '@/components/frontend/wrapper';
import { ShineBorder } from '../ui/shine-border';

export default function OwnerCTA() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-primary/20 via-primary/10 to-background py-16">
            {/* Blurry background image */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 size-96 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -right-20 -bottom-20 size-96 rounded-full bg-primary/30 blur-3xl" />
                <img
                    aria-hidden={true}
                    src={BG}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <Wrapper>
                <div className="grid grid-cols-1 items-center gap-12 rounded-3xl border bg-background/90 p-8 shadow-2xl backdrop-blur md:grid-cols-2">
                    {/* Big square profile image */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="relative mb-6">
                            <div className="relative overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl">
                                <ShineBorder
                                    borderWidth={4}
                                    duration={15}
                                    shineColor={[
                                        '#A07CFE',
                                        '#25A4DFFF',
                                        '#FFBE7B',
                                    ]}
                                />

                                <img
                                    src={HendryImage}
                                    alt="Hendry Ollewagen - Owner"
                                    className="h-80 w-80 object-cover md:h-96 md:w-96"
                                />
                            </div>
                            <div className="absolute -right-3 -bottom-3 rounded-full bg-green-500 p-2 shadow-lg">
                                <div className="size-3 rounded-full bg-green-500" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">
                            Hendry Ollewagen
                        </h2>
                        <p className="text-lg font-semibold text-primary">
                            Owner & Founder
                        </p>
                        <p className="mt-3 max-w-sm text-muted-foreground">
                            Get in touch directly for a personalized quote or
                            any questions about our products and services.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                        <div className="rounded-2xl border bg-linear-to-br from-primary/10 to-primary/5 p-6">
                            <h3 className="mb-4 text-lg font-bold">
                                Contact Direct
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href="tel:+27794912812"
                                    className="flex items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-background px-4 py-4 font-medium transition-all hover:border-primary/30 hover:shadow-lg"
                                >
                                    <Phone className="size-6 text-primary" />
                                    <span className="text-lg">
                                        079 491 2812
                                    </span>
                                </a>
                                <a
                                    href="https://wa.me/27727554303"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-background px-4 py-4 font-medium transition-all hover:border-green-500/30 hover:shadow-lg"
                                >
                                    <MessageCircle className="size-6 text-green-500" />
                                    <span className="text-lg">
                                        072 755 4303
                                    </span>
                                </a>
                                <a
                                    href="mailto:hendry@crystalbars.co.za"
                                    className="flex items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-background px-4 py-4 font-medium transition-all hover:border-primary/30 hover:shadow-lg"
                                >
                                    <Mail className="size-6 text-primary" />
                                    <span className="truncate text-lg">
                                        hendry@crystalbars.co.za
                                    </span>
                                </a>
                            </div>
                        </div>
                        <Button
                            asChild
                            size="lg"
                            className="w-full py-6 text-lg"
                        >
                            <Link href={quote.url()}>Request a Free Quote</Link>
                        </Button>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
}
