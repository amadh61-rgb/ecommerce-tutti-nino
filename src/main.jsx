import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ModalProvider } from './context/ModalContext';

import ErrorBoundary from './components/ErrorBoundary'

// Layout
import MainLayout from './layouts/MainLayout';

import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';

// Pages - Eager loading for Home (LCP)
import HomePage from './pages/HomePage';

// Pages - Lazy loading for others
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { I18nProvider, useI18n } from './context/I18nContext';

// Loading Fallback
const PageLoader = () => {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">{t('common.loading') || 'Carregando...'}</p>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <CartProvider>
        <FavoritesProvider>
          <ModalProvider>
            <ErrorBoundary>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/produto/:slug" element={
                      <Suspense fallback={<PageLoader />}>
                        <ProductPage />
                      </Suspense>
                    } />
                    <Route path="/checkout" element={
                      <Suspense fallback={<PageLoader />}>
                        <CheckoutPage />
                      </Suspense>
                    } />
                    <Route path="/404" element={
                      <Suspense fallback={<PageLoader />}>
                        <NotFoundPage />
                      </Suspense>
                    } />
                    <Route path="*" element={
                      <Suspense fallback={<PageLoader />}>
                        <NotFoundPage />
                      </Suspense>
                    } />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ErrorBoundary>
          </ModalProvider>
        </FavoritesProvider>
      </CartProvider>
    </I18nProvider>
  </StrictMode>
)
