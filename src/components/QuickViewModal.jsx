// src/components/QuickViewModal.jsx
import React from 'react';
import { X, Heart, ShoppingBag, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateSlug } from '../utils/slug';
import { useI18n } from '../hooks/useI18n';

/**
 * Modal de visualização rápida do produto
 * Permite ver detalhes sem sair da página
 */
function QuickViewModal({
    product,
    isOpen,
    onClose,
    onAddToCart,
    onToggleFavorite,
    isFavorite
}) {
    const navigate = useNavigate();
    const { formatCurrency, t, getProductData } = useI18n();

    // Translated data
    const productName = getProductData(product?.id, 'name') || product?.name;
    const productDescription = getProductData(product?.id, 'description') || product?.description;
    const productBadge = getProductData(product?.id, 'badge') || product?.badge;
    const productCategory = getProductData(product?.id, 'category') || product?.category;

    // Fechar com Escape
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (isOpen && e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose, isOpen]);

    // Bloquear scroll do body
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const productSlug = generateSlug(product.name);

    // Fechar ao clicar no overlay
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleViewDetails = (e) => {
        e.preventDefault();
        onClose();
        // Pequeno delay para garantir que o modal feche antes de navegar
        setTimeout(() => {
            navigate(`/produto/${productSlug}`);
            window.scrollTo(0, 0);
        }, 100);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
        >
            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-up">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h2 id="quickview-title" className="font-bold text-slate-800">
                        {t('products.quickView')} 👀
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                        aria-label={t('aria.close')}
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row overflow-y-auto max-h-[calc(90vh-80px)]">
                    {/* Imagem */}
                    <div className="md:w-1/2 aspect-square bg-slate-50 flex-shrink-0">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Detalhes */}
                    <div className="md:w-1/2 p-6 flex flex-col">
                        {/* Badge */}
                        {productBadge && (
                            <span className="inline-block w-fit px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full mb-3">
                                {productBadge}
                            </span>
                        )}

                        {/* Nome */}
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            {productName}
                        </h3>

                        {/* Categoria */}
                        <span className="text-sm text-slate-400 mb-3">
                            {productCategory}
                        </span>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < product.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-slate-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-slate-500">
                                ({product.reviews} avaliações)
                            </span>
                        </div>

                        {/* Descrição */}
                        <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                            {productDescription}
                        </p>

                        {/* Preço */}
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-slate-800">
                                {formatCurrency(product.price)}
                            </span>
                            <span className="text-sm text-green-600 ml-2">
                                {t('products.installments', { installments: 3, amount: formatCurrency(product.price / 3) })}
                            </span>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={() => {
                                    onAddToCart();
                                    onClose();
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {t('products.addToCart')}
                            </button>
                            <button
                                onClick={onToggleFavorite}
                                className={`p-3 rounded-xl border-2 transition-all ${isFavorite
                                    ? 'bg-pink-50 border-pink-300 text-pink-500'
                                    : 'border-slate-200 text-slate-400 hover:border-pink-300 hover:text-pink-500'
                                    }`}
                                aria-label={isFavorite ? t('aria.removeFromFavorites') : t('aria.addToFavorites')}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-pink-500' : ''}`} />
                            </button>
                        </div>

                        {/* Link para página completa */}
                        <button
                            onClick={handleViewDetails}
                            className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-pink-500 transition-colors w-full py-2"
                        >
                            {t('products.viewDetails')}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(QuickViewModal);
