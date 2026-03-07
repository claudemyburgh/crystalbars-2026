import { Card } from '@/components/ui/card';
import Gallery1 from '@/../images/examples/WhatsApp Image 2022-11-19 at 17.38.30.jpg';
import Gallery2 from '@/../images/examples/WhatsApp Image 2022-11-19 at 17.38.31.jpg';
import Gallery3 from '@/../images/examples/WhatsApp Image 2022-11-19 at 17.38.32.jpg';
import Gallery4 from '@/../images/examples/75279256_2426432367595402_7017356600314691584_n.jpg';

const Gallery = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* LEFT – Large card */}
                    <Card className="group relative overflow-hidden rounded-2xl border-none p-0 after:absolute after:h-full after:w-full after:bg-linear-to-b after:from-transparent after:from-60% after:to-gray-950">
                        <img
                            src={Gallery1}
                            alt="Crystal Clear Burglar Bars"
                            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-120"
                        />
                        <div className="absolute bottom-0 z-10 flex flex-col gap-1 ps-4 pb-4">
                            <h3 className="text-xl font-semibold text-white">
                                Crystal Clear Security
                            </h3>
                            <p className="text-sm text-white/80">
                                Transparent polycarbonate burglar bars
                            </p>
                        </div>
                    </Card>

                    {/* RIGHT SIDE */}
                    <div className="grid grid-rows-2 gap-4">
                        {/* Top wide card */}
                        <Card className="group relative overflow-hidden rounded-2xl border-none p-0 after:absolute after:h-full after:w-full after:bg-linear-to-b after:from-transparent after:from-40% after:to-gray-950">
                            <img
                                src={Gallery2}
                                alt="Trellis Gates"
                                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48"
                            />

                            <div className="absolute bottom-0 z-10 flex flex-col gap-1 ps-4 pb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Trellis Gates
                                </h3>
                                <p className="text-sm text-white/80">
                                    Custom-made security gates
                                </p>
                            </div>
                        </Card>

                        {/* Bottom two cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="group relative overflow-hidden rounded-2xl border-none p-0 after:absolute after:h-full after:w-full after:bg-linear-to-b after:from-transparent after:from-40% after:to-gray-950">
                                <img
                                    src={Gallery3}
                                    alt="Security Doors"
                                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48"
                                />

                                <div className="absolute bottom-0 z-10 flex flex-col gap-1 ps-3 pb-3">
                                    <h3 className="text-base font-semibold text-white">
                                        Security Doors
                                    </h3>
                                    <p className="text-xs text-white/80">
                                        Steel security doors
                                    </p>
                                </div>
                            </Card>

                            <Card className="group relative overflow-hidden rounded-2xl border-none p-0 after:absolute after:h-full after:w-full after:bg-linear-to-b after:from-transparent after:from-40% after:to-gray-950">
                                <img
                                    src={Gallery4}
                                    alt="Window Security"
                                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48"
                                />

                                <div className="absolute bottom-0 z-10 flex flex-col gap-1 ps-3 pb-3">
                                    <h3 className="text-base font-semibold text-white">
                                        Window Security
                                    </h3>
                                    <p className="text-xs text-white/80">
                                        Window burglar bars
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Gallery;
