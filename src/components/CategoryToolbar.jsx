import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import Breadcrumbs from './Breadcrumbs';

export default function CategoryToolbar({
    categoryTitle,
    sortOption,
    onSortChange
}) {
    const { t } = useI18n();
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortOptions = [
        { id: 'relevance', label: t('sort.relevance') || 'Relevância' },
        { id: 'price-asc', label: t('sort.priceLowHigh') || 'Menor Preço' },
        { id: 'price-desc', label: t('sort.priceHighLow') || 'Maior Preço' },
        { id: 'name-asc', label: t('sort.nameAZ') || 'Nome (A-Z)' },
    ];

    return (
        <div className="bg-white border-b border-slate-100 sticky top-[72px] xl:top-[80px] z-30 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Breadcrumbs (Left) */}
                    <div className="flex-1 w-full sm:w-auto">
                        <Breadcrumbs items={[{ label: categoryTitle }]} />
                    </div>

                    {/* Controles de Ordenação (Right) */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">

                        {/* Ordenação */}
                        <div className="relative group">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-700 transition-colors border border-slate-200"
                            >
                                <ArrowUpDown className="w-4 h-4 text-slate-500" />
                                <span className="hidden sm:inline">{t('common.sortBy') || 'Ordenar'}: </span>
                                <span className="text-pink-600 truncate max-w-[100px]">
                                    {sortOptions.find(o => o.id === sortOption)?.label}
                                </span>
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            </button>

                            {isSortOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} onKeyDown={(e) => e.key === 'Escape' && setIsSortOpen(false)} role="button" tabIndex={0} aria-label="Fechar ordenação"></div>
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in-down">
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => { onSortChange(option.id); setIsSortOpen(false); }}
                                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-pink-50 transition-colors flex items-center justify-between group/item
                                                    ${sortOption === option.id ? 'text-pink-600 font-medium bg-pink-50/50' : 'text-slate-600'}
                                                `}
                                            >
                                                {option.label}
                                                {sortOption === option.id && <Check className="w-4 h-4 text-pink-500" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
