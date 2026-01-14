import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useI18n } from '../../hooks/useI18n';
import { legalContent } from '../../data/legalData';
import { Mail, Instagram } from 'lucide-react';

export default function ContactModal() {
    const { closeModal } = useModal();
    const { t } = useI18n();

    return (
        <>
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{t('modals.contact.title')}</h2>
                <p className="text-slate-500">{legalContent.companyInfo.attendance}</p>
            </div>
            <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-600 font-medium">{legalContent.companyInfo.email}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-600 font-medium">@tuttienino.papelaria</span>
                </div>
                <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-purple-500 transition-colors mt-4">
                    {t('aria.close')}
                </button>
            </div>
        </>
    );
}
