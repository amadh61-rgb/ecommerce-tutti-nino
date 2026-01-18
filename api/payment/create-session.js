/* global process */
import { z } from 'zod'
import allowCors from '../utils/cors'
import { getPaymentProvider } from '../services/payment'

// Define validation schema
const paymentSchema = z.object({
    items: z.array(z.object({
        id: z.string().or(z.number()),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive()
    })).min(1, { message: "Cart cannot be empty" }),
    currency: z.string().length(3).optional().default('BRL')
})

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        // 1. Validate Input Strict Schema
        const result = paymentSchema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                message: 'Invalid input',
                errors: result.error.flatten().fieldErrors
            })
        }

        const { items, currency } = result.data

        // 2. Delegate to the active Payment Provider (Mock, MercadoPago, etc.)
        const paymentProvider = getPaymentProvider()
        const session = await paymentProvider.createSession({ items, currency })

        return res.status(200).json({
            success: true,
            data: session
        })

    } catch (error) {
        console.error('Payment Session Error:', error)
        return res.status(500).json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

export default allowCors(handler)
