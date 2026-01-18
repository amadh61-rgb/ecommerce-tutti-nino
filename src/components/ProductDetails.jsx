import React, { useState } from 'react';
import { ShoppingBag, Play, Minus, Plus, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateSlug } from '../utils/slug';
import { productsData } from '../data/mockData';
import { useI18n } from '../hooks/useI18n';

function ProductDetails({ product, onAddToCart }) {
    const navigate = useNavigate();
    const { t, isRTL, formatCurrency, getProductData } = useI18n();
    const [quantity, setQuantity] = useState(1);
    const [shippingZip, setShippingZip] = useState('');
    const [activeImage, setActiveImage] = useState(product ? product.image : '');

    if (!product) return null;

    // Translated product data
    const productName = getProductData(product.id, 'name') || product.name;
    const productDescription = getProductData(product.id, 'description') || product.description;
    const _productBadge = getProductData(product.id, 'badge') || product.badge;
    const productSpecs = getProductData(product.id, 'specs') || product.specs;

    // Mock thumbnails (replicating the main image since we only have one per product in mock data)
    const thumbnails = [product.image, product.image, product.image];

    // Reference handleViewDetails removed as navigate is straightforward now if needed, but actually page view doesn't navigate to itself.

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

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
                                    <button
                                        key={idx}
                                        className={`w-20 h-20 border-2 rounded-lg cursor-pointer transition-all p-1 ${activeImage === thumb && idx === 0 ? 'border-pink-500' : 'border-slate-100 hover:border-pink-300'}`}
                                        onClick={() => setActiveImage(thumb)}
                                    >
                                        <img src={thumb} alt="thumbnail" className="w-full h-full object-contain" />
                                    </button>
                                ))}

                                {/* Video Button - Added to thumbnails column */}
                                {product.video && (
                                    <button
                                        onClick={() => window.open(product.video, '_blank')}
                                        className="w-20 h-20 border-2 border-pink-100 bg-pink-50 rounded-lg flex flex-col items-center justify-center text-pink-500 hover:bg-pink-100 hover:border-pink-300 transition-colors group/video"
                                        title={t('products.watchVideo')}
                                    >
                                        <Play className="w-8 h-8 fill-current mb-1 group-hover/video:scale-110 transition-transform" />
                                        <span className="text-[10px] font-bold uppercase">Vídeo</span>
                                    </button>
                                )}
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
                    </div>

                    {/* RIGHT COLUMN: INFO & BUY (7 Cols) */}
                    <div className="lg:col-span-6 flex flex-col gap-6">

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
                        <div className="flex flex-row gap-4 mt-2">
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
                                <button key={relatedProduct.id} className="group cursor-pointer text-left" onClick={() => {
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
                                </button>
                            )
                        })}
                </div>
            </div>

        </div>
    );
}
export default React.memo(ProductDetails);
