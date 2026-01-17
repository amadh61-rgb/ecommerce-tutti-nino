import React from 'react';
import { PackageSearch, X, CheckCircle } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

import { useFocusTrap } from '../hooks/useFocusTrap';

export default function DrawerTracking({ isOpen, onClose, trackingCode, setTrackingCode, trackingResult, setTrackingResult }) {
    const { t, isRTL } = useI18n();

    const containerRef = React.useRef(null);
    useFocusTrap(isOpen);

    if (!isOpen) return null;

    const handleTrackingSubmit = (e) => {
        e.preventDefault();
        if (!trackingCode) return;
        // Simulação de rastreio
        setTrackingResult({
            status: t('tracking.status.inTransit'), // "Em trânsito",
            location: "São Paulo, SP", // Mock location
            date: "12/05/2026"
        });
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="tracking-title">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

            {/* Content */}
            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-6 flex items-center justify-between bg-[#EC509D]">
                    <h2 id="tracking-title" className="text-xl font-bold text-white flex items-center gap-2">
                        <PackageSearch className="w-5 h-5 text-white" /> {t('tracking.title')}
                    </h2>
                    <button onClick={onClose} className="p-3 hover:bg-white/20 rounded-full transition-colors text-white touch-target close-btn-mobile" aria-label={t('common.close')}>
                        <X className="w-7 h-7" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="bg-pink-50 p-6 rounded-2xl mb-6">
                            <h3 className="font-bold text-[#880E4F] mb-2">{t('tracking.title')}</h3>
                            <p className="text-sm text-slate-600">{t('tracking.placeholder')}</p>
                        </div>

                        {!trackingResult ? (
                            <form onSubmit={handleTrackingSubmit} className="space-y-4" noValidate>
                                <div className="relative">
                                    <PackageSearch className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300`} />
                                    <input
                                        type="text"
                                        value={trackingCode}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 20);
                                            setTrackingCode(val);
                                        }}
                                        className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all uppercase`}
                                        placeholder="Ex: TN123456BR"
                                        required
                                        maxLength={20}
                                    />
                                </div>
                                <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white font-bold rounded-xl hover:shadow-lg transition-all">
                                    {t('tracking.button')}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white p-4 rounded-xl border-2 border-green-100 animate-fade-in shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">{trackingResult.status}</h4>
                                        <p className="text-sm text-slate-600 font-medium">{trackingResult.location}</p>
                                        <p className="text-xs text-slate-400 mt-1">{trackingResult.date}</p>

                                        <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                                            <div className="h-1.5 flex-1 bg-green-500 rounded-full"></div>
                                            <div className="h-1.5 flex-1 bg-green-500 rounded-full"></div>
                                            <div className="h-1.5 flex-1 bg-green-500 rounded-full"></div>
                                            <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                        </div>
                                        <p className={`text-[10px] ${isRTL ? 'text-left' : 'text-right'} text-slate-400 mt-1`}>75%</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setTrackingResult(null); setTrackingCode(""); }}
                                    className="mt-6 w-full py-2 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
                                >
                                    {t('tracking.notFound') || 'Pesquisar Outro Código'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
