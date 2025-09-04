import React, { useState, useEffect } from 'react';
import type { BeerStyle } from './types';
import { BEER_STYLES_DATA } from './constants';
import { ThemeProvider } from './src/contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import BeerSelection from './components/BeerSelection';
import BrewingPlan from './components/BrewingPlan';

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const handleGoBack = () => {
        window.location.hash = '';
    };

    const renderContent = () => {
        const planMatch = route.match(/^#\/plan\/([\w-]+)/);
        
        if (planMatch) {
            const beerId = planMatch[1];
            const selectedBeer = BEER_STYLES_DATA.find(b => b.id === beerId);

            if (selectedBeer) {
                return <BrewingPlan beer={selectedBeer} onBack={handleGoBack} />;
            }
        }
        
        return <BeerSelection beers={BEER_STYLES_DATA} />;
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <ThemeToggle />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {renderContent()}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
