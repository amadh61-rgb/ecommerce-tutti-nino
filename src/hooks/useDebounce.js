// src/hooks/useDebounce.js
import { useState, useEffect, useRef } from 'react';

/**
 * Hook de debounce para otimizar inputs de busca e outros campos
 * Evita re-renders e requisições excessivas
 * 
 * @param {any} value - Valor a ser "debounced"
 * @param {number} delay - Delay em ms (padrão: 300)
 * @returns {any} Valor após o delay
 */
export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Hook de debounce para callbacks/funções
 * Útil para handlers de eventos que não devem ser chamados frequentemente
 * 
 * @param {Function} callback - Função a ser "debounced"
 * @param {number} delay - Delay em ms (padrão: 300)
 * @returns {Function} Função debounced
 */
export function useDebouncedCallback(callback, delay = 300) {
    const [timeoutId, setTimeoutId] = useState(null);

    const debouncedCallback = (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            callback(...args);
        }, delay);

        setTimeoutId(newTimeoutId);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return debouncedCallback;
}

/**
 * Hook de throttle - garante que a função seja chamada no máximo uma vez por período
 * 
 * @param {any} value - Valor a ser "throttled"
 * @param {number} limit - Limite em ms (padrão: 300)
 * @returns {any} Valor "throttled"
 */
export function useThrottle(value, limit = 300) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(0);
    const isFirstRun = useRef(true);

    useEffect(() => {
        // Skip initial render - just track the time
        if (isFirstRun.current) {
            isFirstRun.current = false;
            lastRan.current = Date.now();
            return;
        }

        const now = Date.now();
        const timeSinceLastRan = now - lastRan.current;

        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= limit) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, Math.max(0, limit - timeSinceLastRan));

        return () => {
            clearTimeout(handler);
        };
    }, [value, limit]);

    return throttledValue;
}
