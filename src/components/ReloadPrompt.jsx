import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { X, RefreshCw } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

function ReloadPrompt() {
    const { t } = useI18n();
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line no-console
            if (import.meta.env.DEV) console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            if (import.meta.env.DEV) console.error('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (!offlineReady && !needRefresh) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[100] p-4 bg-white rounded-xl shadow-2xl border border-slate-200 animate-slide-up max-w-sm">
            <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-2 rounded-full">
                    <RefreshCw className="w-5 h-5 text-pink-500" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-1">
                        {offlineReady ? t('pwa.offlineReady') : t('pwa.newContent')}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                        {offlineReady
                            ? t('pwa.offlineReady')
                            : t('pwa.newContent')}
                    </p>
                    <div className="flex gap-2">
                        {needRefresh && (
                            <button
                                onClick={() => updateServiceWorker(true)}
                                className="px-4 py-2 bg-pink-500 text-white text-sm font-bold rounded-lg hover:bg-pink-600 transition-colors"
                            >
                                {t('pwa.reload')}
                            </button>
                        )}
                        <button
                            onClick={close}
                            className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            {t('pwa.close')}
                        </button>
                    </div>
                </div>
                <button onClick={close} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default ReloadPrompt;
