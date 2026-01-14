import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useI18n } from '../../hooks/useI18n';
import { legalContent } from '../../data/legalData';
import { ChevronDown } from 'lucide-react';

export default function FaqModal() {
    const { closeModal } = useModal();
    const { t } = useI18n();

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('modals.faq.title')}</h2>
            <div className="max-h-[60vh] overflow-y-auto text-sm text-slate-600 leading-relaxed pr-2 space-y-2">
                {legalContent.faq.map((item, idx) => (
                    <details key={idx} className="group bg-slate-50 rounded-xl p-3 cursor-pointer">
                        <summary className="font-bold text-slate-800 flex items-center justify-between list-none">
                            <span>{item.question}</span>
                            <ChevronDown className="w-4 h-4 text-pink-500 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-2 text-slate-600 pl-2 border-l-2 border-pink-200">{item.answer}</p>
                    </details>
                ))}
            </div>
            <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors mt-6">
                {t('common.close')}
            </button>
        </>
    );
}
