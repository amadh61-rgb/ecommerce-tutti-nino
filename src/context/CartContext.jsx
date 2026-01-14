// src/context/CartContext.jsx
import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { CART_CONFIG } from '../config/constants';

export const CartContext = createContext(null);

// Usar constantes centralizadas
const CART_STORAGE_KEY = CART_CONFIG.STORAGE_KEY;
const CART_MAX_ITEMS = CART_CONFIG.MAX_ITEMS;
const CART_MAX_QUANTITY = CART_CONFIG.MAX_QUANTITY_PER_ITEM;

/**
 * Valida estrutura de um item do carrinho
 * Previne injeção de dados maliciosos via localStorage
 */
function validateCartItem(item) {
    if (!item || typeof item !== 'object') return null;

    // Validar campos obrigatórios
    if (typeof item.id !== 'number' || item.id <= 0) return null;
    if (typeof item.name !== 'string' || item.name.length === 0 || item.name.length > 200) return null;
    if (typeof item.price !== 'number' || item.price < 0 || item.price > 100000) return null;
    if (typeof item.qty !== 'number' || item.qty <= 0 || item.qty > CART_MAX_QUANTITY) return null;

    // Sanitizar e retornar apenas campos necessários
    return {
        id: Math.floor(item.id),
        name: String(item.name).slice(0, 200).replace(/<[^>]*>/g, ''), // Remove HTML
        price: Math.abs(Number(item.price)),
        qty: Math.min(Math.floor(item.qty), CART_MAX_QUANTITY),
        image: typeof item.image === 'string' ? item.image.slice(0, 500) : '',
        category: typeof item.category === 'string' ? item.category.slice(0, 100) : ''
    };
}

/**
 * Carrega e valida carrinho do localStorage
 */
function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (!saved) return [];

        const parsed = JSON.parse(saved);

        // Validar que é um array
        if (!Array.isArray(parsed)) return [];

        // Validar cada item e limitar quantidade
        const validItems = parsed
            .slice(0, CART_MAX_ITEMS)
            .map(validateCartItem)
            .filter(Boolean);

        return validItems;
    } catch {
        // Se falhar, limpar dados corrompidos
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
    }
}

/**
 * Salva carrinho no localStorage com validação
 */
function saveCartToStorage(items) {
    try {
        // Validar antes de salvar
        const validItems = items
            .slice(0, CART_MAX_ITEMS)
            .map(validateCartItem)
            .filter(Boolean);

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validItems));
    } catch {
        // Falha silenciosa (localStorage cheio, etc)
    }
}

export const CartProvider = ({ children }) => {
    // Inicializar do localStorage com validação
    const [cartItems, setCartItems] = useState(loadCartFromStorage);

    // Persistir no localStorage quando mudar
    useEffect(() => {
        saveCartToStorage(cartItems);
    }, [cartItems]);

    const addToCart = useCallback((product) => {
        // Validar produto antes de adicionar
        const validProduct = validateCartItem({ ...product, qty: 1 });
        if (!validProduct) return;

        setCartItems((prev) => {
            // Verificar limite de itens
            if (prev.length >= CART_MAX_ITEMS) {
                return prev;
            }

            const existing = prev.find((item) => item.id === validProduct.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === validProduct.id
                        ? { ...item, qty: Math.min(item.qty + 1, CART_MAX_QUANTITY) }
                        : item
                );
            }
            return [...prev, validProduct];
        });
    }, []);

    const removeFromCart = useCallback((id) => {
        if (typeof id !== 'number') return;
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id, qty) => {
        if (typeof id !== 'number') return;
        if (typeof qty !== 'number' || qty < 0) return;

        setCartItems((prev) => {
            if (qty <= 0) {
                return prev.filter((item) => item.id !== id);
            }
            return prev.map((item) =>
                item.id === id
                    ? { ...item, qty: Math.min(Math.floor(qty), CART_MAX_QUANTITY) }
                    : item
            );
        });
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const cartTotal = useMemo(
        () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
        [cartItems]
    );

    const cartCount = useMemo(
        () => cartItems.reduce((acc, item) => acc + item.qty, 0),
        [cartItems]
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
