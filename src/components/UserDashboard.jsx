import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import DashboardSidebar from './dashboard/DashboardSidebar';
import OrderCard from './dashboard/OrderCard';
import FavoritesSection from './dashboard/FavoritesSection';
import ProfileSection from './dashboard/ProfileSection';
import AddressSection from './dashboard/AddressSection';
import SettingsSection from './dashboard/SettingsSection';
import EmptyState from './dashboard/EmptyState';
import { Package } from 'lucide-react';
import { getUserAvatar } from '../utils/userUtils';
import Breadcrumbs from './Breadcrumbs';

export default function UserDashboard({ user, orders, onTrackOrder, onLogout }) {
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState('orders');

    return (
        <div className="min-h-screen bg-stone-50 py-8 lg:py-12 animate-fade-in">
            <div className="container mx-auto px-4">
                <Breadcrumbs items={[{ label: t('nav.dashboard') || 'Minha Conta' }]} />

                {/* Header Welcome */}
                <div className="flex items-center gap-4 mb-8">
                    <img
                        src={getUserAvatar(user)}
                        alt={user.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getUserAvatar({ name: user.name });
                        }}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            {t('dashboard.welcome', { name: user.name }) || `Olá, ${user.name}!`}

                        </h1>
                        <p className="text-slate-500 text-sm">{t('dashboard.subtitle')}</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar */}
                    <DashboardSidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onLogout={onLogout}
                    />

                    {/* Main Content Area */}
                    <main className="flex-1 w-full min-w-0">
                        {activeTab === 'orders' && (
                            <div className="space-y-6 animate-slide-up">
                                {orders.map(order => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        onTrackOrder={onTrackOrder}
                                    />
                                ))}
                                {orders.length === 0 && (
                                    <EmptyState
                                        icon={Package}
                                        title={t('dashboard.noOrders') || "Nenhum pedido encontrado"}
                                        message={t('dashboard.noOrdersMessage') || "Você ainda não fez nenhum pedido."}
                                        actionLabel={t('nav.home') || "Começar a Comprar"}
                                        actionLink="/"
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'favorites' && (
                            <div className="space-y-6 animate-slide-up">
                                <FavoritesSection />
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="space-y-6 animate-slide-up">
                                <ProfileSection user={user} />
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="space-y-6 animate-slide-up">
                                <AddressSection />
                            </div>
                        )}



                        {activeTab === 'settings' && (
                            <div className="space-y-6 animate-slide-up">
                                <SettingsSection user={user} />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
