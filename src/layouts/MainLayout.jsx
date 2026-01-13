// src/layouts/MainLayout.jsx
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import CookieBanner from '../components/CookieBanner';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ReloadPrompt from '../components/ReloadPrompt';
import LanguageSelector from '../components/LanguageSelector';

import SEO from '../components/SEO';
import SkipLinks from '../components/SkipLinks';

// Lazy Loaded Drawers & Components
// Factories for preloading
const CartDrawerFactory = () => import('../components/DrawerCart');
const FavoritesDrawerFactory = () => import('../components/DrawerFavorites');
const TrackingDrawerFactory = () => import('../components/DrawerTracking');
const ProductDetailsFactory = () => import('../components/ProductDetails');

const DrawerCart = lazy(CartDrawerFactory);
const DrawerFavorites = lazy(FavoritesDrawerFactory);
const DrawerTracking = lazy(TrackingDrawerFactory);
const ProductDetails = lazy(ProductDetailsFactory);

// Preload Routes
const preloadCheckout = () => import('../pages/CheckoutPage');

// Data
import { productsData, mainMenu } from '../data/mockData';
import { legalContent } from '../data/legalData';

// Context Hooks
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useModal } from '../hooks/useModal';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useI18n } from '../hooks/useI18n';

// Icons
import { X, User, Mail, Lock, CheckCircle, ChevronDown, ChevronRight, PackageSearch, Heart, Instagram, Search } from 'lucide-react';

export default function MainLayout() {
    const navigate = useNavigate();

    // Context state
    const { cartItems, addToCart, removeFromCart, cartTotal, cartCount } = useCart();
    const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();
    const { activeModal, openModal, closeModal } = useModal();
    const { t } = useI18n();

    // Local UI state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickView, setIsQuickView] = useState(false);
    const [notification, setNotification] = useState(null);
    const [trackingCode, setTrackingCode] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [activeDrawer, setActiveDrawer] = useState(null);

    const handleMenuClick = (item) => {
        if (item.action === 'reset') {
            setSelectedCategory('Todos');
            setSearchQuery('');
            navigate('/');
        } else if (item.action === 'filter') {
            setSelectedCategory(item.category || item.label);
            navigate('/?categoria=' + (item.category || item.label));
        } else if (item.action === 'modal') {
            openModal(item.modal);
        }
        setIsMobileMenuOpen(false);
    };

    const handleCheckout = () => {
        setActiveDrawer(null);
        navigate('/checkout');
    };

    const handleLoginSuccess = (mockUser) => {
        setIsLoggedIn(true);
        setUser(mockUser);
        setNotification(t('dashboard.welcome', { name: mockUser.name }));
        closeModal();
        setTimeout(() => setNotification(null), 3000);
    };

    // Idle Preload effect
    useEffect(() => {
        const timer = setTimeout(() => {
            preloadCheckout();
            ProductDetailsFactory(); // Call the factory directly to preload
        }, 2000); // Preload após 2 segundos (idle simulation)
        return () => clearTimeout(timer);
    }, []);

    return (
        <HelmetProvider>
            <div className="font-sans text-slate-700 bg-slate-50 min-h-screen selection:bg-pink-200 selection:text-pink-900 relative safe-top">
                {/* SEO Default */}
                <SEO
                    title={t('seo.defaultTitle')}
                    description={t('seo.defaultDescription')}
                />

                {/* Modals */}
                {activeModal && (
                    <div
                        className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-scale-up">
                            <button onClick={closeModal} className="absolute top-4 right-4 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors" aria-label={t('aria.closeModal')}>
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                            {/* Modal content based on activeModal */}
                            {activeModal === 'login' && (
                                <>
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <User className="w-8 h-8 text-pink-500" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-800">{t('modals.login.title')}</h2>
                                        <p className="text-slate-500">{t('modals.login.subtitle')}</p>
                                    </div>
                                    <form className="space-y-4" noValidate onSubmit={(e) => {
                                        e.preventDefault();
                                        handleLoginSuccess({ name: 'Usuário', avatar: 'https://i.pravatar.cc/150?img=1' });
                                    }}>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modals.login.email')}</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input type="email" required maxLength={100} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="seu@email.com" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('modals.login.password')}</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input type="password" required maxLength={50} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="••••••••" />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors shadow-lg">
                                            {t('modals.login.submit')}
                                        </button>
                                        <p className="text-center text-sm text-slate-500">
                                            {t('modals.login.noAccount')} <a href="#" className="text-pink-500 font-bold hover:underline">{t('modals.login.register')}</a>
                                        </p>
                                    </form>
                                </>
                            )}
                            {/* Contact Modal */}
                            {activeModal === 'contact' && (
                                <>
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Mail className="w-8 h-8 text-purple-500" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-800">{t('modals.contact.title')}</h2>
                                        <p className="text-slate-500">{legalContent.companyInfo.attendance}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-slate-400" />
                                            <span className="text-slate-600 font-medium">{legalContent.companyInfo.email}</span>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                                            <Instagram className="w-5 h-5 text-slate-400" />
                                            <span className="text-slate-600 font-medium">@tuttienino.papelaria</span>
                                        </div>
                                        <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-purple-500 transition-colors mt-4">
                                            {t('aria.close')}
                                        </button>
                                    </div>
                                </>
                            )}
                            {/* Privacy Modal */}
                            {activeModal === 'privacy' && (
                                <>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{legalContent.privacyPolicy.title} 🔒</h2>
                                    <div className="max-h-[60vh] overflow-y-auto text-sm text-slate-600 leading-relaxed pr-2 space-y-4">
                                        {legalContent.privacyPolicy.sections.map((section, idx) => (
                                            <div key={idx}>
                                                <strong className="block text-slate-800 mb-1">{section.title}</strong>
                                                <p>{section.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors mt-6">
                                        {t('modals.understood')}
                                    </button>
                                </>
                            )}
                            {/* Terms & Returns Modal */}
                            {(activeModal === 'terms' || activeModal === 'returns') && (
                                <>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{legalContent.termsAndExchanges.title} 📜</h2>
                                    <div className="max-h-[60vh] overflow-y-auto text-sm text-slate-600 leading-relaxed pr-2 space-y-4">
                                        {legalContent.termsAndExchanges.sections.map((section, idx) => (
                                            <div key={idx}>
                                                <strong className="block text-slate-800 mb-1">{section.title}</strong>
                                                <p>{section.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors mt-6">
                                        {t('modals.understood')}
                                    </button>
                                </>
                            )}
                            {/* Shipping Modal */}
                            {activeModal === 'shipping' && (
                                <>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{legalContent.shippingPolicy.title} 🚚</h2>
                                    <div className="max-h-[60vh] overflow-y-auto text-sm text-slate-600 leading-relaxed pr-2 space-y-4">
                                        {legalContent.shippingPolicy.sections.map((section, idx) => (
                                            <div key={idx}>
                                                <strong className="block text-slate-800 mb-1">{section.title}</strong>
                                                <p>{section.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors mt-6">
                                        {t('modals.understood')}
                                    </button>
                                </>
                            )}
                            {/* FAQ Modal */}
                            {activeModal === 'faq' && (
                                <>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('modals.faq.title')}</h2>
                                    <div className="max-h-[60vh] overflow-y-auto text-sm text-slate-600 leading-relaxed pr-2 space-y-2">
                                        {legalContent.faq.map((item, idx) => (
                                            <details key={idx} className="group bg-slate-50 rounded-xl p-3 cursor-pointer">
                                                <summary className="font-bold text-slate-800 flex items-center justify-between list-none">
                                                    <span>{item.question}</span>
                                                    <ChevronDown className="w-4 h-4 text-pink-500 transition-transform group-open:rotate-180" />
                                                </summary>
                                                <p className="mt-2 text-slate-600 pl-2 border-l-2 border-pink-200">{item.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                    <button onClick={closeModal} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors mt-6">
                                        {t('common.close')}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Side Drawers */}
                <div className={`fixed inset-0 z-[60] transform transition-all duration-300 ${activeDrawer ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}>
                    <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setActiveDrawer(null)} />
                    <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 transform">
                        <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" /></div>}>
                            {activeDrawer === 'cart' && (
                                <DrawerCart isOpen={true} onClose={() => setActiveDrawer(null)} cartItems={cartItems} onRemoveFromCart={removeFromCart} onCheckout={handleCheckout} />
                            )}
                            {activeDrawer === 'favorites' && (
                                <DrawerFavorites
                                    isOpen={true}
                                    onClose={() => setActiveDrawer(null)}
                                    favoriteProducts={productsData.filter((p) => favorites.includes(p.id))}
                                    onAddToCart={addToCart}
                                    onToggleFavorite={toggleFavorite}
                                    setNotification={setNotification}
                                />
                            )}
                            {activeDrawer === 'tracking' && (
                                <DrawerTracking
                                    isOpen={true}
                                    onClose={() => setActiveDrawer(null)}
                                    trackingCode={trackingCode}
                                    setTrackingCode={setTrackingCode}
                                    trackingResult={trackingResult}
                                    setTrackingResult={setTrackingResult}
                                />
                            )}
                        </Suspense>
                    </div>
                </div>

                {/* Announcement Bar */}
                <AnnouncementBar />

                {/* Header */}
                <Header
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    setSelectedCategory={setSelectedCategory}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                    setActiveDrawer={setActiveDrawer}
                    favorites={favorites}
                    cartCount={cartCount}
                    setActiveModal={openModal}
                    selectedCategory={selectedCategory}
                    handleMenuClick={handleMenuClick}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    navigateToDashboard={() => navigate('/minha-conta')}
                />

                {/* Main Content - Router Outlet */}
                <main id="main-content" tabIndex="-1">
                    <Outlet context={{
                        user,
                        isLoggedIn,
                        setIsLoggedIn,
                        setUser,
                        setActiveDrawer,
                        setTrackingCode,
                        selectedCategory,
                        setSelectedCategory,
                        searchQuery,
                        setSearchQuery
                    }} />
                </main>

                {/* Quick View Modal */}
                {selectedProduct && isQuickView && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => { setSelectedProduct(null); setIsQuickView(false); }}>
                        <Suspense fallback={<div className="w-12 h-12 border-4 border-white border-t-pink-500 rounded-full animate-spin"></div>}>
                            <ProductDetails product={selectedProduct} onClose={() => { setSelectedProduct(null); setIsQuickView(false); }} onAddToCart={addToCart} isModal={true} />
                        </Suspense>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                        <div className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col overflow-y-auto mobile-scroll safe-top safe-bottom">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-pink-500">{t('common.menu') || 'Menu'}</span>
                                    <LanguageSelector />
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 touch-target" aria-label={t('aria.closeMenu')}><X className="w-7 h-7 text-slate-400" /></button>
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
                            <nav className="space-y-2 text-lg font-medium text-slate-600 flex-1">
                                {mainMenu.map((item, index) => (
                                    <button key={index} onClick={() => handleMenuClick(item)} className="flex w-full items-center justify-between hover:text-pink-500 py-3 px-2 border-b border-slate-50 last:border-0 text-left rounded-lg hover:bg-pink-50 transition-colors touch-target">
                                        {t(item.translationKey) || item.label} <ChevronRight className={`w-5 h-5 text-slate-300 ${t('direction') === 'rtl' ? 'rotate-180' : ''}`} />
                                    </button>
                                ))}
                            </nav>
                            {/* Footer Mobile */}
                            <div className="pt-6 mt-4 border-t border-slate-100">
                                <button onClick={() => { openModal('login'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-sky-600 font-semibold text-left py-3 w-full touch-target">
                                    <User className="w-5 h-5" /> {t('nav.account')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications */}
                {notification && (
                    <div className="fixed top-24 right-4 z-[90] bg-white shadow-xl rounded-xl p-4 border-l-4 border-pink-400 animate-bounce-in flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                        <span className="font-medium text-slate-700">{notification}</span>
                    </div>
                )}

                {/* Cookie Banner */}
                <CookieBanner />

                {/* Floating WhatsApp */}
                <FloatingWhatsApp />
                <ReloadPrompt />

                {/* Footer */}
                <Footer setSelectedCategory={setSelectedCategory} setActiveDrawer={setActiveDrawer} setActiveModal={openModal} />
            </div>
        </HelmetProvider>
    );
}
