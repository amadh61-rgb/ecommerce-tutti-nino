import React from 'react';
import { useI18n } from '../hooks/useI18n';
import LanguageSelector from './LanguageSelector';
import { X, Search, ChevronRight, User } from 'lucide-react';
import { mainMenu } from '../data/mockData';

export default function MobileMenu({
    isOpen,
    onClose,
    searchQuery,
    setSearchQuery,
    handleMenuClick,
    onOpenLogin
}) {
    const { t } = useI18n();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col overflow-y-auto mobile-scroll safe-top safe-bottom">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-pink-500">{t('common.menu') || 'Menu'}</span>
                        <LanguageSelector />
                    </div>
                    <button onClick={onClose} className="p-2 touch-target" aria-label={t('aria.closeMenu')}><X className="w-7 h-7 text-slate-400" /></button>
                </div>
                {/* Search */}
                <div className="relative mb-6">
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.slice(0, 50))} placeholder={t('common.search')} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300" />
                    <Search className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${searchQuery ? 'text-pink-500' : 'text-slate-400'}`} />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-slate-200 rounded-full" aria-label={t('aria.clearSearch')}><X className="w-4 h-4 text-slate-500" /></button>
                    )}
                </div>
                {/* Navigation */}
                <nav className="space-y-2 text-lg font-medium text-slate-600 flex-1" role="navigation" aria-label="Mobile menu navigation">
                    {mainMenu.map((item, index) => (
                        <button key={index} onClick={() => handleMenuClick(item)} className="flex w-full items-center justify-between hover:text-pink-500 py-3 px-2 border-b border-slate-50 last:border-0 text-left rounded-lg hover:bg-pink-50 transition-colors touch-target">
                            {t(item.translationKey) || item.label} <ChevronRight className={`w-5 h-5 text-slate-300 ${t('direction') === 'rtl' ? 'rotate-180' : ''}`} />
                        </button>
                    ))}
                </nav>
                {/* Footer Mobile */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                    <button onClick={onOpenLogin} className="flex items-center gap-3 text-sky-600 font-semibold text-left py-3 w-full touch-target">
                        <User className="w-5 h-5" /> {t('nav.account')}
                    </button>
                </div>
            </div>
        </div>
    );
}
