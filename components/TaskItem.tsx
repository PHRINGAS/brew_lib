
import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggle: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
    const containerClasses = `flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 ${task.completed ? 'opacity-70' : ''}`;
    const labelClasses = `flex-grow text-lg ${task.completed ? 'line-through text-gray-400' : ''}`;
    const tagClasses = `ml-4 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${task.tagClasses} ${task.completed ? 'bg-gray-300 !text-gray-600' : ''}`;

    return (
        <div className={containerClasses}>
            <input 
                type="checkbox" 
                id={task.id} 
                className="mr-3 h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <label htmlFor={task.id} className={`${labelClasses} cursor-pointer`}>
                {task.text}
            </label>
            <span className={tagClasses}>
                {task.tag}
            </span>
        </div>
    );
};

export default TaskItem;
