import React from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronRight, LogOut } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export default function UserDashboard({ user, orders, onTrackOrder, onLogout }) {
    const { formatCurrency, t } = useI18n();
    const getStatusColor = (status) => {
        switch (status) {
            case 'Entregue': return 'bg-green-100 text-green-700 border-green-200';
            case 'Em Trânsito': return 'bg-sky-100 text-sky-700 border-sky-200';
            case 'Processando': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Entregue': return <CheckCircle className="w-4 h-4" />;
            case 'Em Trânsito': return <Truck className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-20 pt-8 animate-fade-in">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Cabeçalho do Dashboard */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-20 h-20 rounded-full border-4 border-pink-50 shadow-md"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.welcome', { name: user.name })}</h1>
                            <p className="text-slate-500">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-medium transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        {t('dashboard.logout')}
                    </button>
                </div>

                {/* Seção de Pedidos */}
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Package className="w-6 h-6 text-pink-500" />
                    {t('dashboard.recentOrders')}
                </h2>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-50 pb-4 mb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-lg text-slate-800">#{order.id}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {t(`dashboard.status.${order.status}`) || order.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-slate-500 flex items-center gap-4">
                                        <span>{t('dashboard.date', { date: order.date }) || `Data: ${order.date}`}</span>
                                        <span>•</span>
                                        <span>{t('dashboard.total', { total: formatCurrency(order.total) }) || `Total: ${formatCurrency(order.total)}`}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onTrackOrder(order.trackingCode)}
                                    className="px-5 py-2.5 bg-sky-50 text-sky-600 font-bold rounded-xl hover:bg-sky-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <MapPin className="w-4 h-4" />
                                    {t('dashboard.trackOrder')}
                                </button>
                            </div>

                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <span className="font-bold text-slate-400">{item.qty}x</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="font-medium text-slate-600">{formatCurrency(item.price)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
