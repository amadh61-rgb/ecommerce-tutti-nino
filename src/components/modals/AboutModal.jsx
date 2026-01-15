import React from 'react';
import { useI18n } from '../../hooks/useI18n';

export default function AboutModal() {
    const { t } = useI18n();

    return (
        <div className="p-8 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('footer.about')}</h2>

            <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                    A <strong>Tutti & Nino</strong> nasceu do desejo de transformar a organização em momentos de inspiração.
                    Acreditamos que planejar a rotina não precisa ser uma tarefa chata, mas sim uma experiência criativa e prazerosa.
                </p>

                <div>
                    <h3 className="text-lg font-bold text-rose-900 mb-2">Nossa Missão</h3>
                    <p>
                        Trazer cor e leveza para o seu dia a dia através de papelaria criativa, funcional e de alta qualidade.
                        Queremos ser sua parceira na realização de sonhos e metas.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-rose-900 mb-2">Nossos Valores</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Criatividade:</strong> Design autoral e exclusivo.</li>
                        <li><strong>Qualidade:</strong> Materiais premium que duram.</li>
                        <li><strong>Comunidade:</strong> Crescer junto com nossos clientes.</li>
                        <li><strong>Sustentabilidade:</strong> Processos conscientes.</li>
                    </ul>
                </div>

                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                    <p className="text-pink-800 text-center font-medium">
                        "Organizando sonhos com amor e estilo desde 2026."
                    </p>
                </div>
            </div>
        </div>
    );
}
