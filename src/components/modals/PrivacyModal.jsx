import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useI18n } from '../../hooks/useI18n';
import { legalContent } from '../../data/legalData';

export default function PrivacyModal() {
    const { t } = useI18n();

    return (
        <div className="p-8 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{legalContent.privacyPolicy.title} 🔒</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
                {legalContent.privacyPolicy.sections.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="text-lg font-bold text-rose-900 mb-2">{section.title}</h3>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
