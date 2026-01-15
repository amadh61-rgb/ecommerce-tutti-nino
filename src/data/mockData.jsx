import React from 'react';
import {
    Sticker,
    Bookmark,
    Gift,
    Sparkles,
    Star,
    PenTool
} from 'lucide-react';

// --- DADOS DOS PRODUTOS ---
export const productsData = [
    {
        id: 1,
        name: "Planner Anual 2026 - Bloom",
        category: "Papelaria",
        price: 89.90,
        rating: 5,
        reviews: 124,
        image: "/images/product1.png",
        description: "Organize o seu ano com a delicadeza das flores. Capa dura, gramatura 90g e adesivos exclusivos.",
        badge: "Mais Vendido",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        ean: "7891234560012",
        specs: {
            "Dimensões": "A5 (15 x 21 cm)",
            "Folhas": "200 páginas",
            "Gramatura": "Papel Offset 90g",
            "Capa": "Dura com laminação fosca",
            "Extras": "Bolso duplo de papel + Cartela de adesivos"
        }
    },
    {
        id: 2,
        name: "Pack de Adesivos Vintage",
        category: "Adesivos",
        price: 15.50,
        rating: 5,
        reviews: 89,
        image: "/images/product2.png",
        description: "Cartela com 50 adesivos estilo vintage para decorar o seu bullet journal.",
        badge: "Novo",
        ean: "7891234560029",
        specs: {
            "Quantidade": "50 unidades",
            "Material": "Papel Washi",
            "Acabamento": "Fosco",
            "Tema": "Vintage / Botânico"
        }
    },
    {
        id: 3,
        name: "Marcadores Magnético Celeste",
        category: "Marcadores de Livro",
        price: 12.00,
        rating: 5,
        reviews: 210,
        image: "/images/product3.png",
        description: "Não perca a página! Marcadores magnéticos que não amassam a folha.",
        badge: null,
        ean: "7891234560036",
        specs: {
            "Dimensões": "4 x 5 cm (fechado)",
            "Material": "Papel Couché 300g + Manta Magnética",
            "Quantidade": "Kit com 2 unidades"
        }
    },
    {
        id: 4,
        name: "Washi Tapes - Coleção Sonhos",
        category: "Kits",
        price: 29.90,
        rating: 4,
        reviews: 45,
        image: "/images/product4.png",
        description: "Fitas decorativas japonesas perfeitas para decorações delicadas.",
        badge: null,
        ean: "7891234560043",
        specs: {
            "Quantidade": "Kit com 5 rolos",
            "Largura": "15mm cada",
            "Comprimento": "3 metros por rolo",
            "Material": "Papel de arroz (Washi)"
        }
    },
    {
        id: 5,
        name: "Estojo Multiuso Soft Pink",
        category: "Acessórios",
        price: 55.00,
        rating: 5,
        reviews: 330,
        image: "/images/product5.png",
        description: "Espaçoso e estruturado. Cabe até 100 canetas! Material fácil de limpar.",
        badge: "Promoção",
        ean: "7891234560050",
        specs: {
            "Dimensões": "22 x 15 x 6 cm",
            "Material": "Nylon Impermeável",
            "Cor": "Rosa Soft",
            "Capacidade": "Aprox. 100 canetas"
        }
    },
    {
        id: 6,
        name: "Organizador de Mesa Acrílico",
        category: "Artigos para Casa",
        price: 72.90,
        rating: 4,
        reviews: 67,
        image: "/images/product6.png",
        description: "Deixe a sua mesa linda e organizada com este organizador transparente e rose gold.",
        badge: null,
        ean: "7891234560067",
        specs: {
            "Material": "Acrílico Premium",
            "Dimensões": "30 x 20 x 10 cm",
            "Cor": "Transparente com detalhes Rose Gold",
            "Compartimentos": "6 divisórias"
        }
    },
    {
        id: 7,
        name: "Caderno Pautado Coleção Zodíaco",
        category: "Coleções",
        price: 48.90,
        rating: 5,
        reviews: 512,
        image: "/images/product7.png",
        description: "Edição limitada. Capa com detalhes em foil dourado.",
        badge: null,
        ean: "7891234560074",
        specs: {
            "Tamanho": "Colegial (18 x 24 cm)",
            "Folhas": "80 folhas pautadas",
            "Gramatura": "90g",
            "Capa": "Dura com Hot Stamping Dourado"
        }
    },
    {
        id: 8,
        name: "Caneta Tinteiro Iniciante",
        category: "Papelaria",
        price: 42.00,
        rating: 4,
        reviews: 98,
        image: "/images/product8.png",
        description: "Escrita clássica e suave. Acompanha 2 cartuchos de tinta azul.",
        badge: "Últimas Unidades",
        ean: "7891234560081",
        specs: {
            "Ponta": "Pena Média (0.7mm)",
            "Material do Corpo": "Resina",
            "Recarga": "Cartucho padrão universal",
            "Incluso": "Caneta + 2 Cartuchos Azuis"
        }
    }
];

// --- FILTROS VISUAIS ---
export const quickFilters = [
    { name: "Todos", translationKey: 'products.categories.all', icon: <Star className="w-5 h-5" />, color: "bg-slate-100 text-slate-600" },
    { name: "Marcadores", translationKey: 'products.categories.bookmarks', fullCategory: "Marcadores de Livro", icon: <Bookmark className="w-5 h-5" />, color: "bg-sky-100 text-sky-600" },
    { name: "Adesivos", translationKey: 'products.categories.stickers', icon: <Sticker className="w-5 h-5" />, color: "bg-purple-100 text-purple-600" },
    { name: "Papelaria", translationKey: 'products.categories.stationery', icon: <PenTool className="w-5 h-5" />, color: "bg-pink-100 text-pink-600" },
    { name: "Kits", translationKey: 'products.categories.kits', icon: <Gift className="w-5 h-5" />, color: "bg-teal-100 text-teal-600" },
    { name: "Acessórios", translationKey: 'products.categories.accessories', icon: <Sparkles className="w-5 h-5" />, color: "bg-orange-100 text-orange-600" },
];

export const testimonials = [
    {
        id: 1,
        name: "Ana Clara",
        role: "Estudante de Medicina",
        text: "O Planner Bloom salvou o meu semestre! A qualidade do papel é incrível, posso usar as minhas canetas brush sem medo.",
        avatar: "AC"
    },
    {
        id: 2,
        name: "Marina S.",
        role: "Designer",
        text: "A entrega foi super rápida e veio tudo embalado com cheirinho de morango. A Tutti & Nino ganhou o meu coração!",
        avatar: "MS"
    },
    {
        id: 3,
        name: "Beatriz L.",
        role: "Advogada",
        text: "O Caderno Inteligente é muito prático para as minhas reuniões. Elegante e funcional.",
        avatar: "BL"
    }
];

// --- MENU PRINCIPAL (Mapeado para Categorias) ---
export const mainMenu = [
    { label: "Início", translationKey: 'nav.home', action: "reset" },
    { label: "Marcadores", translationKey: 'products.categories.bookmarks', action: "filter", category: "Marcadores de Livro" },
    { label: "Adesivos", translationKey: 'products.categories.stickers', action: "filter", category: "Adesivos" },
    { label: "Papelaria", translationKey: 'products.categories.stationery', action: "filter", category: "Papelaria" },
    { label: "Kits", translationKey: 'products.categories.kits', action: "filter", category: "Kits" },
    { label: "Acessórios", translationKey: 'products.categories.accessories', action: "filter", category: "Acessórios" }
];

// --- DADOS DO USUÁRIO MOCK ---
export const mockUser = {
    name: "Amada",
    email: "amada@tuttienino.com",
    avatar: "https://ui-avatars.com/api/?name=Amada&background=fbcfe8&color=db2777&bold=true"
};

// --- DADOS DE PEDIDOS MOCK ---
export const mockOrders = [
    {
        id: "PED-9821",
        date: "10/01/2026",
        total: 104.90,
        status: "Em Trânsito",
        trackingCode: "BR123456789",
        items: [
            { name: "Planner Anual 2026 - Bloom", qty: 1, price: 89.90 },
            { name: "Pack de Adesivos Vintage", qty: 1, price: 15.00 }
        ]
    },
    {
        id: "PED-8540",
        date: "15/12/2025",
        total: 55.00,
        status: "Entregue",
        trackingCode: "BR987654321",
        items: [
            { name: "Estojo Multiuso Soft Pink", qty: 1, price: 55.00 }
        ]
    },
    {
        id: "PED-7732",
        date: "02/11/2025",
        total: 121.80,
        status: "Entregue",
        trackingCode: "BR555444333",
        items: [
            { name: "Organizador de Mesa Acrílico", qty: 1, price: 72.90 },
            { name: "Caderno Pautado Coleção Zodíaco", qty: 1, price: 48.90 }
        ]
    }
];
