// src/layouts/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import CookieBanner from '../components/CookieBanner';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ReloadPrompt from '../components/ReloadPrompt';
import SEO from '../components/SEO';
import ModalManager from '../components/ModalManager';
import DrawerManager from '../components/DrawerManager'; // New Manager
import SkipLinks from '../components/SkipLinks';
import ErrorBoundary from '../components/ErrorBoundary';
import MobileMenu from '../components/MobileMenu';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

<SkipLinks />

// Preload Routes
const preloadCheckout = () => import('../pages/CheckoutPage');

// Hooks
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useModal } from '../hooks/useModal';
import { useI18n } from '../hooks/useI18n';

// Icons
import { CheckCircle } from 'lucide-react';

export default function MainLayout() {
    const navigate = useNavigate();

    // Context state
    // Correct hook usage:
    const { cartCount } = useCart();
    const { favorites } = useFavorites();
    const {
        openModal,
        closeModal,
        openDrawer,
        notification,
        showNotification,
        trackingCode,
        setTrackingCode,
        trackingResult,
        setTrackingResult
    } = useModal();
    const { t } = useI18n();

    // Local UI state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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

    const handleLoginSuccess = (mockUser) => {
        setIsLoggedIn(true);
        setUser(mockUser);
        showNotification(t('dashboard.welcome', { name: mockUser.name }));
        closeModal();
    };

    // Idle Preload effect
    useEffect(() => {
        const timer = setTimeout(() => {
            preloadCheckout();
        }, 2000);
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

                {/* Managers */}
                <ModalManager onLoginSuccess={handleLoginSuccess} />
                <DrawerManager />

                {/* Announcement Bar */}
                <AnnouncementBar />

                {/* Header */}
                <Header
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    setSelectedCategory={setSelectedCategory}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                    setActiveDrawer={openDrawer} // Mapping openDrawer to setActiveDrawer prop
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
                    <ErrorBoundary>
                        <Outlet context={{
                            user,
                            isLoggedIn,
                            setIsLoggedIn,
                            setUser,
                            setActiveDrawer: openDrawer, // Provide openDrawer as setActiveDrawer
                            setTrackingCode, // From Context
                            selectedCategory,
                            setSelectedCategory,
                            searchQuery,
                            setSearchQuery
                        }} />
                    </ErrorBoundary>
                </main>

                {/* Mobile Menu */}
                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleMenuClick={handleMenuClick}
                    onOpenLogin={() => { openModal('login'); setIsMobileMenuOpen(false); }}
                />

                {/* Notifications - Accessible */}
                {notification && (
                    <div
                        role="alert"
                        aria-live="polite"
                        className="fixed top-24 right-4 z-[90] bg-white shadow-xl rounded-xl p-4 border-l-4 border-pink-400 animate-bounce-in flex items-center gap-3"
                    >
                        <div className={`p-2 rounded-full ${notification.type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
                            <CheckCircle className={`w-5 h-5 ${notification.type === 'error' ? 'text-red-600' : 'text-green-600'}`} aria-hidden="true" />
                        </div>
                        <span className="font-medium text-slate-700">{notification.message || notification}</span>
                    </div>
                )}

                {/* Cookie Banner */}
                <CookieBanner />

                {/* Floating WhatsApp */}
                <FloatingWhatsApp />
                <ReloadPrompt />

                {/* Footer */}
                <Footer setSelectedCategory={setSelectedCategory} setActiveDrawer={openDrawer} setActiveModal={openModal} />

                {/* Vercel Analytics & Speed Insights */}
                <Analytics />
                <SpeedInsights />
            </div>
        </HelmetProvider>
    );
}
