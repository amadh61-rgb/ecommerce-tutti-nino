// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import InfoStrip from '../components/InfoStrip';
import { productsData, testimonials } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useModal } from '../hooks/useModal';
import { Smile } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import NewsletterForm from '../components/NewsletterForm';

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('categoria') || 'Todos';
    const searchParam = searchParams.get('busca') || '';

    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [searchQuery, setSearchQuery] = useState(searchParam);

    const [activeTestimonial, setActiveTestimonial] = useState(0); // Novo state para testemunhos

    const { addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();
    const { openModal } = useModal();
    const { t } = useI18n();

    // Update URL when category/search changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategory !== 'Todos') params.set('categoria', selectedCategory);
        if (searchQuery) params.set('busca', searchQuery);
        setSearchParams(params, { replace: true });
    }, [selectedCategory, searchQuery, setSearchParams]);

    // Filter products
    const filteredProducts = React.useMemo(() => {
        let result = productsData;
        if (selectedCategory !== 'Todos') {
            result = result.filter((p) => {
                if (selectedCategory === 'Marcadores') return p.category === 'Marcadores de Livro';
                if (selectedCategory === 'Casa') return p.category === 'Artigos para Casa';
                return p.category === selectedCategory;
            });
        }
        if (searchQuery.trim() !== '') {
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return result;
    }, [selectedCategory, searchQuery]);

    // Category mapping for translation
    const getCategoryTranslation = (cat) => {
        const map = {
            'Todos': 'all',
            'Marcadores': 'bookmarks',
            'Casa': 'home',
            'Planners': 'planners',
            'Papelaria': 'stationery',
            'Adesivos': 'stickers',
            'Cadernos': 'notebooks',
            'Canetas': 'pens',
            'Acessórios': 'accessories',
            'Kits': 'kits',
            'Coleções': 'collections'
        };
        const key = map[cat] || cat.toLowerCase();
        return t(`products.categories.${key}`) || cat;
    };

    return (
        <>
            {/* Hero & Info Banner Wrapper */}
            <div className="bg-gradient-to-b from-[#ec4a9a] to-[#fdebf5]">
                <Hero setSelectedCategory={setSelectedCategory} />
                <InfoStrip />
            </div>

            {/* Product Grid */}
            <section id="products-grid" className="py-16 bg-[#F9F9F9] min-h-[600px]">
                <div className="container mx-auto px-4">
                    {/* Header da Seção */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-cookie text-[#880E4F] mb-4 relative inline-block animate-fade-in"
                            style={{ textShadow: "3px 3px 0px rgba(253, 226, 243, 1)" }}
                        >
                            {searchQuery
                                ? t('home.searchTitle', { query: searchQuery })
                                : selectedCategory === 'Todos'
                                    ? t('home.weekHighlights')
                                    : getCategoryTranslation(selectedCategory)}
                        </h2>
                        {/* Elemento decorativo subtil (opcional) */}
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-2 rounded-full opacity-60"></div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 text-slate-400 animate-fade-in">
                            <div className="bg-white inline-block p-6 rounded-full mb-4 shadow-sm">
                                <Smile className="w-12 h-12 text-slate-300" />
                            </div>
                            <p className="text-xl font-medium">{t('home.noResultsTitle')}</p>
                            <p className="text-sm mt-2">{t('home.noResultsDesc')}</p>
                            <button
                                onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                                className="mt-6 text-pink-500 font-bold hover:underline"
                            >
                                {t('home.viewAll')}
                            </button>
                        </div>
                    ) : (
                        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8 mobile-scroll snap-x snap-mandatory sm:pb-0 sm:mx-0 sm:px-0 scrollbar-hide">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isFavorite={favorites.includes(product.id)}
                                    onToggleFavorite={(e) => toggleFavorite(e, product.id)}
                                    onAddToCart={(qty) => addToCart({ ...product, qty: qty || 1 })}
                                    onQuickView={() => openModal('quickview', product)}
                                />
                            ))}
                        </div>
                    )}


                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-[#FFF0F5]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-cookie text-slate-800 mb-4 whitespace-nowrap overflow-hidden text-ellipsis px-4"
                            style={{ textShadow: "2px 2px 0px rgba(255,255,255,0.5)" }}
                        >
                            {t('testimonials.title')}
                        </h2>
                        <p className="text-slate-500 font-lato">{t('testimonials.subtitle')}</p>
                    </div>

                    <div
                        className="flex overflow-x-auto pt-8 pb-6 -mx-4 px-4 md:grid md:grid-cols-3 gap-6 md:gap-8 mobile-scroll snap-x snap-mandatory md:pb-0 md:mx-0 md:px-0 scrollbar-hide"
                        onScroll={(e) => {
                            const scrollLeft = e.currentTarget.scrollLeft;
                            const width = e.currentTarget.offsetWidth;
                            const index = Math.round(scrollLeft / width);
                            setActiveTestimonial(index);
                        }}
                    >
                        {testimonials.map((t) => (
                            <TestimonialCard key={t.id} data={t} />
                        ))}
                    </div>

                    {/* Dots Indicator (Mobile Only) */}
                    <div className="flex md:hidden justify-center gap-2 mt-4">
                        {testimonials.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'bg-pink-500 w-6' : 'bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 bg-[#FFF0F5]">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h2 className="text-5xl font-cookie text-[#880E4F] mb-4">{t('newsletter.title')}</h2>
                    <p className="text-slate-600 mb-8 font-lato">{t('newsletter.subtitle')}</p>
                    <NewsletterForm />
                </div>
            </section>
        </>
    );
}
