import React from 'react';
import { ArrowRight, Heart, Star } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

function Hero({ setSelectedCategory }) {
    const { t } = useI18n();
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-pink-500 via-pink-200 to-pink-50 text-white">
            {/* Blobs de fundo - Forçados LTR para evitar inversão estranha */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10" dir="ltr">
                <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-24 hero-mobile-compact">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
                    <div className="lg:w-1/2 space-y-4 lg:space-y-6 text-center lg:text-left">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide mb-1 lg:mb-2 animate-bounce-in backdrop-blur-sm">
                            {t('hero.badge')}
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight hero-title-mobile">
                            {t('hero.title')}
                        </h1>
                        <p className="text-base lg:text-lg text-white/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {t('hero.subtitle')}
                        </p>

                    </div>

                    <div className="lg:w-1/2 relative group">
                        <div className="relative z-10 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white/50 shadow-xl transition-transform duration-700 group-hover:rotate-1">
                            <img
                                src="/hero-banner.png"
                                alt="Papelaria Hero"
                                className="rounded-2xl w-full h-auto object-cover shadow-sm"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default React.memo(Hero);
