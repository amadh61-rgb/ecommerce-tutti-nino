// src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import { productsData } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import SEO from '../components/SEO';
import { generateSlug } from '../utils/slug';

export default function ProductPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const product = productsData.find((p) => generateSlug(p.name) === slug);

    useEffect(() => {
        if (!product) {
            navigate('/404', { replace: true });
        }
    }, [product, navigate]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <SEO
                title={product.name}
                description={product.description}
                image={product.image}
                product={product}
                type="product"
            />
            <div className="min-h-screen bg-white md:bg-slate-50 animate-fade-in relative z-10 w-full">
                <div className="w-full">
                    <ProductDetails
                        product={product}
                        onClose={() => navigate('/')}
                        onAddToCart={addToCart}
                        isModal={false}
                    />
                </div>
            </div>
        </>
    );
}
