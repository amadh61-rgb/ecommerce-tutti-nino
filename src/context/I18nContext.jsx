// src/context/I18nContext.jsx
import React, { createContext, useState, useCallback, useMemo, useEffect, useContext } from 'react';
import { translations } from '../data/translations';
import { I18N_CONFIG } from '../config/constants';

export const I18nContext = createContext(null);

// Locales suportados (agora vindo das constantes)
export const SUPPORTED_LOCALES = I18N_CONFIG.SUPPORTED_LOCALES;
const DEFAULT_LOCALE = I18N_CONFIG.DEFAULT_LOCALE;
const LOCALE_STORAGE_KEY = 'tutti_nino_locale';

export const I18nProvider = ({ children }) => {
    // Detectar locale do navegador ou usar salvo
    const [locale, setLocale] = useState(() => {
        try {
            const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
            if (saved && SUPPORTED_LOCALES.includes(saved)) {
                return saved;
            }
            // Forçar PT-BR como padrão inicial, ignorando navegador
            return DEFAULT_LOCALE;
        } catch {
            return DEFAULT_LOCALE;
        }
    });

    // Persistir mudanças e configurar direção (RTL/LTR)
    useEffect(() => {
        try {
            localStorage.setItem(LOCALE_STORAGE_KEY, locale);
            document.documentElement.lang = locale;

            // Configurar direção
            const isRTL = locale === 'ar-SA';
            document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

            // Adicionar classe para estilização específica se necessário
            if (isRTL) {
                document.documentElement.classList.add('rtl');
            } else {
                document.documentElement.classList.remove('rtl');
            }
        } catch {
            // Falha silenciosa
        }
    }, [locale]);

    // Mudar idioma
    const changeLocale = useCallback((newLocale) => {
        if (SUPPORTED_LOCALES.includes(newLocale)) {
            setLocale(newLocale);
        }
    }, []);

    // Traduzir uma chave
    const t = useCallback((key, params = {}) => {
        const keys = key.split('.');
        let value = translations[locale];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback para pt-BR
                value = translations[DEFAULT_LOCALE];
                for (const fallbackK of keys) {
                    if (value && typeof value === 'object' && fallbackK in value) {
                        value = value[fallbackK];
                    } else {
                        return key; // Retorna a chave se não encontrar
                    }
                }
                break;
            }
        }

        // Substituir parâmetros {param}
        if (typeof value === 'string') {
            return value.replace(/{(\w+)}/g, (_, paramName) => {
                return params[paramName] !== undefined ? params[paramName] : `{${paramName}}`;
            });
        }

        return typeof value === 'string' ? value : key;
    }, [locale]);

    // Formatar moeda - BRL para pt-BR, USD convertido para outros
    // Taxa de conversão: 6 BRL = 1 USD
    const formatCurrency = useCallback((value) => {
        if (locale === 'pt-BR') {
            // Locale brasileiro: mostra em Reais
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(value);
        } else {
            // Outros locales: converte para USD (6 BRL = 1 USD)
            const usdValue = value / 6;
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(usdValue);
        }
    }, [locale]);

    // Formatar data no locale atual
    const formatDate = useCallback((date, options = {}) => {
        const dateObj = date instanceof Date ? date : new Date(date);
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            ...options,
        }).format(dateObj);
    }, [locale]);

    // Formatar número
    const formatNumber = useCallback((value) => {
        return new Intl.NumberFormat(locale).format(value);
    }, [locale]);

    // Obter dados traduzidos de um produto por ID
    // Suporta tanto strings quanto objetos (como specs)
    const getProductData = useCallback((productId, field) => {
        const productData = translations[locale]?.productData?.[productId];
        if (productData && field in productData) {
            return productData[field];
        }
        // Fallback para pt-BR
        const fallbackData = translations[DEFAULT_LOCALE]?.productData?.[productId];
        if (fallbackData && field in fallbackData) {
            return fallbackData[field];
        }
        return null;
    }, [locale]);

    const value = useMemo(() => ({
        locale,
        locales: SUPPORTED_LOCALES,
        changeLocale,
        t,
        formatCurrency,
        formatDate,
        formatNumber,
        getProductData,
        isRTL: locale === 'ar-SA',
    }), [locale, changeLocale, t, formatCurrency, formatDate, formatNumber, getProductData]);

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
