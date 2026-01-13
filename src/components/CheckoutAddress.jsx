import React, { useState } from 'react';
import { MapPin, User, Phone, Check, AlertCircle } from 'lucide-react';
import { addressSchema, validateForm, formatCEP, formatPhone, sanitizeString } from '../utils/validation';
import { detectXSS } from '../utils/security';
import { useI18n } from '../hooks/useI18n';

export default function CheckoutAddress({ onSubmit, initialData }) {
    const { t, isRTL } = useI18n();
    const [formData, setFormData] = useState(initialData || {
        name: '',
        phone: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handler genérico com proteção XSS
    const handleChange = (field) => (e) => {
        let value = e.target.value;

        // Detectar XSS
        if (detectXSS(value)) {
            setErrors(prev => ({ ...prev, [field]: t('errors.invalidCharacters') || 'Caracteres inválidos' }));
            return;
        }

        // Formatação automática
        if (field === 'cep') {
            value = formatCEP(value);
        } else if (field === 'phone') {
            value = formatPhone(value);
        } else if (field === 'state') {
            value = value.toUpperCase().slice(0, 2);
        }

        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpar erro do campo
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        // Preparar dados para validação
        const dataToValidate = {
            name: formData.name,
            cep: formData.cep.replace('-', ''),
            street: formData.street,
            number: formData.number,
            complement: formData.complement || '',
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
            phone: formData.phone
        };

        // Validar com Zod
        const validation = validateForm(addressSchema, dataToValidate);

        if (!validation.success) {
            setErrors(validation.errors);
            setIsSubmitting(false);
            return;
        }

        // Sanitizar dados finais
        const sanitizedData = {
            ...validation.data,
            name: sanitizeString(validation.data.name),
            street: sanitizeString(validation.data.street),
            neighborhood: sanitizeString(validation.data.neighborhood),
            city: sanitizeString(validation.data.city)
        };

        // Simular processamento
        setTimeout(() => {
            setIsSubmitting(false);
            onSubmit(sanitizedData);
        }, 500);
    };

    // Componente de campo com erro
    const InputField = ({ name, label, placeholder, type = 'text', icon: Icon, autoComplete, required = true, inputMode, maxLength }) => (
        <div className="relative">
            {Icon && (
                <Icon className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
            )}
            <input
                id={name}
                type={type}
                name={name}
                required={required}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange(name)}
                autoComplete={autoComplete}
                inputMode={inputMode}
                maxLength={maxLength}
                className={`w-full ${Icon ? (isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4') : 'px-4'} py-3 rounded-xl border ${errors[name]
                    ? 'border-red-400 bg-red-50'
                    : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all font-medium text-slate-700`}
            />
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {t(errors[name])}
                </p>
            )}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-pink-500" /> {t('checkout.address.title')}
            </h2>

            {/* Erro geral */}
            {errors._form && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{t(errors._form)}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome Completo */}
                <div className="col-span-2">
                    <InputField
                        name="name"
                        placeholder={t('checkout.address.name')}
                        icon={User}
                        autoComplete="name"
                        maxLength={100}
                    />
                </div>

                {/* Telefone */}
                <InputField
                    name="phone"
                    placeholder={t('checkout.address.phone')}
                    type="tel"
                    icon={Phone}
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={15}
                />

                {/* CEP */}
                <InputField
                    name="cep"
                    placeholder={t('checkout.address.cep')}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength={9}
                />

                {/* Rua */}
                <div className="col-span-2 md:col-span-1">
                    <InputField
                        name="street"
                        placeholder={t('checkout.address.street')}
                        autoComplete="street-address"
                        maxLength={200}
                    />
                </div>

                {/* Número */}
                <InputField
                    name="number"
                    placeholder={t('checkout.address.number')}
                    autoComplete="address-line2"
                    maxLength={20}
                />

                {/* Bairro */}
                <InputField
                    name="neighborhood"
                    placeholder={t('checkout.address.neighborhood')}
                    autoComplete="address-level3"
                    maxLength={100}
                />

                {/* Complemento */}
                <InputField
                    name="complement"
                    placeholder={t('checkout.address.complement')}
                    required={false}
                    autoComplete="address-line2"
                    maxLength={100}
                />

                {/* Cidade */}
                <InputField
                    name="city"
                    placeholder={t('checkout.address.city')}
                    autoComplete="address-level2"
                    maxLength={100}
                />

                {/* Estado */}
                <InputField
                    name="state"
                    placeholder={t('checkout.address.state')}
                    autoComplete="address-level1"
                    maxLength={2}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-pink-500 transition-all shadow-lg hover:glare-effect flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('common.loading') || 'Validando...'}
                    </>
                ) : (
                    <>
                        {t('checkout.buttons.next')} <Check className="w-5 h-5" />
                    </>
                )}
            </button>
        </form>
    );
}
