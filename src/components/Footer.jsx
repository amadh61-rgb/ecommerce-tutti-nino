import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export default function Footer({ setSelectedCategory, setActiveDrawer, setActiveModal }) {
    const { t } = useI18n();
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Logo */}
                    <div className="col-span-1 flex flex-col items-center md:items-start">
                        <div className="mb-6">
                            <img src="/footer-logo.png" alt="Tutti & Nino" className="h-48 w-auto object-contain" />
                        </div>
                    </div>

                    {/* Ajuda */}
                    <div className="flex flex-col h-full items-center md:items-start">
                        <h4 className="text-2xl font-bold text-slate-800 mb-5 text-center md:text-left">{t('footer.help')}</h4>
                        <ul className="flex-1 flex flex-col gap-3 text-base text-slate-500 w-full">
                            <li className="flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('shipping')} className="hover:text-pink-500 transition-colors hover:translate-x-1 duration-200 text-center md:text-left">{t('footer.shipping')}</button></li>
                            <li className="flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('returns')} className="hover:text-pink-500 transition-colors hover:translate-x-1 duration-200 text-center md:text-left">{t('footer.returns')}</button></li>
                            <li className="flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('contact')} className="hover:text-pink-500 transition-colors hover:translate-x-1 duration-200 text-center md:text-left">{t('nav.contact')}</button></li>
                            <li className="flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('faq')} className="hover:text-pink-500 transition-colors hover:translate-x-1 duration-200 text-center md:text-left">{t('footer.faq')}</button></li>
                            <li className="flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('privacy')} className="hover:text-pink-500 transition-colors hover:translate-x-1 duration-200 text-center md:text-left">{t('footer.privacy')}</button></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col h-full items-center md:items-start">
                        <h4 className="text-2xl font-bold text-slate-800 mb-5 text-center md:text-left">{t('footer.legal')}</h4>
                        <div className="flex-1 flex flex-col gap-2 text-sm text-slate-500 w-full">
                            <div className="flex items-center justify-center md:justify-start"><strong className="text-slate-700">{t('footer.company.razaoSocial')}:</strong>&nbsp;-</div>
                            <div className="flex items-center justify-center md:justify-start"><strong className="text-slate-700">{t('footer.company.cnpj')}:</strong>&nbsp;-</div>
                            <div className="flex items-center justify-center md:justify-start"><strong className="text-slate-700">{t('footer.company.address')}:</strong>&nbsp;-</div>
                            <div className="flex items-center justify-center md:justify-start"><strong className="text-slate-700">{t('footer.company.email')}:</strong>&nbsp;-</div>
                            <div className="flex items-center justify-center md:justify-start"><strong className="text-slate-700">{t('footer.company.phone')}:</strong>&nbsp;-</div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods + Security Seals + Social Media */}
                <div className="border-t border-slate-100 pt-10 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-16">
                        {/* Payment Methods */}
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">{t('footer.paymentMethods')}</span>
                            <div className="flex items-center gap-5">
                                {/* Visa - Official logo image */}
                                <div className="h-12 px-4 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100 hover:shadow-md transition-shadow">
                                    <img src="/visa-logo.png" alt="Visa" className="h-8 object-contain" />
                                </div>
                                {/* Mastercard - Official overlapping circles */}
                                <div className="h-12 px-3 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100 hover:shadow-md transition-shadow">
                                    <svg viewBox="0 0 131.39 86.9" className="h-9">
                                        <circle fill="#EB001B" cx="43.45" cy="43.45" r="43.45" />
                                        <circle fill="#F79E1B" cx="87.94" cy="43.45" r="43.45" />
                                        <path fill="#FF5F00" d="M65.7 11.2a43.35 43.35 0 0 0-16.2 32.3 43.35 43.35 0 0 0 16.2 32.3 43.35 43.35 0 0 0 16.2-32.3 43.35 43.35 0 0 0-16.2-32.3z" />
                                    </svg>
                                </div>
                                {/* Elo - Official logo image */}
                                <div className="h-12 w-12 rounded-full shadow-sm flex items-center justify-center overflow-hidden hover:shadow-md transition-shadow">
                                    <img src="/elo-logo.png" alt="Elo" className="h-full w-full object-cover" />
                                </div>
                                {/* Pix - Official logo image */}
                                <div className="h-12 px-3 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100 hover:shadow-md transition-shadow">
                                    <img src="/pix-logo.png" alt="Pix" className="h-8 object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* Security Seals */}
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">{t('footer.security')}</span>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-green-700">SSL</span>
                                        <span className="text-[10px] text-green-600">Seguro</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-blue-700">{t('footer.securePurchase')}</span>
                                        <span className="text-[10px] text-blue-600">{t('footer.secureLabel')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">{t('footer.followUs')}</span>
                            <div className="flex items-center gap-6">
                                {/* Instagram - Official logo image */}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform duration-200" aria-label="Instagram">
                                    <img src="/instagram-logo.png" alt="Instagram" className="w-10 h-10 object-contain" />
                                </a>
                                {/* Facebook - Official logo image */}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform duration-200" aria-label="Facebook">
                                    <img src="/facebook-logo.png" alt="Facebook" className="w-10 h-10 object-contain" />
                                </a>
                                {/* X - Official logo image */}
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform duration-200" aria-label="X">
                                    <img src="/x-logo.png" alt="X" className="w-8 h-8 object-contain" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-100 pt-6 text-center">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-400 text-sm mb-2">
                        <button onClick={() => setActiveModal('terms')} className="hover:text-pink-500 transition-colors">{t('footer.terms')}</button>
                    </div>
                    <p className="text-slate-400 text-sm">
                        {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
