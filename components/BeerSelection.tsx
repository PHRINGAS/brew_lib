import React from 'react';
import { supabase } from '../lib/supabase';
import type { BeerStyle } from '../types';

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

    return (
        <div>
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">El Repertorio del Cervecero</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">Bienvenido al siguiente nivel de tu viaje cervecero. Selecciona un estilo para revelar su plan de elaboración detallado y comenzar tu próxima gran cocción.</p>
            </header>
            
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
        </div>
    );
};

export default BeerSelection;
