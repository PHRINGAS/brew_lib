import React from 'react';
import { supabase } from '../src/lib/supabase';
import { useTheme } from '../src/contexts/ThemeContext';

interface Beer {
  id: string;
  name: string;
  description: string;
  abv: string;
  ibu: string;
  color: string;
}

interface BeerSelectionProps {
  beers: Beer[];
  onBeerSelect: (beerId: string) => void;
}

const BeerCard: React.FC<{ beer: Beer; onSelect: () => void }> = ({ beer, onSelect }) => {
  const { theme } = useTheme();
  
  const handleSelect = async () => {
    try {
      // Create or find existing brewing session
      const { data: existingSession } = await supabase
        .from('brewing_sessions')
        .select('*')
        .eq('beer_style_id', beer.id)
        .single();

      if (!existingSession) {
        const { error } = await supabase
          .from('brewing_sessions')
          .insert({
            beer_style_id: beer.id,
            session_name: `${beer.name} Brewing Session`
          });

        if (error) {
          console.error('Error creating brewing session:', error);
          return;
        }
      }

      onSelect();
    } catch (error) {
      console.error('Error handling beer selection:', error);
      onSelect(); // Still proceed with selection even if DB operation fails
    }
  };

  return (
    <div 
      className={`${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } border rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105`}
      onClick={handleSelect}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {beer.name}
        </h3>
        <div 
          className="w-8 h-8 rounded-full border-2 border-gray-300"
          style={{ backgroundColor: beer.color }}
        />
      </div>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        {beer.description}
      </p>
      <div className="flex justify-between text-sm">
        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          ABV: <span className="font-semibold text-amber-600">{beer.abv}</span>
        </span>
        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          IBU: <span className="font-semibold text-amber-600">{beer.ibu}</span>
        </span>
      </div>
    </div>
  );
};

const BeerSelection: React.FC<BeerSelectionProps> = ({ beers, onBeerSelect }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-orange-100'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
            <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm-6-8L2 12l4-2v4zm12 0v-4l4 2-4 2z"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
            <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm-6-8L2 12l4-2v4zm12 0v-4l4 2-4 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
            <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm-6-8L2 12l4-2v4zm12 0v-4l4 2-4 2z"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="animate-pulse mr-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
                <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm-6-8L2 12l4-2v4zm12 0v-4l4 2-4 2z"/>
              </svg>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent animate-pulse">
              BrewMaster Pro
            </h1>
            <div className="animate-pulse ml-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-amber-600">
                <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm-6-8L2 12l4-2v4zm12 0v-4l4 2-4 2z"/>
              </svg>
            </div>
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto mb-6 animate-pulse"></div>
          
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto animate-slide-up`} 
             style={{ animationDelay: '0.5s' }}>
            Choose your beer style and let us guide you through the perfect brewing process
          </p>
        </div>

        {/* Beer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beers.map((beer) => (
            <BeerCard 
              key={beer.id} 
              beer={beer} 
              onSelect={() => onBeerSelect(beer.id)} 
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default BeerSelection;