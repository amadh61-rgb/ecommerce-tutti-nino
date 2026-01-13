import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { legalContent } from '../data/legalData';
import { useI18n } from '../hooks/useI18n';

export default function Footer({ setSelectedCategory, setActiveDrawer, setActiveModal }) {
    const { t } = useI18n();
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start justify-between h-full">
                        <div className="mb-4">
                            <img src="/footer-logo.png" alt="Tutti & Nino" className="h-64 w-auto object-contain" />
                        </div>

                    </div>

                    <div className="flex flex-col h-full items-center md:items-start">
                        <h4 className="text-2xl font-bold text-slate-800 mb-5 text-center md:text-left">{t('footer.categories')}</h4>
                        <ul className="flex-1 flex flex-col gap-4 text-lg text-slate-500 w-full">
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setSelectedCategory("Papelaria")} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('products.categories.planners')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setSelectedCategory("Papelaria")} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('products.categories.pens')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setSelectedCategory("Coleções")} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('products.categories.notebooks')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setSelectedCategory("Adesivos")} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('products.categories.stickers')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setSelectedCategory("Casa")} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('products.categories.accessories')}</button></li>
                        </ul>
                    </div>

                    <div className="flex flex-col h-full items-center md:items-start">
                        <h4 className="text-2xl font-bold text-slate-800 mb-5 text-center md:text-left">{t('footer.help')}</h4>
                        <ul className="flex-1 flex flex-col gap-4 text-lg text-slate-500 w-full">
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('shipping')} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('footer.shipping')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('returns')} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('footer.returns')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('contact')} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('nav.contact')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('faq')} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('footer.faq')}</button></li>
                            <li className="h-8 flex items-center justify-center md:justify-start"><button onClick={() => setActiveModal('privacy')} className="hover:text-pink-500 transition-colors block hover:translate-x-1 duration-200 truncate w-full text-center md:text-left">{t('footer.privacy')}</button></li>
                        </ul>
                    </div>

                    <div className="flex flex-col h-full items-center md:items-start">
                        <h4 className="text-2xl font-bold text-slate-800 mb-5 text-center md:text-left">{t('footer.legal')}</h4>
                        <div className="flex-1 flex flex-col gap-4 text-lg text-slate-500 w-full">
                            <div className="h-8 flex items-center justify-center md:justify-start truncate w-full" title={legalContent.companyInfo.razaoSocial}><strong>{t('footer.company.razaoSocial')}:&nbsp;</strong> {legalContent.companyInfo.razaoSocial}</div>
                            <div className="h-8 flex items-center justify-center md:justify-start truncate w-full" title={legalContent.companyInfo.cnpj}><strong>{t('footer.company.cnpj')}:&nbsp;</strong> {legalContent.companyInfo.cnpj}</div>
                            <div className="h-8 flex items-center justify-center md:justify-start truncate w-full" title={legalContent.companyInfo.address}><strong>{t('footer.company.address')}:&nbsp;</strong> {legalContent.companyInfo.address}</div>
                            <div className="h-8 flex items-center justify-center md:justify-start truncate w-full" title={legalContent.companyInfo.email}><strong>{t('footer.company.email')}:&nbsp;</strong> {legalContent.companyInfo.email}</div>
                            <div className="h-8 flex items-center justify-center md:justify-start truncate w-full" title={legalContent.companyInfo.phone}><strong>{t('footer.company.phone')}:&nbsp;</strong> {legalContent.companyInfo.phone}</div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 text-center bg-slate-50/50 -mx-4 px-4 pb-4">
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
