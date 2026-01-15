import { z } from 'zod'
import allowCors from '../utils/cors'

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

        // --- SECURITY CHECK (Mock) ---
        // Simulate server-side calculation
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        // Simulate Payment Provider Response
        const mockPaymentSession = {
            sessionId: `sess_${Math.random().toString(36).substring(7)}`,
            status: 'pending',
            amount: totalAmount,
            currency,
            checkoutUrl: `/checkout?session_id=sess_${Math.random().toString(36).substring(7)}&status=success`,
            clientSecret: `pi_${Math.random().toString(36).substring(7)}_secret`
        }

        await new Promise(resolve => setTimeout(resolve, 800))

        return res.status(200).json({
            success: true,
            data: mockPaymentSession
        })

    } catch (error) {
        console.error('Payment Session Error:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export default allowCors(handler)
