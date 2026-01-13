// src/services/payment.js
// Serviço para integração com gateways de pagamento

import { PAYMENT_CONFIG } from '../config/constants';
import { api, ApiError } from './api';

/**
 * Interface para gateways de pagamento
 * Cada gateway implementa estes métodos
 */
class PaymentService {
    constructor() {
        this.gateway = PAYMENT_CONFIG.DEFAULT_GATEWAY;
    }

    /**
     * Define o gateway a ser usado
     * @param {string} gateway - 'stripe' | 'pagseguro' | 'mercadopago'
     */
    setGateway(gateway) {
        if (PAYMENT_CONFIG.GATEWAYS.includes(gateway)) {
            this.gateway = gateway;
        } else {
            throw new Error(`Gateway não suportado: ${gateway}`);
        }
    }

    /**
     * Cria uma sessão de pagamento (para integração futura)
     * @param {object} orderData - Dados do pedido
     * @returns {Promise<object>} - Sessão de pagamento
     */
    async createPaymentSession(orderData) {
        // Simulação - será substituído por integração real
        console.log(`[${this.gateway}] Criando sessão de pagamento...`, orderData);

        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            sessionId: `sess_${Date.now()}`,
            gateway: this.gateway,
            amount: orderData.total,
            currency: 'BRL',
            status: 'pending'
        };
    }

    /**
     * Processa pagamento com cartão (tokenizado)
     * @param {string} sessionId - ID da sessão
     * @param {object} paymentData - Dados do pagamento (token do cartão)
     * @returns {Promise<object>} - Resultado do pagamento
     */
    async processCardPayment(sessionId, paymentData) {
        // Simulação - será substituído por integração real
        console.log(`[${this.gateway}] Processando pagamento...`, { sessionId, paymentData });

        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            transactionId: `txn_${Date.now()}`,
            status: 'approved',
            message: 'Pagamento aprovado com sucesso',
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Gera código PIX
     * @param {object} orderData - Dados do pedido
     * @returns {Promise<object>} - Código PIX
     */
    async generatePixCode(orderData) {
        // Simulação - será substituído por integração real
        console.log(`[${this.gateway}] Gerando código PIX...`, orderData);

        await new Promise(resolve => setTimeout(resolve, 800));

        const pixDiscount = orderData.total * PAYMENT_CONFIG.PIX_DISCOUNT;
        const finalAmount = orderData.total - pixDiscount;

        return {
            pixCode: `00020126580014br.gov.bcb.pix0136${Date.now()}520400005303986540${finalAmount.toFixed(2)}5802BR5925TUTTI E NINO LTDA6009SAO PAULO62070503***6304`,
            qrCodeUrl: '/pix-qr-placeholder.png',
            amount: finalAmount,
            discount: pixDiscount,
            expiresAt: new Date(Date.now() + 30 * 60000).toISOString() // 30 minutos
        };
    }

    /**
     * Verifica status de um pagamento
     * @param {string} transactionId - ID da transação
     * @returns {Promise<object>} - Status do pagamento
     */
    async checkPaymentStatus(transactionId) {
        // Simulação - será substituído por integração real
        console.log(`[${this.gateway}] Verificando status...`, transactionId);

        return {
            transactionId,
            status: 'approved',
            paidAt: new Date().toISOString()
        };
    }

    /**
     * Solicita reembolso
     * @param {string} transactionId - ID da transação
     * @param {number} amount - Valor a reembolsar (opcional, total se não informado)
     * @returns {Promise<object>} - Resultado do reembolso
     */
    async requestRefund(transactionId, amount = null) {
        // Simulação - será substituído por integração real
        console.log(`[${this.gateway}] Solicitando reembolso...`, { transactionId, amount });

        return {
            refundId: `ref_${Date.now()}`,
            transactionId,
            amount,
            status: 'pending',
            message: 'Reembolso será processado em até 7 dias úteis'
        };
    }
}

// Instância singleton
export const paymentService = new PaymentService();

// Exportar classe para testes
export { PaymentService };
