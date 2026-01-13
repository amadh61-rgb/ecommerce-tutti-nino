import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Ana Silva",
            occupation: "Mãe de Primeira Viagem",
            quote: "A qualidade é incrível! Meu bebê fica super confortável e as peças são lindas. Recomendo muito!",
            initials: "AS",
            color: "#FFB7C5"
        },
        {
            id: 2,
            name: "Mariana Costa",
            occupation: "Designer",
            quote: "Adorei o design e os detalhes. Perfeito para presentear! A entrega foi super rápida.",
            initials: "MC",
            color: "#87CEEB"
        },
        {
            id: 3,
            name: "Juliana Mendes",
            occupation: "Pediatra",
            quote: "Como médica, valorizo muito tecidos de qualidade. Tutti & Nino superou minhas expectativas!",
            initials: "JM",
            color: "#FFA502"
        }
    ];

    const sectionStyle = {
        padding: 'var(--spacing-lg) 0',
        backgroundColor: 'white'
    };

    const containerStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: 'var(--spacing-md)'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--color-text)',
        marginBottom: '1rem'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
    };

    const cardStyle = {
        backgroundColor: 'var(--color-background)',
        padding: '2rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    };

    const avatarStyle = (color) => ({
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: color,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        fontWeight: '700',
        marginBottom: '1rem'
    });

    const nameStyle = {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '0.25rem'
    };

    const occupationStyle = {
        fontSize: '0.9rem',
        color: 'var(--color-text-light)',
        marginBottom: '1rem'
    };

    const quoteStyle = {
        fontSize: '1rem',
        lineHeight: '1.6',
        color: 'var(--color-text)',
        fontStyle: 'italic'
    };

    return (
        <section style={sectionStyle}>
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Quem comprou, amou! 💕</h2>
                </div>

                <div style={gridStyle}>
                    {testimonials.map(testimonial => (
                        <div
                            key={testimonial.id}
                            style={cardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <div style={avatarStyle(testimonial.color)}>
                                {testimonial.initials}
                            </div>
                            <div style={nameStyle}>{testimonial.name}</div>
                            <div style={occupationStyle}>{testimonial.occupation}</div>
                            <p style={quoteStyle}>"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
