import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateSlug } from '../utils/slug';
import { useI18n } from '../hooks/useI18n';

function ProductQuickView({ product, onClose, onAddToCart }) {
    const navigate = useNavigate();
    const { t, isRTL, formatCurrency, getProductData } = useI18n();

    if (!product) return null;

    // Translated product data
    const productName = getProductData(product.id, 'name') || product.name;
    const productDescription = getProductData(product.id, 'description') || product.description;
    const productBadge = getProductData(product.id, 'badge') || product.badge;

    const handleViewDetails = () => {
        const slug = generateSlug(product.name);
        if (onClose) onClose();
        navigate(`/produto/${slug}`);
    };

    return (
        <div
            className="bg-white w-full flex flex-col md:flex-row md:rounded-3xl h-full md:h-auto md:max-h-[85vh] max-w-5xl overflow-hidden shadow-none md:shadow-2xl relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Image Section */}
            <div className="md:w-1/2 bg-slate-50 relative flex items-center justify-center p-8 order-first md:order-last">
                <img
                    src={product.image}
                    alt={productName}
                    className="max-h-[60vh] max-w-full object-contain filter drop-shadow-xl"
                />
                <button
                    onClick={onClose}
                    className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10 shadow-sm md:hidden`}
                >
                    <X className="w-5 h-5 text-slate-500" />
                </button>
            </div>

            {/* Content Section - Scrollable */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col gap-4 overflow-y-auto">
                {/* Close Button Desktop - Hidden here because ModalManager handles it usually, but keeping for safety if used standalone or inside full screen mobile */}
                <button
                    onClick={onClose}
                    className="self-end p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors hidden md:block opacity-0 pointer-events-none" // Hidden visually but keeping structure matching original if needed
                    aria-label={t('common.close')}
                >
                    <X className="w-5 h-5 text-slate-500" />
                </button>

                <div>
                    {productBadge && (
                        <span className="inline-block px-3 py-1 bg-pink-500 text-white text-[10px] font-bold rounded-full mb-2 shadow-sm">
                            {productBadge}
                        </span>
                    )}
                    <h1 className="text-xl font-bold text-slate-800 leading-tight">
                        {productName}
                    </h1>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                    {productDescription}
                </p>

                <div className="flex items-center justify-between pt-2 gap-3 mt-auto border-t border-slate-100 pt-4">
                    <div className="text-2xl font-bold text-slate-800">
                        {formatCurrency(product.price)}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleViewDetails}
                            className="px-3 py-2 bg-slate-100 text-slate-700 font-bold rounded-full hover:bg-slate-200 transition-colors text-xs"
                        >
                            {t('products.viewDetails')}
                        </button>
                        <button
                            onClick={() => onAddToCart(product)}
                            className="px-4 py-2 bg-slate-800 text-white font-bold rounded-full hover:bg-pink-500 transition-colors shadow-lg flex items-center gap-2 text-xs"
                        >
                            <ShoppingBag className="w-3 h-3" />
                            <span>{t('products.addToCart')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProductQuickView);
