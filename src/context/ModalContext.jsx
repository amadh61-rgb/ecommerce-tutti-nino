// src/context/ModalContext.jsx
import React, { createContext, useState, useCallback } from 'react';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [activeModal, setActiveModal] = useState(null); // e.g., 'login', 'contact', 'privacy', etc.

    const openModal = useCallback((modalName) => {
        setActiveModal(modalName);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    return (
        <ModalContext.Provider value={{ activeModal, openModal, closeModal, setActiveModal }}>
            {children}
        </ModalContext.Provider>
    );
};
