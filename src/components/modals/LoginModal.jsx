import React, { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { useI18n } from '../../hooks/useI18n';
import { User, Mail, Lock, ArrowLeft, Send, ArrowRight } from 'lucide-react';

export default function LoginModal({ onLoginSuccess }) {
    const { closeModal, openModal } = useModal();
    const { t } = useI18n();
    const [view, setView] = useState('login'); // 'login' | 'recovery'
    const [recoveryMethod, setRecoveryMethod] = useState('email'); // 'email' | 'phone'
    const [recoverySent, setRecoverySent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulating login success
        if (onLoginSuccess) {
            onLoginSuccess({ name: 'Usuário', avatar: 'https://ui-avatars.com/api/?name=Usuário&background=FF1493&color=fff&bold=true' });
        } else {
            closeModal();
        }
    };

    const handleRecoverySubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setRecoverySent(true);
        }, 1500);
    };

    if (view === 'recovery') {
        return (
            <div className="p-10">
                <button
                    onClick={() => { setView('login'); setRecoverySent(false); }}
                    className="flex items-center gap-2 text-slate-500 hover:text-pink-600 font-medium mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Lock className="w-10 h-10 text-pink-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Recuperar Senha</h2>
                    <p className="text-slate-500 text-lg">
                        {!recoverySent
                            ? "Informe seu contato para receber as instruções."
                            : "Verifique sua caixa de entrada!"}
                    </p>
                </div>

                {!recoverySent ? (
                    <form className="space-y-6 animate-fade-in" onSubmit={handleRecoverySubmit}>

                        {/* Method Toggle */}
                        <div className="flex p-1 bg-slate-100 rounded-xl relative">
                            <div
                                className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ${recoveryMethod === 'phone' ? 'translate-x-full' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setRecoveryMethod('email')}
                                className={`flex-1 relative z-10 py-2 text-sm font-bold transition-colors ${recoveryMethod === 'email' ? 'text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Via Email
                            </button>
                            <button
                                type="button"
                                onClick={() => setRecoveryMethod('phone')}
                                className={`flex-1 relative z-10 py-2 text-sm font-bold transition-colors ${recoveryMethod === 'phone' ? 'text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Via SMS/WhatsApp
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                {recoveryMethod === 'email' ? 'E-mail' : 'Telefone'}
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-opacity ${recoveryMethod === 'email' ? 'opacity-100' : 'opacity-0'}`} />
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-opacity ${recoveryMethod === 'phone' ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="text-lg">📱</span>
                                </div>

                                <input
                                    type={recoveryMethod === 'email' ? 'email' : 'tel'}
                                    required
                                    className="w-full pl-12 pr-4 h-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                                    placeholder={recoveryMethod === 'email' ? 'seu@email.com' : '(11) 99999-9999'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-pink-600 text-white font-bold text-lg rounded-full hover:bg-pink-700 hover:shadow-lg hover:scale-[1.02] transition-all transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Recuperar Senha</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="animate-fade-in text-center space-y-6">
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100">
                            Enviamos um link de recuperação para o seu {recoveryMethod === 'email' ? 'e-mail' : 'telefone'}. Por favor, verifique.
                        </div>
                        <button
                            onClick={() => setView('login')}
                            className="w-full h-12 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-colors"
                        >
                            Voltar para o Login
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Login View
    return (
        <div className="p-10">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#EC509D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-cookie text-slate-800 mb-2 whitespace-nowrap">Acesse seus mimos</h2>
                <p className="text-[#666666] text-lg font-lato">Entre para ver seus favoritos e pedidos.</p>
            </div>
            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-semibold text-[#454545] mb-2">{t('modals.login.email')}</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="email" required maxLength={100} className="w-full pl-12 pr-4 h-12 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all" placeholder="seu@email.com" />
                    </div>
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-semibold text-[#454545] mb-2">{t('modals.login.password')}</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="password" required maxLength={50} className="w-full pl-12 pr-4 h-12 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all" placeholder="••••••••" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setView('recovery')}
                        className="text-sm font-bold text-pink-600 hover:text-pink-700 hover:underline"
                    >
                        Esqueceu sua senha?
                    </button>
                </div>

                <button type="submit" className="w-full h-12 mt-6 bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white font-bold text-lg rounded-full hover:shadow-lg hover:scale-[1.02] transition-all transform flex items-center justify-center">
                    {t('modals.login.submit')}
                </button>

                <div className="flex items-center gap-4 my-6">
                    <div className="h-px bg-[#E0E0E0] flex-1"></div>
                    <span className="text-sm text-[#BDBDBD] font-medium">ou</span>
                    <div className="h-px bg-[#E0E0E0] flex-1"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button type="button" className="w-full h-12 flex items-center justify-center gap-2 bg-white border border-[#E0E0E0] rounded-full hover:bg-slate-50 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-[#454545] font-medium text-sm">Google</span>
                    </button>
                    <button type="button" className="w-full h-12 flex items-center justify-center gap-2 bg-black text-white rounded-full hover:bg-slate-800 transition-colors">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.63-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.23-.93.65 0 2.71.26 3.75 1.77-3.26 1.76-2.67 6.49.56 7.82-.44 1.33-1.06 2.6-1.62 3.57zm-2.09-14.7c.69-.87 1.19-2.04.99-3.21-1.12.06-2.43.74-3.02 1.5-.54.67-.98 1.83-.81 2.92 1.25.1 2.17-.57 2.84-1.21z" />
                        </svg>
                        <span className="font-medium text-sm">Apple</span>
                    </button>
                </div>

                <p className="text-center text-sm text-[#666666] mt-6">
                    {t('modals.login.noAccount')} <button type="button" onClick={() => { closeModal(); openModal('register'); }} className="text-[#FF1493] font-bold hover:underline ml-1">{t('modals.login.register')}</button>
                </p>
            </form>
        </div>
    );
}
