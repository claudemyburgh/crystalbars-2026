import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';

import { Button } from '@/components/ui/button';
import { quote } from '@/routes';

// Import images
import gateImage from '../../../images/gate.jpg';
import barsImage from '../../../images/bars.png';
import gateLong from '../../../images/examples/WhatsApp Image 2022-11-19 at 17.39.35.jpg';
import Wrapper from '@/components/frontend/wrapper';


export default function TrellisGatesPage() {

    return (
        <FrontendLayout>
            <Head title="Trellis Gates" />

            <Wrapper className=" grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Bento Box 1: Hero Section - Introduction + Image */}
                <div className="col-span-full flex flex-col justify-between rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:col-span-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Trellis Security Gate
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Introducing our top-of-the-line trellis security gates!
                        These gates are the perfect combination of style and
                        security for your home or business.
                    </p>
                    <div className="mt-6">
                        <Button asChild size="lg">
                            <Link href={quote.url()}>Get a quote</Link>
                        </Button>
                    </div>
                    <img
                        src={gateImage}
                        alt="Trellis Security Gate"
                        className="mt-8 h-64 w-full rounded-lg object-cover"
                    />
                </div>
                {/* Bento Box 2: Key Features */}
                <div className="relative isolate col-span-full flex flex-col justify-between overflow-hidden rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:col-span-1">
                    <img
                        aria-hidden={true}
                        src={gateLong}
                        alt="Gate bars"
                        className="absolute inset-0 object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-linear-to-tr from-primary backdrop-blur-xs to-transparent"></div>
                    <h2 className="text-2xl relative z-2 font-semibold tracking-tight text-white text-shadow-md text-shadow-black/75">
                        Durable & Secure
                    </h2>
                    <p className="mt-4 relative z-2 text-white text-shadow-md text-shadow-black/75">
                        Our gates are made from durable aluminium and feature a
                        sturdy top rail and bottom track for maximum strength.
                        The stainless steel slam lock provides added security,
                        ensuring that your property is protected at all times.
                    </p>
                </div>
                {/* Bento Box 3: Expandable Features */}
                <div className="col-span-full rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:col-span-1">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Expandable Design
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Our trellis security gates are also expandable, allowing
                        you to adjust the width of the gate to fit your specific
                        needs. These gates can be used as trellis gates, folding
                        security gates, sliding security gates, retractable
                        security gates, and slam lock security gates.
                    </p>
                </div>
                {/* Bento Box 4: Free Installation */}
                <div className="col-span-full rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:col-span-1">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        FREE Installation
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        <strong>FREE installation</strong> with your purchase of
                        the Aluminum Trellis Security Gate. The gate is
                        available in four stunning color variations.
                    </p>
                </div>
                {/* Bento Box 5: Available Colors */}
                <div className="col-span-full rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:col-span-1 lg:col-span-1">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Available Colors
                    </h2>
                    <ul className="mt-4 list-inside list-disc text-muted-foreground">
                        <li>White</li>
                        <li>Bronze</li>
                        <li>Charcoal</li>
                        <li>Black</li>
                    </ul>
                </div>
                {/* Bento Box 6: Sizes & Pricing Table */}
                <div className="col-span-full overflow-x-auto rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:col-span-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Sizes & Pricing
                    </h2>
                    <table className="mt-4 w-full text-left text-muted-foreground">
                        <thead>
                            <tr className="border-b border-sidebar-border">
                                <th className="px-4 py-2 font-semibold">
                                    Size
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-sidebar-border">
                                <td className="px-4 py-2">900mm x 2100mm</td>
                                <td className="px-4 py-2">R 3,800</td>
                            </tr>
                            <tr className="border-b border-sidebar-border">
                                <td className="px-4 py-2">1200mm x 2100mm</td>
                                <td className="px-4 py-2">R 4,800</td>
                            </tr>
                            <tr className="border-b border-sidebar-border">
                                <td className="px-4 py-2">1500mm x 2100mm</td>
                                <td className="px-4 py-2">R 5,400</td>
                            </tr>
                            <tr className="border-b border-sidebar-border">
                                <td className="px-4 py-2">1800mm x 2100mm</td>
                                <td className="px-4 py-2">R 5,900</td>
                            </tr>
                            <tr className="border-b border-sidebar-border">
                                <td className="px-4 py-2">2200mm x 2100mm</td>
                                <td className="px-4 py-2">R 6,700</td>
                            </tr>
                            <tr className="border-b border-sidebar-border">
                                <td className="px-4 py-2">2500mm x 2100mm</td>
                                <td className="px-4 py-2">R 7,560</td>
                            </tr>
                            <tr className="border-b border-sidebar-border">
                                <td className="px-4 py-2">2700mm x 2100mm</td>
                                <td className="px-4 py-2">R 8,400</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">3000mm x 2100mm</td>
                                <td className="px-4 py-2">R 9,400</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="relative col-span-full overflow-hidden rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:col-span-1 lg:col-span-1">
                    <img
                        src={gateLong}
                        alt="trellis"
                        className={`absolute inset-0`}
                    />
                </div>
                {/* Bento Box 7: Final Call to Action */}
                <div className="col-span-full rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                        Don't settle for just any security gate.
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Choose our trellis security gates for the best of both
                        worlds. Contact us today to learn more and to place your
                        order for your very own expandable, retractable, and
                        slam lock security gates.
                    </p>
                    <div className="mt-6">
                        <Button asChild size="lg">
                            <Link href={quote.url()}>
                                Get a personalized quote
                            </Link>
                        </Button>
                    </div>
                </div>
            </Wrapper>
        </FrontendLayout>
    );
}
