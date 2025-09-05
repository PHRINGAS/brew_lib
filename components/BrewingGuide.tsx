import React from 'react';
import { X, Book, Thermometer, Beaker, Clock, Droplets, Wheat, Hop, FlaskConical, Scale } from 'lucide-react';

interface BrewingGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

const BrewingGuide: React.FC<BrewingGuideProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-xl">
                    <div className="flex items-center">
                        <Book className="w-8 h-8 text-amber-600 mr-3" />
                        <h2 className="text-3xl font-bold text-gray-900">Guía Completa del Cervecero</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="p-6 space-y-12">
                    {/* Equipamiento */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Beaker className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Equipamiento Esencial</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-amber-700">Equipamiento Básico</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li><strong>Olla de cocción (25L+):</strong> Para macerar y hervir el mosto. Acero inoxidable preferible.</li>
                                    <li><strong>Fermentador (25L+):</strong> Recipiente hermético con airlock para fermentación.</li>
                                    <li><strong>Airlock:</strong> Permite escape de CO₂ sin entrada de contaminantes.</li>
                                    <li><strong>Termómetro:</strong> Control preciso de temperaturas (0-100°C).</li>
                                    <li><strong>Densímetro + Probeta:</strong> Medir densidad y calcular alcohol.</li>
                                    <li><strong>Bolsa BIAB:</strong> Para maceración "Brew in a Bag" sin equipos complejos.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-amber-700">Equipamiento Avanzado</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li><strong>Controlador de Temperatura (STC-1000):</strong> Mantiene temperatura exacta de fermentación.</li>
                                    <li><strong>Heladera + Resistencia:</strong> Sistema de control térmico completo.</li>
                                    <li><strong>Enfriador de Mosto:</strong> Reduce tiempo de enfriamiento y contaminación.</li>
                                    <li><strong>Balanza de Precisión:</strong> Para pesar lúpulos y aditivos con exactitud.</li>
                                    <li><strong>pH Metro:</strong> Control del pH del mosto (ideal 5.2-5.6).</li>
                                    <li><strong>Bomba de Trasvase:</strong> Minimiza oxidación en trasvases.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Ingredientes - Maltas */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Wheat className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Maltas y Granos</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-amber-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-amber-800">Maltas Base</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Malta Pale Ale:</strong> Base versátil, sabor limpio, 80-90% del grano.</li>
                                    <li><strong>Malta Pilsen:</strong> Más clara, ideal para lagers y cervezas belgas.</li>
                                    <li><strong>Malta Munich:</strong> Aporta color dorado y sabor maltoso.</li>
                                    <li><strong>Malta Viena:</strong> Color ámbar claro, sabor tostado suave.</li>
                                    <li><strong>Maris Otter:</strong> Malta británica premium, sabor distintivo.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-amber-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-amber-800">Maltas Crystal/Caramelo</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Crystal 40L:</strong> Dulzor suave, color dorado.</li>
                                    <li><strong>Crystal 60L:</strong> Caramelo medio, color ámbar.</li>
                                    <li><strong>Crystal 80L:</strong> Caramelo intenso, color rojizo.</li>
                                    <li><strong>Crystal 120L:</strong> Sabor a pasas, color oscuro.</li>
                                    <li><strong>Special B:</strong> Pasas, higos, color muy oscuro.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-amber-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-amber-800">Maltas Tostadas</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Malta Chocolate:</strong> Sabor a chocolate, sin amargor.</li>
                                    <li><strong>Malta Negra:</strong> Color negro, sabor tostado intenso.</li>
                                    <li><strong>Cebada Tostada:</strong> Sabor seco, característico de stouts.</li>
                                    <li><strong>Carafa Special:</strong> Color sin astringencia.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Lúpulos */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Hop className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Lúpulos</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-green-800">Lúpulos de Amargor</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Magnum:</strong> Alto alfa (12-14%), amargor limpio, neutro.</li>
                                    <li><strong>Warrior:</strong> Muy alto alfa (15-17%), amargor intenso.</li>
                                    <li><strong>Northern Brewer:</strong> Amargor tradicional, notas terrosas.</li>
                                    <li><strong>Target:</strong> Amargor firme, usado en stouts británicas.</li>
                                </ul>
                                <p className="text-xs text-gray-600 mt-3"><strong>Uso:</strong> Se añaden al inicio del hervor (60 min) para extraer máximo amargor.</p>
                            </div>
                            
                            <div className="bg-green-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-green-800">Lúpulos Aromáticos</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Cascade:</strong> Cítrico, floral, el clásico americano.</li>
                                    <li><strong>Centennial:</strong> Cítrico intenso, pomelo y limón.</li>
                                    <li><strong>Citra:</strong> Frutas tropicales, lima, maracuyá.</li>
                                    <li><strong>Mosaic:</strong> Complejo, frutas tropicales y bayas.</li>
                                    <li><strong>Amarillo:</strong> Cítrico, floral, naranja.</li>
                                    <li><strong>Simcoe:</strong> Pino, frutas de la pasión.</li>
                                    <li><strong>Saaz:</strong> Floral, especiado, lúpulo noble.</li>
                                </ul>
                                <p className="text-xs text-gray-600 mt-3"><strong>Uso:</strong> Últimos 15 min del hervor, whirlpool, dry hop.</p>
                            </div>
                        </div>
                    </section>

                    {/* Levaduras */}
                    <section>
                        <div className="flex items-center mb-6">
                            <FlaskConical className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Levaduras</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-blue-800">Levaduras Ale</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Safale US-05:</strong> Americana limpia, 15-24°C, versátil.</li>
                                    <li><strong>Safale S-04:</strong> Británica, frutada, 15-20°C.</li>
                                    <li><strong>Safbrew T-58:</strong> Belga, especiada, 15-25°C.</li>
                                    <li><strong>Belle Saison:</strong> Saison, seca, 18-28°C.</li>
                                    <li><strong>Verdant IPA:</strong> NEIPA, turbia, 18-22°C.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-blue-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-blue-800">Levaduras Lager</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Saflager W-34/70:</strong> Alemana clásica, 9-15°C.</li>
                                    <li><strong>Saflager S-23:</strong> Más frutada, 12-15°C.</li>
                                </ul>
                                <p className="text-xs text-gray-600 mt-3"><strong>Nota:</strong> Requieren fermentación fría y lagering prolongado.</p>
                            </div>
                            
                            <div className="bg-blue-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-blue-800">Levaduras Especiales</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Munich Classic:</strong> Weizen, banana y clavo.</li>
                                    <li><strong>Abbaye:</strong> Trapense, compleja, frutada.</li>
                                    <li><strong>Lactobacillus:</strong> Bacteria para acidificación.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Procesos y Técnicas */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Thermometer className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Procesos y Técnicas</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-purple-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-purple-800">Maceración</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>64-65°C:</strong> Final seco, más fermentable.</li>
                                    <li><strong>66-67°C:</strong> Equilibrado, uso general.</li>
                                    <li><strong>68-69°C:</strong> Cuerpo pleno, menos fermentable.</li>
                                    <li><strong>Tiempo:</strong> 60-75 minutos típico.</li>
                                    <li><strong>pH Objetivo:</strong> 5.2-5.6 para eficiencia óptima.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-purple-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-purple-800">Fermentación</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Control de Temperatura:</strong> Crítico para perfil de sabor.</li>
                                    <li><strong>Ales:</strong> 18-22°C generalmente.</li>
                                    <li><strong>Lagers:</strong> 9-15°C, requiere lagering.</li>
                                    <li><strong>Belgas:</strong> Pueden fermentar más caliente (24-28°C).</li>
                                    <li><strong>Duración:</strong> 7-14 días primaria, 2-4 semanas total.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Aditivos y Químicos */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Droplets className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Aditivos y Tratamiento de Agua</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-cyan-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-cyan-800">Sales de Agua</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Sulfato de Calcio (Gypsum):</strong> Realza amargor, final seco.</li>
                                    <li><strong>Cloruro de Calcio:</strong> Realza dulzor, cuerpo pleno.</li>
                                    <li><strong>Sulfato de Magnesio:</strong> Complementa gypsum, sabor seco.</li>
                                    <li><strong>Bicarbonato de Sodio:</strong> Ajusta pH en cervezas oscuras.</li>
                                    <li><strong>Relación SO₄/Cl:</strong> 3:1 para IPAs, 1:2 para maltosas.</li>
                                </ul>
                            </div>
                            
                            <div className="bg-cyan-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-cyan-800">Otros Aditivos</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li><strong>Lactosa:</strong> Azúcar no fermentable, dulzor residual.</li>
                                    <li><strong>Dextrosa:</strong> Azúcar simple, aumenta alcohol sin sabor.</li>
                                    <li><strong>Sirope de Candi:</strong> Azúcar belga, sabores complejos.</li>
                                    <li><strong>Cáscaras de Arroz:</strong> Ayuda filtración en granos pegajosos.</li>
                                    <li><strong>Coriandro:</strong> Especia para witbiers, 20-30g.</li>
                                    <li><strong>Cáscara de Naranja:</strong> Cítrico para witbiers, solo parte naranja.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Técnicas Especiales */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Scale className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Técnicas Especiales</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-orange-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-orange-800">Dry Hopping</h4>
                                <p className="text-gray-700 text-sm mb-3">Adición de lúpulos durante o después de fermentación para aroma intenso sin amargor.</p>
                                <ul className="space-y-1 text-gray-700 text-sm">
                                    <li>• <strong>Timing:</strong> Durante fermentación activa o 3-5 días antes de envasar</li>
                                    <li>• <strong>Cantidad:</strong> 2-8g por litro según estilo</li>
                                    <li>• <strong>Duración:</strong> 3-7 días máximo</li>
                                    <li>• <strong>Cuidado:</strong> Minimizar oxidación en NEIPA</li>
                                </ul>
                            </div>
                            
                            <div className="bg-orange-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-orange-800">Kettle Souring</h4>
                                <p className="text-gray-700 text-sm mb-3">Técnica para crear cervezas ácidas usando Lactobacillus antes de la fermentación principal.</p>
                                <ul className="space-y-1 text-gray-700 text-sm">
                                    <li>• <strong>Proceso:</strong> Macerar → Hervir 15min → Enfriar a 40°C</li>
                                    <li>• <strong>Inocular:</strong> Lactobacillus, mantener 35-45°C</li>
                                    <li>• <strong>Tiempo:</strong> 24-48h hasta acidez deseada</li>
                                    <li>• <strong>Finalizar:</strong> Hervir para matar bacteria, fermentar normal</li>
                                </ul>
                            </div>
                            
                            <div className="bg-orange-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-orange-800">Lagering</h4>
                                <p className="text-gray-700 text-sm mb-3">Maduración en frío prolongada para lagers, suaviza sabores y clarifica.</p>
                                <ul className="space-y-1 text-gray-700 text-sm">
                                    <li>• <strong>Temperatura:</strong> 0-2°C después de fermentación</li>
                                    <li>• <strong>Duración:</strong> 4-8 semanas mínimo</li>
                                    <li>• <strong>Beneficios:</strong> Claridad, suavidad, sabores integrados</li>
                                </ul>
                            </div>
                            
                            <div className="bg-orange-50 p-5 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-orange-800">Whirlpool</h4>
                                <p className="text-gray-700 text-sm mb-3">Adición de lúpulos al final del hervor con temperatura controlada.</p>
                                <ul className="space-y-1 text-gray-700 text-sm">
                                    <li>• <strong>Temperatura:</strong> 70-80°C, menos amargor que hervor</li>
                                    <li>• <strong>Tiempo:</strong> 15-30 minutos</li>
                                    <li>• <strong>Resultado:</strong> Aroma intenso, amargor moderado</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Mediciones y Control */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Clock className="w-7 h-7 text-amber-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Mediciones y Control de Calidad</h3>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Densidades</h4>
                                    <ul className="space-y-2 text-gray-700 text-sm">
                                        <li><strong>OG (Original Gravity):</strong> Densidad inicial, indica azúcares disponibles</li>
                                        <li><strong>FG (Final Gravity):</strong> Densidad final, indica azúcares residuales</li>
                                        <li><strong>Atenuación:</strong> % de azúcares fermentados</li>
                                        <li><strong>ABV:</strong> (OG-FG) × 131.25 = % alcohol aproximado</li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Parámetros Clave</h4>
                                    <ul className="space-y-2 text-gray-700 text-sm">
                                        <li><strong>IBU:</strong> Unidades de amargor, 10-100+ típico</li>
                                        <li><strong>SRM:</strong> Color, 2 (pálido) a 40+ (negro)</li>
                                        <li><strong>pH Mosto:</strong> 5.2-5.6 ideal para enzimas</li>
                                        <li><strong>pH Cerveza:</strong> 4.0-4.6 final típico</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BrewingGuide;