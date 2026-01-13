import React from 'react';
import { Instagram, Facebook, Twitter, Shield, Lock, CreditCard } from 'lucide-react';
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
                <div className="border-t border-slate-100 pt-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {/* Payment Methods */}
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t('footer.paymentMethods')}</span>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-8 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                                    <span className="text-blue-700 font-bold text-xs italic">VISA</span>
                                </div>
                                <div className="w-12 h-8 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                                    <div className="flex">
                                        <div className="w-3 h-3 bg-red-500 rounded-full -mr-1"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
                                    </div>
                                </div>
                                <div className="w-12 h-8 bg-black border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                                    <span className="text-yellow-400 font-bold text-xs">elo</span>
                                </div>
                                <div className="w-12 h-8 bg-teal-500 border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-[10px]">PIX</span>
                                </div>
                                <div className="w-12 h-8 bg-slate-700 border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                                    <CreditCard className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Security Seals */}
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t('footer.security')}</span>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                    <Lock className="w-4 h-4 text-green-600" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-green-700 uppercase">SSL</span>
                                        <span className="text-[8px] text-green-600">Seguro</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                                    <Shield className="w-4 h-4 text-blue-600" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-blue-700 uppercase">{t('footer.securePurchase')}</span>
                                        <span className="text-[8px] text-blue-600">{t('footer.secureLabel')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t('footer.followUs')}</span>
                            <div className="flex items-center gap-3">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="Instagram">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="Facebook">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="Twitter">
                                    <Twitter className="w-5 h-5" />
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
