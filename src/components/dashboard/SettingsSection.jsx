import React, { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { Settings, Lock, Bell, Camera, Shield, LogOut, CheckCircle } from 'lucide-react';
import { getUserAvatar } from '../../utils/userUtils';

export default function SettingsSection({ user }) {
    const { t } = useI18n();
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Mock states
    const [notifications, setNotifications] = useState({
        email: true,
        whatsapp: true,
        orders: true,
        promos: true
    });

    const handleAvatarChange = () => {
        // Simulate file upload
        alert(t('dashboard.settings.avatar.upload') + ' (Mock)');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMsg(t('dashboard.settings.security.success'));
            setTimeout(() => setSuccessMsg(''), 3000);
            e.target.reset();
        }, 1500);
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const notificationOptions = [
        { id: 'orders', label: t('dashboard.settings.notifications.orders'), desc: t('dashboard.settings.notifications.ordersDesc') },
        { id: 'promos', label: t('dashboard.settings.notifications.promos'), desc: t('dashboard.settings.notifications.promosDesc') },
        { id: 'email', label: t('dashboard.settings.notifications.email'), desc: t('dashboard.settings.notifications.emailDesc') },
        { id: 'whatsapp', label: t('dashboard.settings.notifications.whatsapp'), desc: t('dashboard.settings.notifications.whatsappDesc') }
    ];

    return (
        <div className="space-y-6 animate-fade-in relative">
            {successMsg && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 animate-slide-down">
                    <CheckCircle className="w-5 h-5" />
                    {successMsg}
                </div>
            )}

            {/* Avatar Management Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                <button type="button" className="relative group cursor-pointer" onClick={handleAvatarChange}>
                    <img
                        src={getUserAvatar(user)}
                        onError={(e) => { e.target.onerror = null; e.target.src = getUserAvatar({ name: user.name }); }}
                        alt={user.name}
                        className="w-28 h-28 rounded-full border-4 border-slate-50 shadow-md group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 bg-[#FF1493] text-white p-2.5 rounded-full shadow-md hover:bg-pink-600 transition-colors">
                        <Camera className="w-5 h-5" />
                    </span>
                </button>
                <div className="text-center md:text-left flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{user.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">{user.email || 'email@exemplo.com'}</p>
                    <button
                        onClick={handleAvatarChange}
                        className="text-sm font-bold text-[#FF1493] hover:underline bg-pink-50 px-4 py-2 rounded-full"
                    >
                        {t('dashboard.settings.avatar.change')}
                    </button>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-5">
                    <div className="p-2 bg-pink-50 rounded-full text-[#FF1493]">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{t('dashboard.settings.security.title')}</h3>
                </div>

                <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.settings.security.currentPassword')}</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:border-[#FF1493] focus:ring-4 focus:ring-pink-50/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.settings.security.newPassword')}</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:border-[#FF1493] focus:ring-4 focus:ring-pink-50/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.settings.security.confirmPassword')}</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:border-[#FF1493] focus:ring-4 focus:ring-pink-50/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full md:w-auto px-8 py-3 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-colors disabled:opacity-70 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 transform"
                        >
                            {isLoading ? t('dashboard.settings.security.updating') : t('dashboard.settings.security.update')}
                        </button>
                    </div>
                </form>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-5">
                    <div className="p-2 bg-pink-50 rounded-full text-[#FF1493]">
                        <Bell className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{t('dashboard.settings.notifications.title')}</h3>
                </div>

                <div className="space-y-6">
                    {notificationOptions.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                            <div>
                                <h4 className="font-bold text-slate-800">{item.label}</h4>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <span className="sr-only">{item.label}</span>
                                <input
                                    type="checkbox"
                                    checked={notifications[item.id]}
                                    onChange={() => toggleNotification(item.id)}
                                    className="peer opacity-0 absolute w-0 h-0"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF1493]"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Account */}
            <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100">
                <h3 className="font-bold text-red-800 mb-2 text-lg">{t('dashboard.settings.dangerZone.title')}</h3>
                <p className="text-sm text-red-600 mb-6">{t('dashboard.settings.dangerZone.text')}</p>
                <button
                    onClick={() => confirm(t('common.confirm') + '?') && alert('Mock Delete')}
                    className="px-6 py-2.5 border-2 border-red-200 text-red-600 font-bold rounded-full hover:bg-red-100 transition-colors text-sm flex items-center gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    {t('dashboard.settings.dangerZone.button')}
                </button>
            </div>

        </div>
    );
}
