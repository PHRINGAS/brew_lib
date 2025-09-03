
import React from 'react';
import type { PhaseData } from '../types';
import TaskItem from './TaskItem';

interface PhaseProps {
    phase: PhaseData;
    onToggleTask: (taskId: string) => void;
}

const Phase: React.FC<PhaseProps> = ({ phase, onToggleTask }) => {
    return (
        <section>
            <div className="flex items-center mb-6">
                <div className="flex-shrink-0 bg-amber-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">{phase.id}</div>
                <h2 className="ml-4 text-3xl font-bold text-gray-900">{phase.title}</h2>
            </div>
            <div className="space-y-4 ml-4 pl-14 border-l-2 border-gray-200">
                {phase.tasks.map(task => (
                    <TaskItem key={task.id} task={task} onToggle={onToggleTask} />
                ))}
            </div>
        </section>
    );
};

export default Phase;
