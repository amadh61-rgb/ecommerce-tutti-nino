import React from 'react';
import { Helmet } from 'react-helmet-async';

const DOMAIN = 'https://tuttienino.com.br';

export default function SEO({
    title,
    description,
    image,
    url,
    type = 'website',
    product,
    fullTitle = false
}) {
    const metaTitle = fullTitle ? title : `${title} | Tutti & Nino`;
    const metaDescription = description || "Tutti & Nino - Papelaria fofa, adesivos, planners e muito mais para organizar sua vida com estilo.";
    const metaImage = image ? (image.startsWith('http') ? image : `${DOMAIN}${image}`) : `${DOMAIN}/og-default.jpg`;
    const metaUrl = url ? (url.startsWith('http') ? url : `${DOMAIN}${url}`) : DOMAIN;

    // Schema Markup Generation
    let schema = null;

    if (product) {
        // Product Schema
        schema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": Array.isArray(product.image) ? product.image : [product.image],
            "description": product.description,
            "sku": `SKU-${product.id}`,
            "brand": {
                "@type": "Brand",
                "name": "Tutti & Nino"
            },
            "offers": {
                "@type": "Offer",
                "url": metaUrl,
                "priceCurrency": "BRL",
                "price": product.price.toFixed(2),
                "availability": "https://schema.org/InStock",
                "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                        "@type": "MonetaryAmount",
                        "value": 0,
                        "currency": "BRL"
                    },
                    "deliveryTime": {
                        "@type": "ShippingDeliveryTime",
                        "handlingTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 0,
                            "maxValue": 1,
                            "unitCode": "DAY"
                        },
                        "transitTime": {
                            "@type": "QuantitativeValue",
                            "minValue": 1,
                            "maxValue": 5,
                            "unitCode": "DAY"
                        }
                    }
                },
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "BR",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": 30,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                }
            }
        };

        if (product.rating && product.reviews) {
            schema.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviews
            };
        }
    } else {
        // WebSite / Organization Schema for Home
        schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "Tutti & Nino",
                    "url": DOMAIN,
                    "logo": `${DOMAIN}/logo.png`,
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+55-11-99999-9999",
                        "contactType": "customer service"
                    }
                },
                {
                    "@type": "WebSite",
                    "url": DOMAIN,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${DOMAIN}/busca?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                }
            ]
        };
    }

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content="Tutti & Nino" />
            {product && (
                <>
                    <meta property="og:price:amount" content={product.price.toFixed(2)} />
                    <meta property="og:price:currency" content="BRL" />
                </>
            )}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* JSON-LD Schema */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
