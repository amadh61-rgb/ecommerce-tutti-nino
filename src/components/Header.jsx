import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, PackageSearch, Heart, ShoppingBag, ChevronDown, X } from 'lucide-react';
import { mainMenu } from '../data/mockData';
import { useDebounce } from '../hooks/useDebounce';
import { detectXSS } from '../utils/security';
import LanguageSelector from './LanguageSelector';
import { useI18n } from '../hooks/useI18n';

// Helper de SLUG
const generateSlug = (text) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

export default function Header({
    setIsMobileMenuOpen,
    setSelectedCategory,
    setSearchQuery,
    searchQuery,
    setActiveDrawer,
    favorites,
    cartCount,
    setActiveModal,
    selectedCategory,
    handleMenuClick,
    user,
    isLoggedIn,
    navigateToDashboard
}) {
    const navigate = useNavigate();
    const [localSearch, setLocalSearch] = useState(searchQuery || '');
    const { t, isRTL } = useI18n();

    // Debounce da busca para performance
    const debouncedSearch = useDebounce(localSearch, 300);

    // Atualizar busca quando debounce disparar
    useEffect(() => {
        // Só atualizar se for diferente do valor atual
        if (debouncedSearch !== searchQuery) {
            setSearchQuery(debouncedSearch);
            if (debouncedSearch) {
                navigate(`/?busca=${encodeURIComponent(debouncedSearch)}`);
            }
        }
    }, [debouncedSearch, setSearchQuery, navigate, searchQuery]);

    const handleSearch = (e) => {
        let value = e.target.value.slice(0, 50);

        // Proteção XSS
        if (detectXSS(value)) {
            value = '';
        }

        setLocalSearch(value);
    };

    const handleLogoClick = () => {
        setSelectedCategory("Todos");
        setSearchQuery("");
        setLocalSearch("");
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">

                    {/* Logo e Menu Mobile */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-3 hover:bg-slate-100 rounded-full text-slate-600 transition-colors touch-target"
                            aria-label={t('aria.openMenu')}
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                        <Link
                            to="/"
                            onClick={handleLogoClick}
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-sky-400 tracking-tighter"
                        >
                            <img src="/header-logo.png" alt="Tutti & Nino" className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Barra de Busca */}
                    <div className="hidden lg:flex flex-1 max-w-lg relative mx-8 group">
                        <input
                            type="text"
                            value={localSearch}
                            onChange={handleSearch}
                            placeholder={t('common.search')}
                            maxLength={50}
                            className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all text-sm placeholder:text-slate-400 group-hover:bg-white`}
                        />
                        <Search className={`w-5 h-5 absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 transition-colors ${localSearch ? 'text-pink-500' : 'text-slate-400'}`} />
                        {localSearch && (
                            <button
                                onClick={() => { setLocalSearch(''); setSearchQuery(''); navigate('/'); }}
                                className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 p-1 bg-slate-200 rounded-full hover:bg-slate-300`}
                                aria-label={t('aria.clearSearch')}
                            >
                                <X className="w-4 h-4 text-slate-500" />
                            </button>
                        )}
                    </div>

                    {/* Ações (Direita) */}
                    <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">

                        {/* Rastreio - Visível em todos os dispositivos */}
                        <button
                            onClick={() => setActiveDrawer('tracking')}
                            className="p-2 sm:p-2.5 hover:bg-sky-50 rounded-full transition-colors text-slate-500 hover:text-sky-500 touch-target"
                            title={t('nav.tracking')}
                            aria-label={t('aria.trackOrder')}
                        >
                            <PackageSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Favoritos - Visível em todos os dispositivos */}
                        <button
                            onClick={() => setActiveDrawer('favorites')}
                            className="relative p-2 sm:p-2.5 rounded-full transition-colors touch-target hover:bg-pink-50 text-slate-500 hover:text-pink-500"
                            title={t('nav.favorites')}
                            aria-label={t('aria.favoritesCount', { count: favorites.length })}
                        >
                            <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${favorites.length > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                            {favorites.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full shadow-sm">
                                    {favorites.length}
                                </span>
                            )}
                        </button>

                        {/* Carrinho - Visível em todos os dispositivos */}
                        <button
                            onClick={() => setActiveDrawer('cart')}
                            className="relative p-2 sm:p-3 hover:bg-pink-50 rounded-full transition-colors group touch-target"
                            title={t('nav.cart')}
                            aria-label={t('aria.cartCount', { count: cartCount })}
                        >
                            <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7 text-slate-700 group-hover:text-pink-500 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-sky-400 text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {isLoggedIn ? (
                            <button
                                onClick={navigateToDashboard}
                                className="hidden lg:flex items-center gap-3 pl-2 pr-4 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-all touch-target group"
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full border border-slate-200"
                                />
                                <span className="text-sm font-bold text-slate-700 group-hover:text-pink-500 transition-colors">
                                    {user.name}
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setActiveModal('login')}
                                className="hidden lg:block bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200"
                            >
                                {t('nav.login')}
                            </button>
                        )}

                        {/* Seletor de Idioma (Desktop) */}
                        <div className="hidden lg:block">
                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MENU PRINCIPAL (Barra de Categorias) --- */}
            <div className="hidden lg:block bg-pink-100 border-y border-pink-200 shadow-sm">
                <div className="container mx-auto px-4">
                    <ul className="flex items-center justify-center gap-10 text-sm font-bold text-pink-700 py-3 tracking-wide">
                        {mainMenu.map((item, index) => (
                            <li key={index} className="group relative cursor-pointer">
                                <button
                                    onClick={() => handleMenuClick(item)}
                                    className={`flex items-center gap-1.5 hover:text-pink-900 transition-colors py-2 uppercase text-xs sm:text-sm
                                    ${selectedCategory === item.category ? 'text-pink-900' : ''}`}
                                >
                                    {t(item.translationKey) || item.label}
                                    {(item.action === 'filter' || item.label === 'Mais') && (
                                        <ChevronDown className="w-3.5 h-3.5 text-pink-500 group-hover:text-pink-800 transition-colors" />
                                    )}
                                </button>
                                {/* Active/Hover Line */}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 transition-all duration-300 ${selectedCategory === item.category ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}
