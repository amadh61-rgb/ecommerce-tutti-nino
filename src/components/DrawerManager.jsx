import React, { Suspense, lazy } from 'react';
import { useModal } from '../hooks/useModal';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useI18n } from '../hooks/useI18n';
import { productsData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

// Lazy load drawers
const DrawerCart = lazy(() => import('./DrawerCart'));
const DrawerFavorites = lazy(() => import('./DrawerFavorites'));
const DrawerTracking = lazy(() => import('./DrawerTracking'));

export default function DrawerManager() {
    const {
        activeDrawer,
        closeDrawer,
        trackingCode,
        setTrackingCode,
        trackingResult,
        setTrackingResult,
        showNotification
    } = useModal();

    const { cartItems, removeFromCart } = useCart();
    const { favorites, toggleFavorite, addToCart } = useFavorites();
    const navigate = useNavigate();

    const handleCheckout = () => {
        closeDrawer();
        navigate('/checkout');
    };

    if (!activeDrawer) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            {activeDrawer && (
                <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={closeDrawer} />
            )}
            <div
                className={`absolute top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 transform ${activeDrawer ? 'translate-x-0' : '-translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${activeDrawer}-title`}
                dir={useI18n().isRTL ? 'rtl' : 'ltr'}
            >
                <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" /></div>}>
                    {activeDrawer === 'cart' && (
                        <DrawerCart
                            isOpen={true}
                            onClose={closeDrawer}
                            cartItems={cartItems}
                            onRemoveFromCart={removeFromCart}
                            onCheckout={handleCheckout}
                        />
                    )}
                    {activeDrawer === 'favorites' && (
                        <DrawerFavorites
                            isOpen={true}
                            onClose={closeDrawer}
                            favoriteProducts={productsData.filter((p) => favorites.includes(p.id))}
                            onAddToCart={addToCart}
                            onToggleFavorite={toggleFavorite}
                            setNotification={(msg) => showNotification(msg, 'success')}
                        />
                    )}
                    {activeDrawer === 'tracking' && (
                        <DrawerTracking
                            isOpen={true}
                            onClose={closeDrawer}
                            trackingCode={trackingCode}
                            setTrackingCode={setTrackingCode}
                            trackingResult={trackingResult}
                            setTrackingResult={setTrackingResult}
                        />
                    )}
                </Suspense>
            </div>
        </div>
    );
}
