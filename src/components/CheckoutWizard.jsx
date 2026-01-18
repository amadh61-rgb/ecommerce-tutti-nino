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
    const [_paymentData, setPaymentData] = useState(null);
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
                <div className="container mx-auto px-4 py-4">
                    {/* Back Button */}
                    <button
                        onClick={step === 1 ? onBack : () => setStep(step - 1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-pink-500 font-medium transition-colors mb-4"
                    >
                        <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        {t('checkout.buttons.back')}
                    </button>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center">
                        {/* Step 1 - Address */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 1 ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-slate-200 text-slate-500'}`}>
                                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${step >= 1 ? 'text-pink-600' : 'text-slate-400'}`}>
                                {t('checkout.steps.address')}
                            </span>
                        </div>

                        {/* Line 1-2 */}
                        <div className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-all ${step >= 2 ? 'bg-pink-500' : 'bg-slate-200'}`}></div>

                        {/* Step 2 - Payment */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 2 ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-slate-200 text-slate-500'}`}>
                                {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${step >= 2 ? 'text-pink-600' : 'text-slate-400'}`}>
                                {t('checkout.steps.payment')}
                            </span>
                        </div>

                        {/* Line 2-3 */}
                        <div className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-all ${step >= 3 ? 'bg-green-500' : 'bg-slate-200'}`}></div>

                        {/* Step 3 - Confirmation */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 3 ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-slate-200 text-slate-500'}`}>
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className={`text-xs mt-2 font-medium ${step >= 3 ? 'text-green-600' : 'text-slate-400'}`}>
                                {t('checkout.steps.confirmation')}
                            </span>
                        </div>
                    </div>
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
