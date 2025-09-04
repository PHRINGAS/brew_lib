
import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggle: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
    const containerClasses = `flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 ${task.completed ? 'opacity-70' : ''}`;
    const labelClasses = `flex-grow text-lg text-gray-900 dark:text-gray-100 ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`;
    const tagClasses = `ml-4 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${task.tagClasses} ${task.completed ? 'bg-gray-300 dark:bg-gray-600 !text-gray-600 dark:!text-gray-400' : ''}`;

    return (
        <div className={containerClasses}>
            <input 
                type="checkbox" 
                id={task.id} 
                className="mr-3 h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-amber-600 dark:text-amber-500 focus:ring-amber-500 dark:focus:ring-amber-400 cursor-pointer bg-white dark:bg-gray-700"
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
