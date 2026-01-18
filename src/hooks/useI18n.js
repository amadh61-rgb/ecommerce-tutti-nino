// src/hooks/useI18n.js
import { useContext } from 'react';
import { I18nContext } from '../context/I18nContextDefinition';

/**
 * Hook para acessar funcionalidades de internacionalização
 * @returns {{
 *   locale: string,
 *   locales: string[],
 *   changeLocale: (locale: string) => void,
 *   t: (key: string, params?: object) => string,
 *   formatCurrency: (value: number) => string,
 *   formatDate: (date: Date | string, options?: object) => string,
 *   formatNumber: (value: number) => string
 * }}
 */
export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
