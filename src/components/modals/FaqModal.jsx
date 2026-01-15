import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useI18n } from '../../hooks/useI18n';
import { legalContent } from '../../data/legalData';
import { ChevronDown } from 'lucide-react';

export default function FaqModal() {
    const { t } = useI18n();

    return (
        <div className="p-8 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('modals.faq.title')}</h2>
            <div className="space-y-3 text-slate-600 leading-relaxed">
                {legalContent.faq.map((item, idx) => (
                    <details key={idx} className="group bg-slate-50 rounded-xl p-4 cursor-pointer border border-transparent hover:border-pink-100 transition-colors">
                        <summary className="font-bold text-slate-800 flex items-center justify-between list-none select-none">
                            <span>{item.question}</span>
                            <ChevronDown className="w-4 h-4 text-rose-900 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="mt-3 text-slate-600 pl-4 border-l-2 border-pink-200 animate-fade-in">
                            <p>{item.answer}</p>
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}
