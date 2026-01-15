/**
 * Shipping Calculation Endpoint
 * POST /api/shipping/calculate
 * 
 * Proxies requests to Melhor Envio API using the secure token
 * stored in environment variables.
 */
export default async function handler(req, res) {
    // CORS Configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { zipCode, items } = req.body;

        if (!zipCode) {
            return res.status(400).json({ error: 'CEP é obrigatório' });
        }

        // TODO: Call Melhor Envio API with process.env.MELHOR_ENVIO_TOKEN

        // Mock Response for Scaffolding Phase
        const mockShippingOptions = [
            {
                id: 1,
                name: 'SEDEX',
                price: 25.50,
                days: 2,
                company: 'Correios',
                logo: 'https://melhorenvio.com.br/images/shipping-companies/correios.png'
            },
            {
                id: 2,
                name: 'PAC',
                price: 15.90,
                days: 5,
                company: 'Correios',
                logo: 'https://melhorenvio.com.br/images/shipping-companies/correios.png'
            }
        ];

        return res.status(200).json(mockShippingOptions);
    } catch (error) {
        console.error('Shipping Calculation Error:', error);
        return res.status(500).json({ error: 'Erro ao calcular frete' });
    }
}
