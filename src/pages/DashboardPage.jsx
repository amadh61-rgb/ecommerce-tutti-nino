// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import UserDashboard from '../components/UserDashboard';
import SEO from '../components/SEO';
import { mockOrders } from '../data/mockData';
import { useI18n } from '../hooks/useI18n';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { t } = useI18n();
    const { user, isLoggedIn, setIsLoggedIn, setUser, setActiveDrawer, setTrackingCode } = useOutletContext();

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
        setIsLoggedIn(false);
        setUser(null);
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
