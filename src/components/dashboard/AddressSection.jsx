import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';

export default function AddressSection() {
    const { t } = useI18n();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Mock Addresses
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            label: 'Casa',
            street: 'Av. Presidente Wilson',
            number: '132',
            complement: 'Bloco 3 Apto 5',
            neighborhood: 'José Menino',
            city: 'Santos',
            state: 'SP',
            zip: '11065-201',
            phone: '(13) 99624-6969',
            isDefault: true
        }
    ]);

    const handleEdit = (id) => {
        setEditingId(id);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm(t('common.confirm') + '?')) {
            setAddresses(addresses.filter(a => a.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsFormOpen(false);
        setEditingId(null);
        // Mock save logic would go here
        alert(t('dashboard.addresses.save') + ' (Mock)');
    };

    if (isFormOpen) {
        return (
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-slate-800 text-xl">
                        {editingId ? t('dashboard.addresses.edit') : t('dashboard.addresses.new')}
                    </h3>
                    <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSave} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Row 1: CEP, State, City */}
                        <input placeholder={t('dashboard.addresses.zip')} className="input-field" />
                        <input placeholder={t('dashboard.addresses.state')} className="input-field" />
                        <input placeholder={t('dashboard.addresses.city')} className="input-field" />

                        {/* Row 2: Street, Number, Complement */}
                        <input placeholder={t('dashboard.addresses.street')} className="input-field" />
                        <input placeholder={t('dashboard.addresses.number')} className="input-field" />
                        <input placeholder={t('dashboard.addresses.complement')} className="input-field" />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 text-slate-500 hover:bg-slate-50 rounded-full font-medium transition-colors">
                            {t('common.cancel')}
                        </button>
                        <button type="submit" className="px-8 py-3 bg-[#FF1493] text-white font-bold rounded-full hover:bg-pink-600 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all transform hover:-translate-y-0.5">
                            {t('common.save')}
                        </button>
                    </div>
                </form>
                <style>{`
                .input-field {
                    width: 100%;
                    padding: 1rem 1.5rem;
                    border-radius: 9999px !important;
                    border: 1px solid #e2e8f0;
                    outline: none;
                    transition: all 0.2s;
                    font-size: 0.95rem;
                }
                .input-field:focus {
                    border-color: #FF1493;
                    box-shadow: 0 0 0 4px rgba(255, 20, 147, 0.1);
                }
            `}</style>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <div key={addr.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative group">
                        {addr.isDefault && (
                            <span className="absolute top-5 right-5 text-xs font-bold text-[#FF1493] bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
                                {t('dashboard.addresses.default')}
                            </span>
                        )}

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#FF1493]">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg">{addr.label}</h3>
                        </div>

                        <div className="space-y-1.5 text-sm text-slate-600 mb-6 pl-1">
                            <p className="font-medium">{addr.street}, {addr.number}</p>
                            <p>{addr.neighborhood} - {addr.city} / {addr.state}</p>
                            <p>{t('dashboard.addresses.zip')}: {addr.zip}</p>
                            {addr.complement && <p className="text-slate-400 text-xs mt-2 bg-slate-50 inline-block px-2 py-1 rounded-lg">Comp: {addr.complement}</p>}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handleEdit(addr.id)}
                                className="flex-1 py-3 px-4 bg-[#FF1493] text-white text-sm font-bold rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 shadow-md shadow-pink-100"
                            >
                                <Edit2 className="w-4 h-4" /> {t('dashboard.addresses.edit')}
                            </button>
                            {!addr.isDefault && (
                                <button
                                    onClick={() => handleDelete(addr.id)}
                                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors border border-transparent hover:border-red-100"
                                    title={t('dashboard.addresses.delete')}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add New Address Card */}
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-slate-50/50 rounded-[2rem] p-6 border-2 border-dashed border-slate-200 hover:border-[#FF1493] hover:bg-pink-50/30 transition-all flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-[#FF1493] group h-full min-h-[200px]"
                >
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform group-hover:shadow-md">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-lg">{t('dashboard.addresses.new')}</span>
                </button>
            </div>

        </div>
    );
}
