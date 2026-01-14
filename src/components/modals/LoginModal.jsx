import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useI18n } from '../../hooks/useI18n';
import { User, Mail, Lock } from 'lucide-react';

export default function LoginModal({ onLoginSuccess }) {
    const { closeModal } = useModal();
    const { t } = useI18n();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulating login success
        if (onLoginSuccess) {
            onLoginSuccess({ name: 'Usuário', avatar: 'https://i.pravatar.cc/150?img=1' });
        } else {
            closeModal();
        }
    };

    return (
        <>
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-pink-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{t('modals.login.title')}</h2>
                <p className="text-slate-500">{t('modals.login.subtitle')}</p>
            </div>
            <form className="space-y-4" noValidate onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('modals.login.email')}</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="email" required maxLength={100} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="seu@email.com" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('modals.login.password')}</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="password" required maxLength={50} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="••••••••" />
                    </div>
                </div>
                <button type="submit" className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors shadow-lg">
                    {t('modals.login.submit')}
                </button>
                <p className="text-center text-sm text-slate-500">
                    {t('modals.login.noAccount')} <a href="#" className="text-pink-500 font-bold hover:underline">{t('modals.login.register')}</a>
                </p>
            </form>
        </>
    );
}
