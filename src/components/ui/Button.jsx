import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * @typedef {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg' | 'icon'} ButtonSize
 */

/**
 * Componente de Botão reutilizável com variantes de estilo
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {ButtonVariant} [props.variant='primary'] - Estilo do botão
 * @param {ButtonSize} [props.size='md'] - Tamanho do botão
 * @param {boolean} [props.isLoading=false] - Estado de carregamento
 * @param {boolean} [props.disabled=false] - Estado desabilitado
 * @param {string} [props.className] - Classes adicionais
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Outros atributos HTML de botão
 */
const Button = React.forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {

    // Base styles applied to all buttons
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 touch-target";

    // Variants map
    const variants = {
        primary: "bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-200 focus:ring-pink-400",
        secondary: "bg-pink-100 hover:bg-pink-200 text-pink-600 focus:ring-pink-300",
        outline: "border-2 border-pink-500 text-pink-500 hover:bg-pink-50 focus:ring-pink-400",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-pink-500 focus:ring-slate-300",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-200 focus:ring-red-400",
    };

    // Sizes map
    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
        icon: "p-2", // For icon-only buttons
    };

    const variantStyles = variants[variant] || variants.primary;
    const sizeStyles = sizes[size] || sizes.md;

    return (
        <button
            ref={ref}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
            {...props}
        >
            {isLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
