import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, Play } from 'lucide-react';
import { generateSlug } from '../utils/slug';
import { useI18n } from '../hooks/useI18n';

const ProductCard = ({ product, isFavorite, onToggleFavorite, onAddToCart, onQuickView }) => {
    const { formatCurrency, getProductData, t } = useI18n();
    /* Estado para animação de carregamento da imagem */
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);
    const productSlug = generateSlug(product.name);

    // Use translated data if available, fallback to original
    const productName = getProductData(product.id, 'name') || product.name;
    const productBadge = getProductData(product.id, 'badge') || product.badge;

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-slate-100 flex flex-col h-full will-change-transform hover:-translate-y-1 min-w-[260px] sm:min-w-0">
            {/* Badge (Mais Vendido / Novo) */}
            {productBadge && (
                <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-20 shadow-md animate-fade-in">
                    {productBadge}
                </span>
            )}

            {/* Botão de Favoritar (Coração) */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite(e);
                }}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-pink-50 transition-colors z-20 group/heart touch-target"
                aria-label={isFavorite ? t('aria.removeFromFavorites') : t('aria.addToFavorites')}
            >
                <Heart
                    className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-pink-500 text-pink-500 scale-110' : 'text-slate-400 group-hover/heart:text-pink-400'}`}
                />
            </button>

            {/* Link para página do produto */}
            <Link to={`/produto/${productSlug}`} className="block">
                {/* Imagem do Produto + Overlay */}
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <img
                        src={product.image}
                        alt={productName}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setIsImageLoaded(true)}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400/fce7f3/ec4899?text=' + encodeURIComponent(product.name.split(' ')[0]);
                        }}
                        className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out image-reveal ${isImageLoaded ? 'loaded' : ''}`}
                    />

                    {/* Overlay de Ações (Desktop) */}
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">

                        {/* Botão Espiar (Quick View) */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickView && onQuickView();
                            }}
                            className="p-3 bg-white text-slate-700 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110 flex items-center justify-center"
                            title={t('aria.quickView')}
                        >
                            <Eye className="w-5 h-5" />
                        </button>



                    </div>
                </div>
                <div className="px-2 pb-2">
                    <h3 className="font-bold text-slate-700 mb-2 line-clamp-1 group-hover:text-pink-500 transition-colors">{productName}</h3>
                </div>
            </Link>

            <div className="px-2 pb-3 mt-auto">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xl font-bold text-slate-800">
                        {formatCurrency(product.price)}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart();
                        }}
                        className="p-2.5 bg-slate-100 text-slate-600 rounded-full hover:bg-sky-400 hover:text-white transition-colors hover:shadow-lg hover:shadow-sky-200 active:scale-95"
                        aria-label={t('aria.addToCart', { product: productName })}
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
                <span className="text-base text-green-600">
                    {t('products.installments', { installments: 3, amount: formatCurrency(product.price / 3) })}
                </span>
            </div>
        </div>
    );
}
export default React.memo(ProductCard);
