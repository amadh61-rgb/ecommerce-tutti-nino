import { z } from 'zod'
import allowCors from '../utils/cors'

// Define validation schema for shipping
const shippingSchema = z.object({
    zipCode: z.string().regex(/^\d{8}$/, { message: "ZIP Code must be 8 digits (numeric)" }),
    items: z.array(z.object({
        id: z.string().or(z.number()),
        quantity: z.number().int().positive(),
        price: z.number().min(0)
    })).min(1, { message: "Items required for shipping calc" })
})

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        // 1. Zod Validation
        const result = shippingSchema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                message: 'Invalid input',
                errors: result.error.flatten().fieldErrors
            })
        }

        const { zipCode, items } = result.data

        // --- LOGIC ---
        await new Promise(resolve => setTimeout(resolve, 600)) // Simulate network

        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        const isFreeShipping = total >= 300

        const mockResponse = [
            {
                id: 'pac',
                carrier: 'Correios',
                service: 'PAC',
                price: isFreeShipping ? 0 : 25.50,
                originalPrice: 25.50,
                deliveryDays: 7,
                deliveryRange: '5 a 9 dias úteis',
                isFree: isFreeShipping
            },
            {
                id: 'sedex',
                carrier: 'Correios',
                service: 'SEDEX',
                price: 45.90,
                originalPrice: 45.90,
                deliveryDays: 3,
                deliveryRange: '2 a 4 dias úteis',
                isFree: false
            },
            {
                id: 'jadlog',
                carrier: 'Jadlog',
                service: '.Com',
                price: 19.90,
                originalPrice: 19.90,
                deliveryDays: 10,
                deliveryRange: '8 a 12 dias úteis',
                isFree: isFreeShipping
            }
        ]

        return res.status(200).json(mockResponse)

    } catch (error) {
        console.error('Shipping Calculation Error:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export default allowCors(handler)
