import React from 'react';
import { useI18n } from '../hooks/useI18n';

const AnnouncementBar = () => {
    const { t } = useI18n();

    return (
        <div className="bg-pink-500 text-white py-3 text-center shadow-md">
            <p className="text-xs md:text-xl font-bold md:font-extrabold tracking-tight md:tracking-wide px-1 md:px-4 whitespace-nowrap overflow-hidden text-ellipsis">
                {t('announcement.freeShipping')}
            </p>
        </div>
    );
};

export default AnnouncementBar;
