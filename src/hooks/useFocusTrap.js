// src/hooks/useFocusTrap.js
import { useEffect, useRef } from 'react';

/**
 * Hook para prender o foco dentro de um elemento
 * Útil para modais, drawers e menus
 * @param {boolean} isActive - Se o focus trap está ativo
 */
export function useFocusTrap(isActive = false) {
    const containerRef = useRef(null);
    const previousActiveElement = useRef(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        // Salva o elemento que estava focado antes
        previousActiveElement.current = document.activeElement;

        // Elementos focáveis dentro do container
        const getFocusableElements = () => {
            return containerRef.current?.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ) || [];
        };

        // Foca no primeiro elemento focável
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        const handleKeyDown = (e) => {
            if (e.key !== 'Tab') return;

            const focusable = getFocusableElements();
            if (focusable.length === 0) return;

            const firstElement = focusable[0];
            const lastElement = focusable[focusable.length - 1];

            // Shift + Tab: volta para o último elemento
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
            // Tab: vai para o primeiro elemento
            else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            // Restaura o foco ao elemento anterior quando o trap é desativado
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [isActive]);

    return containerRef;
}
