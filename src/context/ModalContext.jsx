// src/context/ModalContext.jsx
import React, { createContext, useState, useCallback } from 'react';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [activeModal, setActiveModal] = useState(null); // 'login', 'contact', etc.
    const [modalData, setModalData] = useState(null); // Data passed to the modal
    const [activeDrawer, setActiveDrawer] = useState(null); // 'cart', 'favorites', 'tracking'
    const [notification, setNotification] = useState(null); // { message: string, type: 'success'|'error' }

    // Tracking State
    const [trackingCode, setTrackingCode] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);

    const openModal = useCallback((modalName, data = null) => {
        setModalData(data);
        setActiveModal(modalName);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setModalData(null);
    }, []);

    const openDrawer = useCallback((drawerName) => {
        setActiveDrawer(drawerName);
    }, []);

    const closeDrawer = useCallback(() => {
        setActiveDrawer(null);
    }, []);

    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    }, []);

    return (
        <ModalContext.Provider value={{
            activeModal,
            modalData,
            openModal,
            closeModal,
            activeDrawer,
            openDrawer,
            closeDrawer,
            notification,
            showNotification,
            trackingCode,
            setTrackingCode,
            trackingResult,
            setTrackingResult
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error('useModal deve ser usado dentro de um ModalProvider');
    }
    return context;
};
