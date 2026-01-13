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
                            <div className="flex items-center gap-4">
                                {/* Visa */}
                                <div className="w-14 h-9 bg-white rounded-lg shadow-md flex items-center justify-center border border-slate-100 hover:shadow-lg transition-shadow">
                                    <svg viewBox="0 0 48 48" className="w-10 h-6">
                                        <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z" />
                                        <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z" />
                                    </svg>
                                </div>
                                {/* Mastercard */}
                                <div className="w-14 h-9 bg-white rounded-lg shadow-md flex items-center justify-center border border-slate-100 hover:shadow-lg transition-shadow">
                                    <svg viewBox="0 0 48 48" className="w-10 h-6">
                                        <path fill="#3F51B5" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z" />
                                        <circle cx="30" cy="24" r="10" fill="#FFC107" />
                                        <circle cx="18" cy="24" r="10" fill="#FF3D00" />
                                        <path fill="#FF9800" d="M24,17.7c0,0,0,12.6,0,12.6c2.3-1.7,3.9-4.5,3.9-7.7S26.3,16.8,24,17.7z" />
                                    </svg>
                                </div>
                                {/* Elo */}
                                <div className="w-14 h-9 bg-[#000] rounded-lg shadow-md flex items-center justify-center border border-slate-100 hover:shadow-lg transition-shadow">
                                    <svg viewBox="0 0 60 40" className="w-10 h-6">
                                        <rect fill="#000" width="60" height="40" rx="4" />
                                        <path fill="#FFCB05" d="M15 20c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
                                        <path fill="#00A4E0" d="M27 20c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
                                        <path fill="#EF4123" d="M39 20c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
                                    </svg>
                                </div>
                                {/* Pix */}
                                <div className="w-14 h-9 bg-white rounded-lg shadow-md flex items-center justify-center border border-slate-100 hover:shadow-lg transition-shadow">
                                    <svg viewBox="0 0 512 512" className="w-7 h-7">
                                        <path fill="#32BCAD" d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138 97.139c-30.326 30.344-79.505 30.344-109.85 0l-97.415-97.416h9.232zm280.068-271.294c-20.056 0-38.929 7.809-53.12 22l-76.97 76.99c-5.551 5.53-14.6 5.568-20.15-.02l-76.711-76.693c-14.192-14.191-33.046-21.999-53.12-21.999h-9.234l97.416-97.416c30.344-30.344 79.523-30.344 109.867 0l97.138 97.138h-15.116z" />
                                        <path fill="#32BCAD" d="M112.57 266.156h-9.232L6.149 168.967c-8.187-8.187-8.187-21.452 0-29.64l47.104-47.123 59.317 59.317c14.192 14.192 22 33.064 22 53.12 0 20.075-7.808 38.947-22 53.139l-.004.004-.001-.001.005.004v-.002l-.004.001.004.004-.007-.006.006.01-.006-.003.006.01-.006-.01.006.004-.006-.002.006.005-.006-.005.006.005-.006-.005.006.002-.006-.001.006.005-.003-.003.003.003-.003-.004.003.001-.006-.003v.003zm280.068 0c20.075-20.075 20.075-52.641 0-72.716L333.32 134.12l59.013-59.013 47.104 47.104c8.188 8.187 8.188 21.452 0 29.64l-97.16 97.157h15.098l34.48 17.122-.217.026zM112.57 245.88" />
                                        <path fill="#32BCAD" d="M392.638 266.156h15.098l97.16 97.16c8.188 8.186 8.188 21.45 0 29.639l-47.104 47.104-59.013-59.013c-14.192-14.192-22-33.065-22-53.12 0-20.057 7.808-38.929 22-53.121l.002-.003-.002.003.002-.005-.002.001zm-280.068 0c-14.192 14.192-22 33.064-22 53.12 0 20.056 7.808 38.929 22 53.12l59.298 59.31-59.014 59.012-47.103-47.103c-8.188-8.188-8.188-21.453 0-29.64l97.188-97.188-15.098.001-35.27-17.633z" />
                                    </svg>
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
                            <div className="flex items-center gap-5">
                                {/* Instagram - Official rounded square gradient */}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group" aria-label="Instagram">
                                    <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-200 overflow-hidden" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </div>
                                </a>
                                {/* Facebook - Official circular blue */}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group" aria-label="Facebook">
                                    <div className="w-12 h-12 bg-[#1877f2] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-200">
                                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </div>
                                </a>
                                {/* X - Official solid black */}
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="group" aria-label="X">
                                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-200">
                                        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>
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
