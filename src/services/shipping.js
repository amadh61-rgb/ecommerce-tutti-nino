// src/services/shipping.js
// Serviço para integração com transportadoras e rastreamento

import { SHIPPING_CONFIG } from '../config/constants';

/**
 * Serviço de cálculo de frete e rastreamento
 */
class ShippingService {
    constructor() {
        this.carriers = ['correios', 'jadlog', 'sedex'];
    }

    /**
     * Calcula opções de frete
     * @param {string} cep - CEP de destino
     * @param {Array} items - Itens do carrinho
     * @returns {Promise<Array>} - Opções de frete
     */
    async calculateShipping(cep, items) {
        // Simulação - será substituído por integração real (Correios API, Melhor Envio, etc)
        console.log('[Shipping] Calculando frete...', { cep, items });

        await new Promise(resolve => setTimeout(resolve, 800));

        const total = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
        const isFreeShipping = total >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;

        // Simular opções de frete baseado no CEP
        const region = parseInt(cep.slice(0, 2));
        const baseDelivery = region <= 30 ? 3 : region <= 50 ? 5 : 7;

        return [
            {
                id: 'pac',
                carrier: 'Correios',
                service: 'PAC',
                price: isFreeShipping ? 0 : SHIPPING_CONFIG.DEFAULT_SHIPPING_COST,
                originalPrice: SHIPPING_CONFIG.DEFAULT_SHIPPING_COST,
                deliveryDays: baseDelivery + 5,
                deliveryRange: `${baseDelivery + 4} a ${baseDelivery + 6} dias úteis`,
                isFree: isFreeShipping
            },
            {
                id: 'sedex',
                carrier: 'Correios',
                service: 'SEDEX',
                price: isFreeShipping ? 12.90 : 27.90,
                originalPrice: 27.90,
                deliveryDays: baseDelivery + 2,
                deliveryRange: `${baseDelivery + 1} a ${baseDelivery + 3} dias úteis`,
                isFree: false
            },
            {
                id: 'express',
                carrier: 'Jadlog',
                service: 'Express',
                price: isFreeShipping ? 8.90 : 22.50,
                originalPrice: 22.50,
                deliveryDays: baseDelivery + 3,
                deliveryRange: `${baseDelivery + 2} a ${baseDelivery + 4} dias úteis`,
                isFree: false
            }
        ];
    }

    /**
     * Rastreia um pedido
     * @param {string} trackingCode - Código de rastreamento
     * @returns {Promise<object>} - Histórico de rastreamento
     */
    async trackOrder(trackingCode) {
        // Simulação - será substituído por integração real
        console.log('[Shipping] Rastreando...', trackingCode);

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simular histórico baseado no código
        const now = new Date();
        const daysAgo = (days) => new Date(now - days * 24 * 60 * 60 * 1000);

        return {
            trackingCode,
            carrier: 'Correios',
            estimatedDelivery: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'in_transit',
            events: [
                {
                    date: daysAgo(0).toISOString(),
                    time: '14:30',
                    location: 'São Paulo - SP',
                    status: 'in_transit',
                    description: 'Objeto em trânsito - por favor aguarde'
                },
                {
                    date: daysAgo(1).toISOString(),
                    time: '09:15',
                    location: 'Centro de Distribuição - SP',
                    status: 'processed',
                    description: 'Objeto encaminhado para a unidade de distribuição'
                },
                {
                    date: daysAgo(2).toISOString(),
                    time: '18:45',
                    location: 'São Paulo - SP',
                    status: 'posted',
                    description: 'Objeto postado'
                }
            ]
        };
    }

    /**
     * Valida CEP e retorna endereço
     * @param {string} cep - CEP a validar
     * @returns {Promise<object>} - Dados do endereço
     */
    async validateCep(cep) {
        // Simulação - será substituído por ViaCEP ou similar
        console.log('[Shipping] Validando CEP...', cep);

        await new Promise(resolve => setTimeout(resolve, 500));

        // CEP inválido
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) {
            throw new Error('CEP inválido');
        }

        // Simular resposta
        return {
            cep: cleanCep,
            street: 'Rua Exemplo',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            ibge: '3550308'
        };
    }

    /**
     * Verifica se o frete é grátis
     * @param {number} total - Valor total do pedido
     * @returns {boolean}
     */
    isFreeShipping(total) {
        return total >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
    }

    /**
     * Retorna valor mínimo para frete grátis
     * @returns {number}
     */
    getFreeShippingThreshold() {
        return SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
    }
}

// Instância singleton
export const shippingService = new ShippingService();

// Exportar classe para testes
export { ShippingService };
