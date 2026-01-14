import React from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { analytics } from '../utils/analytics';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });

        // Log para console em dev
        if (import.meta.env.DEV) {
            console.error("Uncaught error:", error, errorInfo);
        }

        // Enviar para analytics
        analytics.exception(
            `${error.name}: ${error.message}`,
            true // fatal
        );

        // Em produção, aqui você enviaria para Sentry, LogRocket, etc
        // Exemplo:
        // Sentry.captureException(error, { extra: errorInfo });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            // Minimal variant for section-level errors
            if (this.props.minimal) {
                return (
                    <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
                        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-slate-600 font-medium mb-3">
                            {this.props.message || 'Erro ao carregar esta seção'}
                        </p>
                        <button
                            onClick={this.handleRetry}
                            className="text-sm text-pink-500 hover:underline flex items-center gap-1 mx-auto"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Tentar novamente
                        </button>
                    </div>
                );
            }

            return (
                <div className="min-h-screen bg-gradient-to-br from-pink-50 to-sky-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full text-center">
                        {/* Ícone */}
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>

                        {/* Título */}
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">
                            Ops! Algo deu errado 😭
                        </h1>

                        {/* Mensagem */}
                        <p className="text-slate-500 mb-6">
                            Ocorreu um erro inesperado. Nossa equipe foi notificada e
                            estamos trabalhando para resolver.
                        </p>

                        {/* Botões de ação */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                            <button
                                onClick={this.handleReload}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-all shadow-lg"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Tentar Novamente
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                            >
                                <Home className="w-5 h-5" />
                                Ir para Início
                            </button>
                        </div>

                        {/* Detalhes técnicos (apenas em dev) */}
                        {import.meta.env.DEV && this.state.error && (
                            <details className="text-left bg-slate-50 rounded-xl p-4 text-sm">
                                <summary className="cursor-pointer font-semibold text-slate-700 mb-2">
                                    Detalhes técnicos (dev)
                                </summary>
                                <pre className="whitespace-pre-wrap text-red-600 font-mono text-xs overflow-auto">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}

                        {/* Código de erro para suporte */}
                        <p className="text-xs text-slate-400 mt-4">
                            Código: {Date.now().toString(36).toUpperCase()}
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
