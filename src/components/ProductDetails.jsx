import React, { useState } from 'react';
import { ShoppingBag, X, Play, Minus, Plus, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateSlug } from '../utils/slug';
import { productsData } from '../data/mockData';
import { useI18n } from '../hooks/useI18n';

export default function ProductDetails({ product, onClose, onAddToCart, isModal = false }) {
    const navigate = useNavigate();
    const { t, isRTL, formatCurrency, getProductData } = useI18n();
    const [quantity, setQuantity] = useState(1);
    const [shippingZip, setShippingZip] = useState('');
    const [activeImage, setActiveImage] = useState(product ? product.image : '');

    if (!product) return null;

    // Translated product data
    const productName = getProductData(product.id, 'name') || product.name;
    const productDescription = getProductData(product.id, 'description') || product.description;
    const productBadge = getProductData(product.id, 'badge') || product.badge;
    const productSpecs = getProductData(product.id, 'specs') || product.specs;

    // Mock thumbnails (replicating the main image since we only have one per product in mock data)
    const thumbnails = [product.image, product.image, product.image];

    const handleViewDetails = () => {
        const slug = generateSlug(product.name);
        if (onClose) onClose();
        navigate(`/produto/${slug}`);
    };

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // --- MODAL LAYOUT (Compact - Kept as is for QuickView) ---
    if (isModal) {
        return (
            <div
                className="bg-white w-full flex flex-col md:flex-row md:rounded-3xl h-full md:h-auto md:max-h-[85vh] max-w-5xl overflow-hidden shadow-2xl relative animate-scale-up"
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
                    <button
                        onClick={onClose}
                        className="self-end p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors hidden md:block"
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

    // --- REFERENCE PAGE LAYOUT ---
    return (
        <div className="min-h-screen bg-white animate-fade-in pb-20">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-8">

                {/* TOP SECTION: 2 COLUMNS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">

                    {/* LEFT COLUMN: VISUALS (5 Cols) */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="flex gap-4 h-[500px]">
                            {/* Thumbnails Strip */}
                            <div className="flex flex-col gap-3 w-20 overflow-y-auto py-1 scrollbar-hide">
                                {thumbnails.map((thumb, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-20 h-20 border-2 rounded-lg cursor-pointer transition-all p-1 ${activeImage === thumb && idx === 0 ? 'border-pink-500' : 'border-slate-100 hover:border-pink-300'}`}
                                        onClick={() => setActiveImage(thumb)}
                                    >
                                        <img src={thumb} alt="thumbnail" className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="flex-1 bg-white flex items-center justify-center relative group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Watch Video Button - Centered below image */}
                        <div className="flex justify-center w-full mt-4">
                            <button
                                className="border-2 border-pink-500 text-pink-500 font-bold rounded-lg py-3 px-8 flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors uppercase text-sm tracking-widest"
                                onClick={() => product.video ? window.open(product.video, '_blank') : null}
                            >
                                <Play className="w-5 h-5 fill-current" />
                                {t('products.watchVideo') || 'Assista ao vídeo'}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INFO & BUY (7 Cols) */}
                    <div className="lg:col-span-6 flex flex-col gap-6">

                        {/* Tags */}
                        <div className="flex gap-2">
                            {productBadge && (
                                <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1 uppercase rounded-sm">
                                    {productBadge}
                                </span>
                            )}
                            <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 uppercase rounded-sm">
                                {t('common.featured') || 'Destaque'}
                            </span>
                        </div>

                        {/* Title & Brand */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl text-pink-600 font-normal mb-2 leading-tight">
                                {productName}
                            </h1>
                            <p className="text-slate-500 text-sm">
                                {t('products.brand')}: <span className="text-pink-500 font-bold">Tutti & Nino</span>
                            </p>
                            <p className="text-slate-500 text-sm mt-1">
                                {t('products.availability')}: <span className="text-green-600">{t('products.inStock')}</span>
                            </p>
                            <p className="text-slate-500 text-sm">
                                {t('products.warranty')}: 30 {t('products.days')}
                            </p>
                        </div>

                        <div className="h-px bg-slate-100 w-full" />

                        {/* Price */}
                        <div>
                            <span className="text-slate-400 line-through text-sm">de: R$ {(product.price * 1.2).toFixed(2).replace('.', ',')}</span>
                            <div className="flex items-end gap-2 mb-1">
                                <span className="text-lg text-slate-800 font-bold mb-1">{t('products.priceBy') || 'por:'}</span>
                                <span className="text-4xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
                            </div>
                            <p className="text-pink-600 text-sm font-medium">
                                {t('products.installments', { installments: 3, amount: formatCurrency(product.price / 3) })}
                            </p>
                        </div>



                        {/* Buy Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                            {/* Quantity */}
                            <div className="flex items-center bg-slate-100 rounded-md h-12">
                                <button onClick={() => handleQuantityChange(-1)} className="px-4 h-full text-slate-500 hover:text-pink-600 transition-colors">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center font-bold text-slate-800">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="px-4 h-full text-slate-500 hover:text-pink-600 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Buy Button */}
                            <button
                                onClick={() => onAddToCart({ ...product, quantity })}
                                className="flex-1 bg-pink-600 text-white font-bold h-12 rounded-md hover:bg-pink-700 transition-colors shadow-md text-lg uppercase tracking-wide"
                            >
                                {t('products.buy')}
                            </button>
                        </div>

                        {/* Shipping Calculator */}
                        <div className="mt-6">
                            <h3 className="text-pink-600 font-bold text-sm mb-2">{t('products.shipping.title')}</h3>
                            <div className="flex gap-2 max-w-md">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={shippingZip}
                                        onChange={(e) => setShippingZip(e.target.value)}
                                        placeholder={t('products.shipping.placeholder')}
                                        className={`w-full border border-slate-300 rounded-md ${isRTL ? 'pr-4 pl-10' : 'pl-4 pr-10'} py-2.5 outline-none focus:border-pink-500 transition-colors text-sm`}
                                    />
                                    <Lock className={`w-4 h-4 text-green-500 absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2`} />
                                </div>
                                <button className="px-6 py-2.5 border border-slate-300 text-slate-500 font-bold text-xs uppercase rounded-md hover:bg-slate-50 hover:text-slate-700 transition-colors">
                                    {t('products.shipping.calculate')}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM SECTION: DESCRIPTION (No Tabs) */}
                <div className="mt-20">
                    <div className="border-b border-slate-200 mb-8">
                        <h2 className="text-xl font-bold uppercase tracking-wider text-pink-600 border-b-2 border-pink-600 inline-block pb-4">
                            {t('products.tabs.description')}
                        </h2>
                    </div>

                    <div className="animate-fade-in max-w-7xl mx-auto text-slate-600 leading-relaxed text-justify">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* LEFT: Description Text */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('products.aboutProduct') || 'Sobre o Produto'}</h2>
                                <p>{productDescription}</p>
                                <p>{productDescription}</p>
                                <p>{t('products.productDeveloped') || 'Este produto foi desenvolvido pensando na sua rotina, trazendo praticidade e beleza para o seu dia a dia. Todos os detalhes foram cuidadosamente planejados para oferecer a melhor experiência.'}</p>
                                <p>{t('products.idealGift') || 'Ideal para presentear ou para uso pessoal, combinando funcionalidade com um design exclusivo da Tutti & Nino.'}</p>
                            </div>

                            {/* RIGHT: Specs Table */}
                            <div>
                                {productSpecs && (
                                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                            {t('products.specs')}
                                        </h3>
                                        <div className="space-y-4">
                                            {Object.entries(productSpecs).map(([key, value]) => (
                                                <div key={key} className="flex justify-between border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-100 px-2 rounded-lg transition-colors">
                                                    <span className="font-bold text-slate-500 uppercase text-xs tracking-wider">{key}</span>
                                                    <span className="font-medium text-slate-800 text-right">{value}</span>
                                                </div>
                                            ))}
                                            {product.ean && (
                                                <div className="flex justify-between border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-100 px-2 rounded-lg transition-colors">
                                                    <span className="font-bold text-slate-500 uppercase text-xs tracking-wider">EAN</span>
                                                    <span className="font-mono text-slate-800 text-right">{product.ean}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* RELATED PRODUCTS SECTION */}
            <div className="mt-24 mb-12 border-t border-slate-100 pt-12">
                <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">{t('products.related')}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productsData
                        .filter(p => p.id !== product.id) // Exclude current product
                        .slice(0, 4) // Show only 4
                        .map((relatedProduct) => {
                            const relatedName = getProductData(relatedProduct.id, 'name') || relatedProduct.name;
                            const relatedBadge = getProductData(relatedProduct.id, 'badge') || relatedProduct.badge;
                            return (
                                <div key={relatedProduct.id} className="group cursor-pointer" onClick={() => {
                                    const slug = generateSlug(relatedProduct.name);
                                    navigate(`/produto/${slug}`);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                    <div className="relative overflow-hidden rounded-xl mb-4 bg-white border border-slate-100 p-4 h-[300px] flex items-center justify-center transition-all group-hover:shadow-lg">
                                        <img
                                            src={relatedProduct.image}
                                            alt={relatedName}
                                            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Tags */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            {relatedBadge && (
                                                <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                                    {relatedBadge}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <h3 className="text-slate-700 font-medium group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[48px]">
                                            {relatedName}
                                        </h3>

                                        <div className="flex flex-col items-center">
                                            <span className="text-slate-400 text-xs line-through">
                                                de: {formatCurrency(relatedProduct.price * 1.3)}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500 text-sm">{t('products.priceBy') || 'por'}:</span>
                                                <span className="text-xl font-bold text-pink-600">
                                                    {formatCurrency(relatedProduct.price)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>

        </div>
    );
}
