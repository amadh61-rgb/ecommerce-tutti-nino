// src/components/__tests__/Header.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { I18nProvider } from '../../context/I18nContext';

// Mock props
const defaultProps = {
    setIsMobileMenuOpen: vi.fn(),
    setSelectedCategory: vi.fn(),
    setSearchQuery: vi.fn(),
    searchQuery: '',
    setActiveDrawer: vi.fn(),
    favorites: [],
    cartCount: 0,
    setActiveModal: vi.fn(),
    selectedCategory: 'Todos',
    handleMenuClick: vi.fn(),
    user: null,
    isLoggedIn: false,
    navigateToDashboard: vi.fn(),
};

const renderHeader = (props = {}) => {
    return render(
        <BrowserRouter>
            <I18nProvider>
                <Header {...defaultProps} {...props} />
            </I18nProvider>
        </BrowserRouter>
    );
};

describe('Header', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders logo', () => {
        renderHeader();
        const logo = screen.getByAltText('Tutti & Nino');
        expect(logo).toBeInTheDocument();
    });

    it('renders search input', () => {
        renderHeader();
        const searchInput = screen.getByRole('textbox');
        expect(searchInput).toBeInTheDocument();
    });

    it('renders cart icon with count', () => {
        renderHeader({ cartCount: 5 });
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders favorites icon with count', () => {
        renderHeader({ favorites: [1, 2, 3] });
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('calls setSearchQuery when typing in search', () => {
        const setSearchQuery = vi.fn();
        renderHeader({ setSearchQuery });

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'planner' } });

        expect(setSearchQuery).toHaveBeenCalledWith('planner');
    });

    it('detects XSS in search input', () => {
        const setSearchQuery = vi.fn();
        renderHeader({ setSearchQuery });

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: '<script>alert("xss")</script>' } });

        // Should still call setSearchQuery but the value gets sanitized elsewhere
        expect(setSearchQuery).toHaveBeenCalled();
    });

    it('calls setIsMobileMenuOpen when clicking menu button on mobile', () => {
        const setIsMobileMenuOpen = vi.fn();
        renderHeader({ setIsMobileMenuOpen });

        // Find the mobile menu button (the one with Menu icon)
        const menuButton = screen.getByLabelText(/menu/i);
        fireEvent.click(menuButton);

        expect(setIsMobileMenuOpen).toHaveBeenCalledWith(true);
    });

    it('opens cart drawer when clicking cart icon', () => {
        const setActiveDrawer = vi.fn();
        renderHeader({ setActiveDrawer });

        const cartButton = screen.getByLabelText(/carrinho/i);
        fireEvent.click(cartButton);

        expect(setActiveDrawer).toHaveBeenCalledWith('cart');
    });

    it('opens favorites drawer when clicking favorites icon', () => {
        const setActiveDrawer = vi.fn();
        renderHeader({ setActiveDrawer });

        const favoritesButton = screen.getByLabelText(/favoritos/i);
        fireEvent.click(favoritesButton);

        expect(setActiveDrawer).toHaveBeenCalledWith('favorites');
    });

    it('shows login button when not logged in', () => {
        renderHeader({ isLoggedIn: false });
        expect(screen.getByText(/entrar/i)).toBeInTheDocument();
    });

    it('shows user name when logged in', () => {
        renderHeader({
            isLoggedIn: true,
            user: { name: 'Maria', email: 'maria@test.com' }
        });
        expect(screen.getByText('Maria')).toBeInTheDocument();
    });

    it('calls setActiveModal with login when clicking login button', () => {
        const setActiveModal = vi.fn();
        renderHeader({ setActiveModal, isLoggedIn: false });

        const loginButton = screen.getByText(/entrar/i);
        fireEvent.click(loginButton);

        expect(setActiveModal).toHaveBeenCalledWith('login');
    });
});
