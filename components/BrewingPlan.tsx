import React, { useState, useMemo, useCallback } from 'react';
import { generatePlanForBeer } from '../constants';
import type { PhaseData, BeerStyle } from '../types';
import ProgressBar from './ProgressBar';
import Phase from './Phase';

interface BrewingPlanProps {
    beer: BeerStyle;
    onBack: () => void;
}

const BrewingPlan: React.FC<BrewingPlanProps> = ({ beer, onBack }) => {
    const initialPhases = useMemo(() => generatePlanForBeer(beer), [beer]);

    const getCompletedIdsFromUrl = (): Set<string> => {
        const params = new URLSearchParams(window.location.search);
        const completed = params.get('completed');
        return new Set(completed ? completed.split(',') : []);
    };

    const [phases, setPhases] = useState<PhaseData[]>(() => {
        const completedIds = getCompletedIdsFromUrl();
        return initialPhases.map(phase => ({
            ...phase,
            tasks: phase.tasks.map(task => ({
                ...task,
                completed: completedIds.has(task.id),
            })),
        }));
    });

    const handleToggleTask = useCallback((taskId: string) => {
        setPhases(currentPhases => {
            const newPhases = currentPhases.map(phase => ({
                ...phase,
                tasks: phase.tasks.map(task =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                ),
            }));

            const updatedCompletedTaskIds = newPhases
                .flatMap(phase => phase.tasks)
                .filter(task => task.completed)
                .map(task => task.id);

            const newUrl = `${window.location.pathname}${window.location.hash}${updatedCompletedTaskIds.length > 0 ? `?completed=${updatedCompletedTaskIds.join(',')}` : ''}`;
            history.replaceState(null, '', newUrl);
            
            return newPhases;
        });
    }, []);

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
                    </div>
                </div>
            </header>
            
            <ProgressBar percentage={progressPercentage} />

            <div className="space-y-16">
                {phases.map(phase => (
                    <Phase key={phase.id} phase={phase} onToggleTask={handleToggleTask} />
                ))}
            </div>
        </div>
    );
};

export default BrewingPlan;