import React from 'react';
import { useState } from 'react';
import { supabase } from '../src/lib/supabase';
import type { BeerStyle } from '../types';
import BrewingGuide from './BrewingGuide';
import { BookOpen } from 'lucide-react';

interface BeerCardProps {
    beer: BeerStyle;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
    const handleSelect = async () => {
        // Create or get existing session when selecting a beer
        try {
            const { data: existingSessions } = await supabase
                .from('brewing_sessions')
                .select('id')
                .eq('beer_style_id', beer.id)
                .limit(1);

            if (!existingSessions || existingSessions.length === 0) {
                // Create new session
                await supabase
                    .from('brewing_sessions')
                    .insert({
                        beer_style_id: beer.id,
                        session_name: `${beer.name} - ${new Date().toLocaleDateString()}`
                    });
            }
        } catch (error) {
            console.error('Error creating session:', error);
        }

        window.location.hash = `#/plan/${beer.id}`;
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out border border-gray-200 flex flex-col">
            <div className="p-6 flex-grow">
                <div className="uppercase tracking-wide text-sm text-amber-600 font-semibold">{beer.family}</div>
                <h3 className="block mt-1 text-2xl leading-tight font-bold text-black">{beer.name}</h3>
                <p className="mt-2 text-gray-500 flex-grow">{beer.description}</p>
            </div>
            <div className="p-6 bg-gray-50">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span className="font-medium">ABV: <span className="font-normal">{beer.parameters.abv}</span></span>
                    <span className="font-medium">IBU: <span className="font-normal">{beer.parameters.ibu}</span></span>
                    <span className="font-medium">SRM: <span className="font-normal">{beer.parameters.srm}</span></span>
                </div>
                <button
                    onClick={handleSelect}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    Ver Plan de Elaboración
                </button>
            </div>
        </div>
    );
}

interface BeerSelectionProps {
    beers: BeerStyle[];
}

const BeerSelection: React.FC<BeerSelectionProps> = ({ beers }) => {
    const families = [...new Set(beers.map(b => b.family))];
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    return (
        <div>
            <header className="text-center mb-16 relative overflow-hidden">
                {/* Animated background barley */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-1/4 w-8 h-8 opacity-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
                            <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8S14 7.1 14 6V4C14 2.9 13.1 2 12 2M12 10C10.9 10 10 10.9 10 12V14C10 15.1 10.9 16 12 16S14 15.1 14 14V12C14 10.9 13.1 10 12 10M12 18C10.9 18 10 18.9 10 20V22C10 23.1 10.9 24 12 24S14 23.1 14 22V20C14 18.9 13.1 18 12 18Z"/>
                        </svg>
                    </div>
                    <div className="absolute top-16 right-1/4 w-6 h-6 opacity-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="text-amber-700">
                            <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8S14 7.1 14 6V4C14 2.9 13.1 2 12 2M12 10C10.9 10 10 10.9 10 12V14C10 15.1 10.9 16 12 16S14 15.1 14 14V12C14 10.9 13.1 10 12 10M12 18C10.9 18 10 18.9 10 20V22C10 23.1 10.9 24 12 24S14 23.1 14 22V20C14 18.9 13.1 18 12 18Z"/>
                        </svg>
                    </div>
                    <div className="absolute top-8 left-1/6 w-5 h-5 opacity-10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                            <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8S14 7.1 14 6V4C14 2.9 13.1 2 12 2M12 10C10.9 10 10 10.9 10 12V14C10 15.1 10.9 16 12 16S14 15.1 14 14V12C14 10.9 13.1 10 12 10M12 18C10.9 18 10 18.9 10 20V22C10 23.1 10.9 24 12 24S14 23.1 14 22V20C14 18.9 13.1 18 12 18Z"/>
                        </svg>
                    </div>
                    <div className="absolute top-12 right-1/6 w-7 h-7 opacity-10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
                            <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8S14 7.1 14 6V4C14 2.9 13.1 2 12 2M12 10C10.9 10 10 10.9 10 12V14C10 15.1 10.9 16 12 16S14 15.1 14 14V12C14 10.9 13.1 10 12 10M12 18C10.9 18 10 18.9 10 20V22C10 23.1 10.9 24 12 24S14 23.1 14 22V20C14 18.9 13.1 18 12 18Z"/>
                        </svg>
                    </div>
                </div>
                
                {/* Main title with enhanced styling */}
                <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 mr-4 text-amber-600 animate-pulse">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8S14 7.1 14 6V4C14 2.9 13.1 2 12 2M12 10C10.9 10 10 10.9 10 12V14C10 15.1 10.9 16 12 16S14 15.1 14 14V12C14 10.9 13.1 10 12 10M12 18C10.9 18 10 18.9 10 20V22C10 23.1 10.9 24 12 24S14 23.1 14 22V20C14 18.9 13.1 18 12 18Z"/>
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent animate-pulse">
                            El Repertorio del Cervecero
                        </h1>
                        <div className="w-12 h-12 ml-4 text-amber-600 animate-pulse" style={{ animationDelay: '0.5s' }}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8S14 7.1 14 6V4C14 2.9 13.1 2 12 2M12 10C10.9 10 10 10.9 10 12V14C10 15.1 10.9 16 12 16S14 15.1 14 14V12C14 10.9 13.1 10 12 10M12 18C10.9 18 10 18.9 10 20V22C10 23.1 10.9 24 12 24S14 23.1 14 22V20C14 18.9 13.1 18 12 18Z"/>
                            </svg>
                        </div>
                    </div>
                    
                    {/* Animated underline */}
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6 animate-pulse"></div>
                    
                    <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in">
                        Bienvenido al siguiente nivel de tu viaje cervecero. Selecciona un estilo para revelar su plan de elaboración detallado y comenzar tu próxima gran cocción.
                    </p>
                </div>
            </header>
            
            {/* Brewing Guide Button */}
            <div className="text-center mb-12">
                <button
                    onClick={() => setIsGuideOpen(true)}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                    <BookOpen className="w-6 h-6 mr-3" />
                    Guía Completa del Cervecero
                </button>
                <p className="text-gray-600 mt-3 text-sm">
                    Consulta el anexo detallado con toda la información sobre ingredientes, equipamiento y técnicas
                </p>
            </div>
            
            {families.map(family => (
                <div key={family} className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-amber-500 pb-2">{family}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {beers.filter(b => b.family === family).map(beer => (
                            <BeerCard key={beer.id} beer={beer} />
                        ))}
                    </div>
                </div>
            ))}
            
            {/* Brewing Guide Modal */}
            <BrewingGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        </div>
    );
};

export default BeerSelection;
