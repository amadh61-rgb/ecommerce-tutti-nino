// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../components/UserDashboard';
import SEO from '../components/SEO';
import { mockUser, mockOrders } from '../data/mockData';
import { useI18n } from '../hooks/useI18n';

export default function DashboardPage({ user, isLoggedIn, onLogout, setActiveDrawer, setTrackingCode }) {
    const navigate = useNavigate();
    const { t } = useI18n();

    // Se não estiver logado, redireciona para home
    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn || !user) {
        return null;
    }

    const handleTrackOrder = (code) => {
        setTrackingCode(code);
        setActiveDrawer('tracking');
    };

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <>
            <SEO
                title={t('dashboard.title')}
                description={t('dashboard.description')}
            />
            <UserDashboard
                user={user}
                orders={mockOrders}
                onTrackOrder={handleTrackOrder}
                onLogout={handleLogout}
            />
        </>
    );
}
