import { Mail, MessageCircle, Phone, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { quote } from '@/routes';

export default function FrontendNoticeBar() {
    const telDisplay = '079 491 2812';
    const telHref = 'tel:0794912812';

    const waDisplay = '072 755 4303';
    // South Africa country code (+27) with leading 0 removed for wa.me format
    const waE164 = '27727554303';
    const waHref = `https://wa.me/${waE164}`;

    const email = 'info@crystalbars.co.za';
    const mailHref = `mailto:${email}`;

    return (
        <div className="sticky top-0 z-20 w-full border-b border-sidebar-border/70 bg-primary h-10 flex items-center text-white ">
            <div className="mx-auto flex w-full items-center justify-center px-4 md:max-w-7xl">
                <div className="inline-flex items-center gap-3 px-3 py-1.5 text-xs text-white font-semibold">
                    <a href={telHref} className="group inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity" aria-label={`Call ${telDisplay}`}>
                        <Phone className="size-5 opacity-80 group-hover:opacity-100" />
                        <span>{telDisplay}</span>
                    </a>
                    <span className="h-3 w-px bg-white/30" aria-hidden />
                    <a href={waHref} target="_blank" rel="noopener" className="group inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity" aria-label={`WhatsApp ${waDisplay}`}>
                        <MessageCircle className="size-5 opacity-80 group-hover:opacity-100" />
                        <span>{waDisplay}</span>
                    </a>
                    <span className="h-3 w-px bg-white/30" aria-hidden />
                    <a href={mailHref} className="group inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity" aria-label={`Email ${email}`}>
                        <Mail className="size-5 opacity-80 group-hover:opacity-100" />
                        <span>{email}</span>
                    </a>

                </div>
            </div>
        </div>
    );
}
