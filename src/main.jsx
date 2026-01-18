import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';

import ErrorBoundary from './components/ErrorBoundary'

// Layout
import MainLayout from './layouts/MainLayout';

import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';

// Pages - Eager loading for Home (LCP)
import HomePage from './pages/HomePage';

// Pages - Lazy loading for others
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { I18nProvider } from './context/I18nContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <CartProvider>
        <FavoritesProvider>
          <ModalProvider>
            <ThemeProvider>
              <ErrorBoundary>
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                  <ScrollToTop />
                  <Routes>
                    <Route element={<MainLayout />}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/produto/:slug" element={
                        <Suspense fallback={<PageLoader />}>
                          <ProductPage />
                        </Suspense>
                      } />
                      <Route path="/categoria/:slug" element={
                        <Suspense fallback={<PageLoader />}>
                          <CategoryPage />
                        </Suspense>
                      } />
                      <Route path="/dashboard" element={
                        <Suspense fallback={<PageLoader />}>
                          <DashboardPage />
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
            </ThemeProvider>
          </ModalProvider>
        </FavoritesProvider>
      </CartProvider>
    </I18nProvider>
  </StrictMode>
)
