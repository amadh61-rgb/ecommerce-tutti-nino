import React from 'react';
import { useI18n } from '../hooks/useI18n';

const AnnouncementBar = () => {
    const { t } = useI18n();

    return (
        <div className="bg-pink-500 text-white py-3 text-center shadow-md">
            <p style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>
                {t('announcement.freeShipping')}
            </p>
        </div>
    );
};

export default AnnouncementBar;
