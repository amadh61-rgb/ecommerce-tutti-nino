import React, { Suspense, lazy } from 'react';
import { useModal } from '../hooks/useModal';
import { X } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useCart } from '../hooks/useCart';

// Import Modals (Keep small modals static or lazy? Small ones are fine static)
import LoginModal from './modals/LoginModal';
import ContactModal from './modals/ContactModal';
import PrivacyModal from './modals/PrivacyModal';
import TermsModal from './modals/TermsModal';
import ShippingModal from './modals/ShippingModal';
import FaqModal from './modals/FaqModal';

// Lazy load large components
const ProductDetails = lazy(() => import('./ProductDetails'));

export default function ModalManager({ onLoginSuccess }) {
    const { activeModal, closeModal, modalData } = useModal();
    const { t } = useI18n();
    const { addToCart } = useCart();

    if (!activeModal) return null;

    const renderModalContent = () => {
        switch (activeModal) {
            case 'login':
                return <LoginModal onLoginSuccess={onLoginSuccess} />;
            case 'contact':
                return <ContactModal />;
            case 'privacy':
                return <PrivacyModal />;
            case 'terms':
            case 'returns':
                return <TermsModal />;
            case 'shipping':
                return <ShippingModal />;
            case 'faq':
                return <FaqModal />;
            case 'quickview':
                return (
                    <Suspense fallback={<div className="p-12 flex justify-center"><div className="w-12 h-12 border-4 border-slate-200 border-t-pink-500 rounded-full animate-spin"></div></div>}>
                        <ProductDetails
                            product={modalData}
                            onClose={closeModal}
                            onAddToCart={addToCart}
                            isModal={true}
                        />
                    </Suspense>
                );
            default:
                return null;
        }
    };

    // Special wrapper for Quick View (Product Details) to avoid standard modal wrapper if needed, 
    // OR just reuse the wrapper. ProductDetails usually has its own layout?
    // In MainLayout, ProductDetails was wrapped in a div with backdrop.
    // Here ModalManager wraps everything in a div with backdrop.
    // BUT ProductDetails might trigger its own styles.
    // MainLayout: <div className="fixed inset-0 ... bg-slate-900/40 backdrop-blur-sm ..."> <ProductDetails ... /> </div>
    // ModalManager: <div className="fixed inset-0 ... bg-slate-900/50 block ..."> <div className="bg-white ..."> {content} </div> </div>
    // ProductDetails implies it is a full card.
    // If I use the standard ModalManager wrapper (white rounded-3xl box), it might double wrap ProductDetails or constrain it.
    // ProductDetails usually expects to be THE card.
    // Let's check ProductDetails code if I can.
    // Assuming ProductDetails is a full component.
    // If activeModal is quickview, I might want a different wrapper or no wrapper (if ProductDetails handles it).
    // MainLayout had a wrapper around ProductDetails.
    // ModalManager has a wrapper around renderModalContent.
    // The wrapper in ModalManager is "max-w-md". QuickView usually needs "max-w-4xl" or similar.
    // I should adjust the wrapper width based on modal type.

    const isQuickView = activeModal === 'quickview';
    const maxWidthClass = isQuickView ? 'max-w-4xl' : 'max-w-md';

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={`bg-white rounded-3xl w-full ${maxWidthClass} overflow-hidden shadow-2xl relative animate-scale-up`}>
                <button onClick={closeModal} className="absolute top-4 right-4 z-10 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors" aria-label={t('aria.closeModal')}>
                    <X className="w-6 h-6 text-slate-500" />
                </button>
                {renderModalContent()}
            </div>
        </div>
    );
}
