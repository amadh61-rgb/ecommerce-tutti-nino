import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';

import { useI18n } from '../hooks/useI18n';

import CheckoutAddress from './CheckoutAddress';
import CheckoutPayment from './CheckoutPayment';
import CheckoutSummary from './CheckoutSummary';
import OrderConfirmation from './OrderConfirmation';

export default function CheckoutWizard({ onBack, onComplete }) {
    const { t, isRTL } = useI18n();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
    const [addressData, setAddressData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [orderNumber, setOrderNumber] = useState(null);

    const handleAddressSubmit = (data) => {
        setAddressData(data);
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePaymentSubmit = (data) => {
        setPaymentData(data);
        const newOrderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setOrderNumber(newOrderNumber);

        // Simular processamento
        setTimeout(() => {
            clearCart();
            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-xl font-bold text-slate-800 mb-4">{t('cart.empty')} :(</h2>
                <button onClick={onBack} className="text-pink-500 font-bold hover:underline">
                    {t('cart.continueShopping')}
                </button>
            </div>
        );
    }

    if (step === 3) {
        return <OrderConfirmation orderNumber={orderNumber} onContinueShopping={onComplete} />;
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header Checkout */}
            <header className="bg-white shadow-sm sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="flex items-center gap-2 text-slate-500 hover:text-pink-500 font-medium transition-colors">
                        <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        {step === 1 ? t('checkout.buttons.back') : t('checkout.buttons.back')}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                        <div className={`w-12 h-1 rounded-full ${step >= 2 ? 'bg-pink-500' : 'bg-slate-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                        <div className={`w-12 h-1 rounded-full ${step >= 3 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}><CheckCircle className="w-4 h-4" /></div>
                    </div>
                    <div className="w-20"></div> {/* Spacer for alignment */}
                </div>
            </header>

            <div className="container mx-auto px-4 max-w-6xl py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
                        {step === 1 && <CheckoutAddress onSubmit={handleAddressSubmit} initialData={addressData} />}
                        {step === 2 && <CheckoutPayment onSubmit={handlePaymentSubmit} total={cartTotal} />}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-5">
                        <CheckoutSummary cartItems={cartItems} total={cartTotal} />
                    </div>
                </div>
            </div>
        </div>
    );
}
