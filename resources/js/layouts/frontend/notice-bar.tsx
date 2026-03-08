import { Mail, MessageCircle, Phone, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { quote } from '@/routes';
import Wrapper from '@/components/frontend/wrapper';

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
            <Wrapper className="flex  items-center justify-center ">
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
                    <span className="h-3 w-px bg-white/30" aria-hidden />
                    <a
                        href="https://www.facebook.com/www.crystalbars.co.za"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                        aria-label="Follow Crystal Bars on Facebook"
                    >
                        <svg className="size-5 opacity-80 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                        </svg>
                        <span>Facebook</span>
                    </a>

                </div>
            </Wrapper>
        </div>
    );
}
