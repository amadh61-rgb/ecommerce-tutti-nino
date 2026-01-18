import React, { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { User, Mail, Lock, FileText } from 'lucide-react';

export default function RegisterModal({ onRegisterSuccess }) {
    const { closeModal, openModal } = useModal();
    const [cpf, setCpf] = useState('');

    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulating registration success
        if (onRegisterSuccess) {
            onRegisterSuccess({ name: 'Novo Usuário', avatar: 'https://i.pravatar.cc/150?img=2' });
        } else {
            closeModal();
            // Optionally auto-login or show success message
        }
    };

    return (
        <div className="px-10 py-8">
            <div className="text-center mb-6">
                <div className="w-[60px] h-[60px] bg-[#EC509D] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <User className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-cookie text-[#880E4F] mb-1">Faça parte do clube</h2>
                <p className="text-[#666666] text-sm font-lato">Preencha seus dados para acessar seus mimos.</p>
            </div>

            <form className="space-y-4" noValidate onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                    {/* Nome Completo */}
                    <div>
                        <label htmlFor="register-name" className="block text-sm font-semibold text-[#454545] mb-1">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input id="register-name" type="text" required className="w-full pl-12 pr-4 h-11 rounded-xl border border-[#E0E0E0] focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-pink-100 transition-all" placeholder="Seu nome" />
                        </div>
                    </div>

                    {/* CPF */}
                    <div>
                        <label htmlFor="register-cpf" className="block text-sm font-semibold text-[#454545] mb-1">CPF</label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                id="register-cpf"
                                type="text"
                                required
                                value={cpf}
                                onChange={handleCpfChange}
                                maxLength={14}
                                className="w-full pl-12 pr-4 h-11 rounded-xl border border-[#E0E0E0] focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-pink-100 transition-all"
                                placeholder="000.000.000-00"
                            />
                        </div>
                    </div>

                    {/* E-mail */}
                    <div>
                        <label htmlFor="register-email" className="block text-sm font-semibold text-[#454545] mb-1">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input id="register-email" type="email" required className="w-full pl-12 pr-4 h-11 rounded-xl border border-[#E0E0E0] focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-pink-100 transition-all" placeholder="seu@email.com" />
                        </div>
                    </div>

                    {/* Senha */}
                    <div>
                        <label htmlFor="register-password" className="block text-sm font-semibold text-[#454545] mb-1">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input id="register-password" type="password" required className="w-full pl-12 pr-4 h-11 rounded-xl border border-[#E0E0E0] focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-pink-100 transition-all" placeholder="••••••••" />
                        </div>
                    </div>
                </div>

                {/* Termos (Checkbox) */}
                <div className="flex items-start gap-3 mt-3">
                    <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" required className="w-5 h-5 border border-slate-300 rounded focus:ring-pink-500 text-pink-600 cursor-pointer focus:ring-offset-0 focus:ring-pink-200" />
                    </div>
                    <label htmlFor="terms" className="text-sm text-slate-600 leading-tight cursor-pointer">
                        Li e concordo com os <button type="button" onClick={() => openModal('terms')} className="text-[#FF1493] hover:underline">Termos de Uso</button> e <button type="button" onClick={() => openModal('privacy')} className="text-[#FF1493] hover:underline">Política de Privacidade</button>.
                    </label>
                </div>

                {/* Botão Cadastrar */}
                <button type="submit" className="w-full h-11 mt-5 bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white font-bold text-lg rounded-full hover:shadow-lg hover:scale-[1.02] transition-all transform flex items-center justify-center font-lato cursor-pointer">
                    Cadastrar
                </button>

                {/* Divisor */}
                <div className="flex items-center gap-4 my-4">
                    <div className="h-px bg-[#E0E0E0] flex-1"></div>
                    <span className="text-sm text-[#BDBDBD] font-medium">ou cadastre-se com</span>
                    <div className="h-px bg-[#E0E0E0] flex-1"></div>
                </div>

                {/* Botões Sociais */}
                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="w-full h-11 flex items-center justify-center gap-2 bg-white border border-[#E0E0E0] rounded-full hover:bg-slate-50 transition-colors cursor-pointer">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-[#454545] font-medium text-sm">Google</span>
                    </button>
                    <button type="button" className="w-full h-11 flex items-center justify-center gap-2 bg-black text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.63-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.23-.93.65 0 2.71.26 3.75 1.77-3.26 1.76-2.67 6.49.56 7.82-.44 1.33-1.06 2.6-1.62 3.57zm-2.09-14.7c.69-.87 1.19-2.04.99-3.21-1.12.06-2.43.74-3.02 1.5-.54.67-.98 1.83-.81 2.92 1.25.1 2.17-.57 2.84-1.21z" />
                        </svg>
                        <span className="font-medium text-sm">Apple</span>
                    </button>
                </div>

                <p className="text-center text-sm text-[#666666] mt-4">
                    Já tem uma conta? <button type="button" onClick={() => openModal('login')} className="text-[#FF1493] font-bold hover:underline ml-1">Entrar</button>
                </p>
            </form>
        </div>
    );
}
