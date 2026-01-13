import React from 'react';
import { Shield, Lock, CreditCard } from 'lucide-react';
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
                                {/* Instagram - Modern gradient */}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="Instagram">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                {/* Facebook - Modern rounded */}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877f2] rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                {/* X (Twitter) - Modern black */}
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg" aria-label="X">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
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
