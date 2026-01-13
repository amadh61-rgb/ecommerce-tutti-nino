import React from 'react';
import { CreditCard, Truck, Percent, Lock } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export default function InfoStrip() {
    const { t } = useI18n();

    const items = [
        {
            icon: <CreditCard className="w-8 h-8 text-pink-500" />,
            title: t('infoStrip.creditCard'),
            subtitle: t('infoStrip.installments')
        },
        {
            icon: <Truck className="w-8 h-8 text-pink-500" />,
            title: t('infoStrip.freeShipping'),
            subtitle: t('infoStrip.allBrazil')
        },
        {
            icon: <Percent className="w-8 h-8 text-pink-500" />,
            title: t('infoStrip.discount'),
            subtitle: t('infoStrip.boleto')
        },
        {
            icon: <Lock className="w-8 h-8 text-pink-500" />,
            title: t('infoStrip.secure'),
            subtitle: t('infoStrip.certified')
        }
    ];

    return (
        <section className="bg-pink-50 py-8 border-b border-pink-200">
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {items.map((item, index) => (
                        <div key={index} className="min-w-[45vw] sm:min-w-[auto] snap-center flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 hover:transform md:hover:scale-105 transition-transform duration-300 bg-white/50 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border border-pink-100 md:border-none text-center md:text-left">
                            <div className="p-2 border border-pink-200 rounded-lg bg-white shadow-sm shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-slate-700 font-bold text-xs md:text-sm lg:text-base leading-tight mb-1 md:mb-0">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-[10px] md:text-xs lg:text-sm leading-tight">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
