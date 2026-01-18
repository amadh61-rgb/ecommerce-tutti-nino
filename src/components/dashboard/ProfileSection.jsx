import React, { useState } from 'react';
import { User, Mail, Smartphone, Calendar, CheckCircle } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';

export default function ProfileSection({ user }) {
    const { t } = useI18n();
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                {showSuccess && (
                    <div className="absolute top-0 left-0 right-0 bg-green-500 text-white py-3 px-4 text-center font-bold text-sm animate-slide-down flex items-center justify-center gap-2 shadow-md z-10">
                        <CheckCircle className="w-5 h-5" />
                        {t('dashboard.profile.success')}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Data */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 ml-1">{t('dashboard.profile.personalData')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.profile.fullName')}</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        defaultValue={user?.name}
                                        className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:border-[#FF1493] focus:ring-4 focus:ring-pink-50/50 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.profile.cpf')}</label>
                                <input
                                    type="text"
                                    defaultValue="396.***.***-36"
                                    className="w-full px-6 py-3 rounded-full border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed font-mono"
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.profile.birthDate')}</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="date"
                                        defaultValue="1995-09-17"
                                        className="w-full pl-12 pr-6 py-3 rounded-full border border-slate-200 focus:border-[#FF1493] focus:ring-4 focus:ring-pink-50/50 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.profile.gender')}</label>
                                <div className="flex gap-4 pt-3 flex-wrap">
                                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                                        <input type="radio" name="gender" defaultChecked className="text-[#FF1493] focus:ring-[#FF1493]" />
                                        <span className="text-slate-700 font-medium">{t('dashboard.profile.genderMale')}</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                                        <input type="radio" name="gender" className="text-[#FF1493] focus:ring-[#FF1493]" />
                                        <span className="text-slate-700 font-medium">{t('dashboard.profile.genderFemale')}</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-100">
                                        <input type="radio" name="gender" className="text-[#FF1493] focus:ring-[#FF1493]" />
                                        <span className="text-slate-700 font-medium">{t('dashboard.profile.genderOther')}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 w-full"></div>

                    {/* Contact Data */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 ml-1">{t('dashboard.profile.contact')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.profile.email')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 user-select-none" />
                                    <input
                                        type="email"
                                        defaultValue={user?.email || "amada@example.com"}
                                        className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 uppercase text-slate-500 bg-slate-50"
                                        disabled
                                    />
                                </div>
                                <button type="button" className="text-xs text-[#FF1493] font-bold cursor-pointer hover:underline text-right w-full flex justify-end px-2">
                                    {t('dashboard.profile.changeEmail')}
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">{t('dashboard.profile.phone')}</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        defaultValue="(13) 99***-6969"
                                        className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:border-[#FF1493] focus:ring-4 focus:ring-pink-50/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-8 py-3.5 bg-[#FF1493] text-white font-bold rounded-full hover:bg-pink-600 transition-all shadow-lg shadow-pink-200 flex-1 sm:flex-none flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-pink-300 transform hover:-translate-y-0.5"
                        >
                            {isSaving ? t('common.processing') : t('dashboard.profile.save')}
                        </button>
                    </div>
                </form >
            </div >
        </div >
    );
}
