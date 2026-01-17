import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data/mockData';
import { generateSlug } from '../utils/slug';
import ProductCard from '../components/ProductCard';
import { useI18n } from '../hooks/useI18n';
import SEO from '../components/SEO';
import { Home } from 'lucide-react';
import CategoryToolbar from '../components/CategoryToolbar';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useModal } from '../hooks/useModal';

export default function CategoryPage() {
    const { slug } = useParams();
    const { t } = useI18n();
    const { addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();
    const { openModal } = useModal();

    // State for Toolbar
    const [sortOption, setSortOption] = useState('relevance');

    // Encontrar a categoria baseada no slug
    const categoryName = useMemo(() => {
        const product = productsData.find(p => generateSlug(p.category) === slug);
        return product ? product.category : null;
    }, [slug]);

    const displayTitle = categoryName || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

    // Filter and Sort Logic
    const filteredAndSortedProducts = useMemo(() => {
        let result = productsData.filter(product => generateSlug(product.category) === slug);

        // Apply Sorting
        return result.sort((a, b) => {
            switch (sortOption) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'name-asc': return a.name.localeCompare(b.name);
                default: return 0; // relevance
            }
        });
    }, [slug, sortOption]);

    // Check if category exists
    const hasCategoryProducts = productsData.some(p => generateSlug(p.category) === slug);

    if (!hasCategoryProducts) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <SEO
                    title={`${displayTitle} | Tutti & Nino`}
                    description={`Produtos da categoria ${displayTitle}`}
                />
                <h1 className="text-3xl font-bold text-slate-800 mb-4">{t('common.categoryNotFound') || 'Categoria não encontrada'}</h1>
                <p className="text-slate-600 mb-8">{t('common.noProductsInCategory') || 'Não encontramos produtos nesta categoria.'}</p>
                <Link to="/" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium">
                    <Home className="w-5 h-5" />
                    {t('common.backToHome') || 'Voltar para o início'}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <SEO
                title={`${displayTitle} | Tutti & Nino`}
                description={`Confira nossa seleção de ${displayTitle}. Produtos exclusivos de papelaria fofa.`}
            />

            {/* Toolbar with Breadcrumbs integrated */}
            <CategoryToolbar
                categoryTitle={displayTitle}
                sortOption={sortOption}
                onSortChange={setSortOption}
            />

            {/* Grid de Produtos */}
            <div className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={(e) => toggleFavorite(e, product.id)}
                            onAddToCart={(qty) => addToCart({ ...product, qty: qty || 1 })}
                            onQuickView={() => openModal('quickview', product)}
                        />
                    ))}

                    {filteredAndSortedProducts.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            <p className="text-lg">Nenhum produto encontrado nesta categoria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
