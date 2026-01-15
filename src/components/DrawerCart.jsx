import React from 'react';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

function DrawerCart({ isOpen, onClose, cartItems, onRemoveFromCart, onCheckout }) {
    const { t, formatCurrency, getProductData } = useI18n();
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    if (!isOpen) return null;

    return (
        <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-pink-50/50">
                <h2 id="cart-title" className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-pink-500" /> {t('cart.title')}
                </h2>
                <button onClick={onClose} className="p-3 hover:bg-white rounded-full transition-colors text-slate-500 touch-target close-btn-mobile" aria-label={t('common.close')}>
                    <X className="w-7 h-7" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center opacity-60">
                        <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-lg font-medium">{t('cart.empty')}</p>
                        <p className="text-sm">{t('cart.emptyMessage')}</p>
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} className="flex gap-4 items-center animate-fade-in mb-4">
                            <img src={item.image} srcSet={`${item.image}?w=200 200w, ${item.image}?w=400 400w`} alt={getProductData(item.id, 'name') || item.name} className="w-20 h-20 rounded-xl object-cover bg-slate-50 border border-slate-100" />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{getProductData(item.id, 'name') || item.name}</h4>
                                <p className="text-xs text-sky-500 font-medium mb-1">{getProductData(item.id, 'category') || item.category}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-semibold">
                                        {item.qty}x {formatCurrency(item.price)}
                                    </span>
                                    <button onClick={() => onRemoveFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1" aria-label={t('cart.remove')}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-4 text-lg font-bold text-slate-800">
                    <span>{t('cart.total')}:</span>
                    <span>{formatCurrency(cartTotal)}</span>
                </div>
                <button onClick={onCheckout} className="w-full py-4 bg-slate-800 text-white font-bold rounded-full hover:bg-pink-500 transition-all shadow-lg hover:shadow-pink-200">
                    {t('cart.checkout')}
                </button>
            </div>
        </>
    );
}
export default React.memo(DrawerCart);
