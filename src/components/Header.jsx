import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, PackageSearch, Heart, ShoppingBag, ChevronDown, X } from 'lucide-react';
import { mainMenu } from '../data/mockData';
import { useDebounce } from '../hooks/useDebounce';
import { detectXSS } from '../utils/security';
import LanguageSelector from './LanguageSelector';
import { useI18n } from '../hooks/useI18n';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';
import { getUserAvatar } from '../utils/userUtils';
import { Sun, Moon } from 'lucide-react';


export default function Header({
    setIsMobileMenuOpen,
    setSelectedCategory,
    setSearchQuery,
    searchQuery,
    selectedCategory,
    handleMenuClick,
    user,
    isLoggedIn,
    navigateToDashboard,
    isMobileMenuOpen // Added prop to fix usage in toggle
}) {
    const navigate = useNavigate();
    const { t } = useI18n();
    const { cartCount } = useCart();
    const { favorites } = useFavorites();
    const { openDrawer, closeDrawer, openModal } = useModal();
    const { isDarkMode, toggleTheme } = useTheme();

    // Debounce da busca APENAS para navegação/URL
    const debouncedSearch = useDebounce(searchQuery, 500);

    // Atualizar URL quando o termo debounced mudar
    useEffect(() => {
        if (debouncedSearch) {
            navigate(`/?busca=${encodeURIComponent(debouncedSearch)}`);
        } else if (searchQuery === '' && window.location.search.includes('busca=')) {
            // Se limpou a busca, volta para home limpa
            navigate('/');
        }
    }, [debouncedSearch, navigate, searchQuery]);

    const handleSearch = (e) => {
        let value = e.target.value.slice(0, 50);

        // Proteção XSS
        if (detectXSS(value)) {
            value = '';
        }

        setSearchQuery(value);
    };

    const handleLogoClick = () => {
        setSelectedCategory("Todos");
        setSearchQuery("");
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all shadow-sm" role="banner" dir="ltr">
            <div className="container mx-auto px-4 py-4">
                <a href="#main-content" className="sr-only focus:not-sr-only bg-white text-pink-600 px-4 py-2 absolute z-[100] top-0 left-0 shadow-md">
                    {t('a11y.skipToContent') || 'Pular para o conteúdo principal'}
                </a>
                <div className="flex items-center justify-between gap-4">

                    {/* Logo e Menu Mobile */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(prev => !prev);
                                if (!isMobileMenuOpen) {
                                    closeDrawer();
                                }
                            }}
                            className="lg:hidden p-3 hover:bg-slate-100 rounded-full text-slate-600 transition-colors touch-target"
                            aria-label={t('aria.openMenu')}
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                        <Link
                            to="/"
                            aria-label="Tutti & Nino Home"
                            onClick={handleLogoClick}
                        >
                            <img src="/header-logo.png" alt="Tutti & Nino Logo" width="180" height="48" className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Barra de Busca */}
                    <div className="hidden lg:flex flex-1 max-w-lg relative mx-8 group" role="search">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder={t('common.search')}
                            maxLength={50}
                            className="w-full pl-12 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all text-sm placeholder:text-slate-400 group-hover:bg-white"
                        />
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-[#FF1493]" />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); navigate('/'); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-slate-200 rounded-full hover:bg-slate-300"
                                aria-label={t('aria.clearSearch')}
                            >
                                <X className="w-4 h-4 text-slate-500" />
                            </button>
                        )}
                    </div>

                    {/* Ações (Direita) */}
                    <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">

                        {/* Rastreio */}
                        <button
                            onClick={() => { openDrawer('tracking'); setIsMobileMenuOpen(false); }}
                            className="p-2 sm:p-2.5 hover:bg-sky-50 rounded-full transition-colors text-[#FF1493] hover:text-pink-600 touch-target"
                            title={t('nav.tracking')}
                            aria-label={t('aria.trackOrder')}
                        >
                            <PackageSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Favoritos */}
                        <button
                            onClick={() => { openDrawer('favorites'); setIsMobileMenuOpen(false); }}
                            className="relative p-2 sm:p-2.5 rounded-full transition-colors touch-target hover:bg-pink-50 text-[#FF1493] hover:text-pink-600"
                            title={t('nav.favorites')}
                            aria-label={t('aria.favoritesCount', { count: favorites.length })}
                        >
                            <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${favorites.length > 0 ? 'fill-[#FF1493] text-[#FF1493]' : ''}`} />
                            {favorites.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full shadow-sm">
                                    {favorites.length}
                                </span>
                            )}
                        </button>

                        {/* Carrinho */}
                        <button
                            onClick={() => { openDrawer('cart'); setIsMobileMenuOpen(false); }}
                            className="relative p-2 sm:p-3 hover:bg-pink-50 rounded-full transition-colors group touch-target"
                            title={t('nav.cart')}
                            aria-label={t('aria.cartCount', { count: cartCount })}
                        >
                            <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7 text-[#FF1493] group-hover:text-pink-600 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#FF69B4] text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {isLoggedIn ? (
                            <button
                                onClick={navigateToDashboard}
                                className="hidden lg:flex items-center gap-2 pl-1 pr-3 py-1 bg-white hover:bg-slate-50 rounded-full border border-slate-200 transition-all shadow-sm group"
                            >
                                <img
                                    src={getUserAvatar(user)}
                                    alt={user.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getUserAvatar({ name: user.name }); // Force regeneration
                                    }}
                                    className="w-8 h-8 rounded-full object-cover relative z-10 bg-white"
                                />
                                <span className="text-sm font-bold text-slate-700 group-hover:text-pink-500 transition-colors">
                                    {user.name}
                                </span>
                            </button>
                        ) : (
                            <Button
                                onClick={() => openModal('login')}
                                className="hidden lg:flex"
                                variant="primary"
                            >
                                {t('nav.login')}
                            </Button>
                        )}

                        {/* Seletor de Idioma (Desktop) */}
                        <div className="hidden lg:flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                                aria-label="Alternar Tema"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
                            </button>
                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MENU PRINCIPAL (Barra de Categorias) --- */}
            <div className="hidden lg:block bg-[#EC509D]" dir="ltr">
                <div className="container mx-auto px-4">
                    <nav aria-label={t('aria.mainMenu') || "Menu principal"}>
                        <ul className="flex items-center justify-center gap-10 text-sm font-bold text-white py-2 tracking-wide">
                            {mainMenu.map((item, index) => (
                                <li key={index} className="group relative cursor-pointer">
                                    <button
                                        onClick={() => handleMenuClick(item)}
                                        className={`flex items-center gap-1.5 hover:text-[#FFE4E1] transition-colors py-1 uppercase text-xs sm:text-sm
                                            ${selectedCategory === item.category ? 'text-[#FFE4E1]' : ''}`}
                                        aria-current={selectedCategory === item.category ? 'page' : undefined}
                                    >
                                        {t(item.translationKey) || item.label}
                                        {item.subcategories?.length > 0 && (
                                            <ChevronDown className="w-3.5 h-3.5 text-white group-hover:text-[#FFE4E1] transition-colors" />
                                        )}
                                    </button>
                                    {/* Active/Hover Line */}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#FFE4E1] transition-all duration-300 ${selectedCategory === item.category ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
