import React from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

function DrawerFavorites({ isOpen, onClose, favoriteProducts, onAddToCart, onToggleFavorite, setNotification }) {
    const { t, formatCurrency, getProductData } = useI18n();

    if (!isOpen) return null;

    const addAllToCart = () => {
        favoriteProducts.forEach(p => onAddToCart(p));
        setNotification(t('products.addedToCart'));
    };

    return (
        <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-purple-50/50">
                <h2 id="favorites-title" className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-500" /> {t('favorites.title')}
                </h2>
                <button onClick={onClose} className="p-3 hover:bg-white rounded-full transition-colors text-slate-500 touch-target close-btn-mobile" aria-label={t('common.close')}>
                    <X className="w-7 h-7" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {favoriteProducts.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center opacity-60">
                        <Heart className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-lg font-medium">{t('favorites.empty')}</p>
                        <p className="text-sm">{t('favorites.emptyMessage')}</p>
                    </div>
                ) : (
                    favoriteProducts.map(item => (
                        <div key={item.id} className="flex gap-4 items-center animate-fade-in p-2 hover:bg-slate-50 rounded-xl transition-colors mb-2">
                            <img src={item.image} alt={getProductData(item.id, 'name') || item.name} className="w-20 h-20 rounded-xl object-cover bg-slate-50 border border-slate-100" />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{getProductData(item.id, 'name') || item.name}</h4>
                                <p className="font-bold text-pink-600 text-sm">
                                    {formatCurrency(item.price)}
                                </p>
                                <button
                                    onClick={() => onAddToCart(item)}
                                    className="text-xs mt-2 px-3 py-1.5 bg-slate-800 text-white rounded-full hover:bg-pink-500 transition-colors flex items-center gap-1 w-fit"
                                >
                                    <ShoppingBag className="w-3 h-3" /> {t('products.addToCart')}
                                </button>
                            </div>
                            <button onClick={(e) => onToggleFavorite(e, item.id)} className="text-pink-500 hover:text-pink-600 p-2">
                                <Heart className="w-5 h-5 fill-pink-500" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {favoriteProducts.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50">
                    <button
                        onClick={addAllToCart}
                        className="w-full py-4 border border-slate-300 text-slate-700 font-bold rounded-full hover:bg-slate-100 transition-all"
                    >
                        {t('favorites.addAllToCart')}
                    </button>
                </div>
            )}
        </>
    );
}
export default React.memo(DrawerFavorites);
