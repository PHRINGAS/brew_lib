import React, { useState, useMemo, useCallback } from 'react';
import { generatePlanForBeer } from '../constants';
import type { PhaseData, BeerStyle } from '../types';
import { useBrewingProgress } from '../hooks/useBrewingProgress';
import ProgressBar from './ProgressBar';
import Phase from './Phase';

interface BrewingPlanProps {
    beer: BeerStyle;
    onBack: () => void;
}

const BrewingPlan: React.FC<BrewingPlanProps> = ({ beer, onBack }) => {
    const initialPhases = useMemo(() => generatePlanForBeer(beer), [beer]);
    const { taskProgress, toggleTask, loading, error, isTaskCompleted } = useBrewingProgress(beer.id);

    const phases = useMemo(() => {
        return initialPhases.map(phase => ({
            ...phase,
            tasks: phase.tasks.map(task => ({
                ...task,
                completed: isTaskCompleted(task.id),
            })),
        }));
    }, [initialPhases, isTaskCompleted]);

    const { totalTasks, completedTasks } = useMemo(() => {
        let total = 0;
        let completed = 0;
        phases.forEach(phase => {
            total += phase.tasks.length;
            completed += phase.tasks.filter(task => task.completed).length;
        });
        return { totalTasks: total, completedTasks: completed };
    }, [phases]);

    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Cargando progreso de elaboración...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div>
            <header className="mb-12">
                <button onClick={onBack} className="text-amber-600 hover:text-amber-800 font-semibold mb-4 text-lg">
                    &larr; Volver a la Selección de Estilos
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Plan de Elaboración: {beer.name}</h1>
                        <p className="text-lg text-gray-600 max-w-3xl">{beer.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            Progreso compartido en tiempo real - Los cambios se sincronizan automáticamente entre dispositivos
                        </div>
                    </div>
                </div>
            </header>
            
            {beer.notes && (
                <div className="my-8 p-4 bg-amber-100 border-l-4 border-amber-500 text-amber-700 rounded-r-lg shadow">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-bold text-amber-800">Notas del Cervecero</h3>
                            <div className="mt-2 text-md text-amber-900">
                                <p>{beer.notes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ProgressBar percentage={progressPercentage} />

            <div className="space-y-16">
                {phases.map(phase => (
                    <Phase key={phase.id} phase={phase} onToggleTask={toggleTask} />
                ))}
            </div>
        </div>
    );
};

export default BrewingPlan;