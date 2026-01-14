import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useI18n } from '../../hooks/useI18n';
import { legalContent } from '../../data/legalData';

export default function ShippingModal() {
    const { closeModal } = useModal();
    const { t } = useI18n();

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{legalContent.shippingPolicy.title} 🚚</h2>
            <div className="max-h-[60vh] overflow-y-auto text-sm text-slate-600 leading-relaxed pr-2 space-y-4">
                {legalContent.shippingPolicy.sections.map((section, idx) => (
                    <div key={idx}>
                        <strong className="block text-slate-800 mb-1">{section.title}</strong>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
            <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors mt-6">
                {t('modals.understood')}
            </button>
        </>
    );
}
