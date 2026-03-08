import { Link } from '@inertiajs/react';
import { HelpCircle, Image as ImageIcon, Shield } from 'lucide-react';
import { BenefitCard } from '@/components/frontend/benefit-card';
import Wrapper from '@/components/frontend/wrapper';
import { gallery, faqs } from '@/routes';
import trellis from '@/routes/trellis';

const links = [
    {
        href: () => trellis.gates.url(),
        icon: Shield,
        title: 'Trellis Gates',
        description: 'Strong, smooth, and built to last.',
    },
    {
        href: () => gallery.url(),
        icon: ImageIcon,
        title: 'Gallery',
        description: 'See recent installations.',
    },
    {
        href: () => faqs.url(),
        icon: HelpCircle,
        title: 'FAQs',
        description: 'Common questions answered.',
    },
];

export function QuickLinks() {
    return (
        <section className="bg-background py-12">
            <Wrapper>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {links.map((link) => (
                        <Link key={link.title} href={link.href()} className="block">
                            <BenefitCard icon={link.icon} title={link.title} description={link.description} />
                        </Link>
                    ))}
                </div>
            </Wrapper>
        </section>
    );
}
