
import React from 'react';

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className="mb-12">
            <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                <span>Progreso Total</span>
                <span>{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                    className="bg-amber-600 h-4 rounded-full transition-width duration-300 ease-in-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
