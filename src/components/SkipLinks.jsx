// src/components/SkipLinks.jsx
import React from 'react';

/**
 * Skip Links para acessibilidade
 * Permite usuários de teclado/leitores de tela pular para o conteúdo principal
 */
export default function SkipLinks() {
    return (
        <div className="sr-only focus-within:not-sr-only">
            <a
                href="#main-content"
                className="fixed top-0 left-0 z-[100] bg-pink-500 text-white px-4 py-2 font-bold rounded-br-lg transform -translate-y-full focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
            >
                Pular para o conteúdo principal
            </a>
            <a
                href="#products-grid"
                className="fixed top-0 left-48 z-[100] bg-sky-500 text-white px-4 py-2 font-bold rounded-br-lg transform -translate-y-full focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-500"
            >
                Ir para produtos
            </a>
        </div>
    );
}
