import type { BeerStyle, PhaseData, Task } from './types';

// FIX: Renamed `classes` to `tagClasses` to match the `Task` type interface.
const TAGS = {
    CHEFUEAR: { tag: "Chequear", tagClasses: "text-red-600 bg-red-200" },
    COMPRAR: { tag: "Comprar", tagClasses: "text-green-600 bg-green-200" },
    INVESTIGAR: { tag: "Investigar", tagClasses: "text-yellow-600 bg-yellow-200" },
    PREPARAR: { tag: "Preparar", tagClasses: "text-indigo-600 bg-indigo-200" },
    DEFINIR: { tag: "Definir", tagClasses: "text-purple-600 bg-purple-200" },
    EJECUTAR: { tag: "Ejecutar", tagClasses: "text-pink-600 bg-pink-200" },
    ESPERAR: { tag: "Esperar", tagClasses: "text-blue-600 bg-blue-200" },
    DISFRUTAR: { tag: "Disfrutar", tagClasses: "text-teal-600 bg-teal-200" },
};

export const BEER_STYLES_DATA: BeerStyle[] = [
    // --- Parte 1: Las Ales Clásicas ---
    {
        id: "apa",
        name: "American Pale Ale (APA)",
        family: "Ales Clásicas Americanas y Británicas",
        description: "El clásico rebelde que encendió la revolución craft. Celebra el lúpulo con notas cítricas y resinosas, balanceado con una base de malta.",
        parameters: { ibu: "30–50", abv: "4.5–6.2%", srm: "5–10" },
        recipe: {
            malts: ["4.5 kg de Malta Pale Ale", "400 g de Malta Crystal 40L (o Caramelo 60)"],
            hops: ["20 g Cascade (60 min)", "30 g Cascade (10 min)", "30 g Cascade (0 min / whirlpool)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale US-05",
        },
        brewing: {
            mashingTemp: "66-67°C",
            fermentationTemp: "18-20°C",
            boilTime: "60 min",
        },
        notes: "Para acentuar el amargor nítido de la APA, añade 3-4 gramos de Sulfato de Calcio (Gypsum) al agua de macerado. Esto ajustará el perfil mineral y hará que el lúpulo brille."
    },
    {
        id: "irish-red",
        name: "Irish Red Ale",
        family: "Ales Clásicas Americanas y Británicas",
        description: "Una ale elegante y maltosa, con un dulzor a caramelo y toffee balanceado por un final seco y un sutil toque tostado. Pura bebilidad.",
        parameters: { ibu: "18–28", abv: "3.8–5.0%", srm: "9–14" },
        recipe: {
            malts: ["4.0 kg de Malta Pale Ale (o Maris Otter)", "450 g de Malta Crystal 60L", "100 g de Cebada Tostada (sin maltear)"],
            hops: ["30 g de East Kent Goldings (60 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale S-04",
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "18-20°C",
            boilTime: "60 min",
        },
        notes: "Para evitar astringencia, añade la Cebada Tostada molida solo durante los últimos 10-15 minutos del macerado. Esto extraerá color y sequedad sin aspereza."
    },
    {
        id: "american-amber-ale",
        name: "American Amber Ale",
        family: "Ales Clásicas Americanas y Británicas",
        description: "El punto medio perfecto. Equilibrio entre el enfoque maltoso de las ales británicas y la obsesión por el lúpulo de las americanas.",
        parameters: { ibu: "25–40", abv: "4.5–6.2%", srm: "10–17" },
        recipe: {
            malts: ["4.2 kg de Malta Pale Ale", "500 g de Malta Munich", "400 g de Malta Crystal 60L", "150 g de Malta Crystal 120L"],
            hops: ["15 g Centennial (60 min)", "25 g Cascade (15 min)", "25 g Amarillo (0 min / whirlpool)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale US-05",
        },
        brewing: {
            mashingTemp: "67-68°C",
            fermentationTemp: "18-20°C",
            boilTime: "60 min",
        },
        notes: "La clave es la selección y el momento de las adiciones de lúpulo. Macerar en el rango medio-alto (67-68°C) dejará un cuerpo más pleno que soporta mejor el carácter del lúpulo y la malta."
    },
    {
        id: "american-brown-ale",
        name: "American Brown Ale",
        family: "Ales Clásicas Americanas y Británicas",
        description: "Caramelo, chocolate y lúpulo. La hermana más oscura y robusta de la Amber Ale, balanceada por una saludable dosis de lúpulo americano.",
        parameters: { ibu: "20–30", abv: "4.3–6.2%", srm: "18–35" },
        recipe: {
            malts: ["4.5 kg de Malta Pale Ale", "500 g de Malta Crystal 80L", "300 g de Malta Chocolate", "100 g de Malta Negra (Black Patent)"],
            hops: ["25 g Magnum (60 min)", "25 g Fuggle (10 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale US-05",
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "18-20°C",
            boilTime: "60 min",
        },
        notes: "Las maltas tostadas bajan el pH del macerado. Añadir 2-4 gramos de Bicarbonato de Sodio al agua ayudará a amortiguar la acidez, resultando en un perfil tostado más suave y redondo."
    },
    {
        id: "scottish-export",
        name: "Scottish Export",
        family: "Ales Clásicas Americanas y Británicas",
        description: "El caramelo escocés en una cerveza. Una celebración de la malta en su máxima expresión, con un profundo sabor a caramelo y un amargor muy bajo.",
        parameters: { ibu: "15–30", abv: "3.9–6.0%", srm: "13–22" },
        recipe: {
            malts: ["4.5 kg de Malta Golden Promise (o Maris Otter)", "700 g de Malta Crystal 80L", "80 g de Cebada Tostada"],
            hops: ["20 g de East Kent Goldings (en un hervor de 90 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale S-04",
        },
        brewing: {
            mashingTemp: "67-68°C",
            fermentationTemp: "15-18°C",
            boilTime: "90 min",
        },
        notes: "El factor más crucial es la temperatura de fermentación. Fermentar en el rango de 15-18°C es clave para un perfil de levadura muy limpio que permita que la complejidad de las maltas brille."
    },
    // --- Parte 2: El Poder del Lúpulo ---
    {
        id: "west-coast-ipa",
        name: "West Coast IPA",
        family: "El Poder del Lúpulo",
        description: "Amargor resinoso y final seco. Una cerveza audaz que presenta un perfil lupulado asertivo con notas a pino y pomelo.",
        parameters: { ibu: "40–70", abv: "5.5–7.5%", srm: "6–14" },
        recipe: {
            malts: ["5.5 kg de Malta Pale Ale", "250 g de Malta Carapils"],
            hops: ["25 g Warrior (60 min)", "30 g Simcoe + 30 g Centennial (10 min)", "30 g Simcoe + 30 g Centennial (whirlpool)", "50 g Centennial (dry hop 4 días)"],
            yeast: "2 sobres (23 g) de levadura seca Safale US-05",
        },
        brewing: {
            mashingTemp: "65°C",
            fermentationTemp: "19°C",
            boilTime: "60 min",
        },
        notes: "Busca una relación Sulfato/Cloruro de 3:1. Añade 5g de Gypsum (Sulfato de Calcio) y 1g de Sal de Epsom (Sulfato de Magnesio) al agua para un amargor nítido y un final seco."
    },
    {
        id: "neipa",
        name: "New England IPA (NEIPA)",
        family: "El Poder del Lúpulo",
        description: "La explosión jugosa. Prioriza el aroma y sabor a frutas tropicales sobre el amargor, con una apariencia turbia y un cuerpo sedoso.",
        parameters: { ibu: "25–60", abv: "6.0–7.5%", srm: "3–7" },
        recipe: {
            malts: ["4.5 kg de Malta Pale Ale"],
            hops: ["80 g Citra + 80 g Mosaic (whirlpool)", "50 g Citra + 50 g Mosaic (dry hop 1)", "50 g Citra + 50 g Mosaic (dry hop 2)"],
            yeast: "2 sobres (23 g) de levadura seca Lallemand Verdant IPA",
            other: ["1.0 kg de Avena Arrollada", "500 g de Trigo Malteado"]
        },
        brewing: {
            mashingTemp: "68°C",
            fermentationTemp: "20°C",
            boilTime: "60 min",
        },
        notes: "La NEIPA es extremadamente sensible a la oxidación. Minimiza el contacto con el oxígeno en cada paso post-fermentación. Realiza los dry hops rápidamente y trasvasa con extremo cuidado."
    },
    {
        id: "belgian-ipa",
        name: "Belgian IPA",
        family: "El Poder del Lúpulo",
        description: "El encuentro de dos mundos. Fusiona la intensidad aromática de los lúpulos americanos con el complejo carácter frutal y especiado de las levaduras belgas.",
        parameters: { ibu: "50–80", abv: "6.2–8.5%", srm: "5–15" },
        recipe: {
            malts: ["5.0 kg de Malta Pilsen"],
            hops: ["20 g Magnum (60 min)", "40 g Citra (5 min)", "40 g Amarillo (0 min / whirlpool)"],
            yeast: "1 sobre (11.5 g) de levadura seca Fermentis Safbrew T-58",
            other: ["500 g de Azúcar de Maíz (dextrosa)"]
        },
        brewing: {
            mashingTemp: "65°C",
            fermentationTemp: "Empezar a 18-19°C, luego subir a 22-24°C",
            boilTime: "60 min",
        },
        notes: "Maneja la temperatura de fermentación: empieza frío (18-19°C) y, después de 2-3 días, permite que la temperatura aumente (22-24°C) para estimular la producción de ésteres y fenoles complejos."
    },
    // --- Parte 3: El Alma Oscura ---
    {
        id: "american-porter",
        name: "American Porter",
        family: "El Alma Oscura",
        description: "Robusta y balanceada. Un estilo histórico reinterpretado con más lúpulo y un satisfactorio balance entre maltas oscuras y amargor.",
        parameters: { ibu: "25–50", abv: "4.8–6.5%", srm: "22–40" },
        recipe: {
            malts: ["4.5 kg de Malta Pale Ale", "500 g de Malta Munich", "400 g de Malta Crystal 80L", "300 g de Malta Chocolate", "100 g de Malta Negra (Black Patent)"],
            hops: ["30 g Northern Brewer (60 min)", "20 g Cascade (10 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale US-05",
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "18-20°C",
            boilTime: "60 min",
        },
        notes: "Para un carácter tostado más integrado, macera la Malta Chocolate durante todo el proceso y añade la Malta Negra, más agresiva, solo en los últimos 15 minutos ('capping')."
    },
    {
        id: "oatmeal-stout",
        name: "Oatmeal Stout",
        family: "El Alma Oscura",
        description: "Sedosidad y complejidad en un vaso. Una stout lujosamente suave y cremosa, con sabores que van del café con leche al chocolate.",
        parameters: { ibu: "25–40", abv: "4.2–5.9%", srm: "22–40" },
        recipe: {
            malts: ["4.2 kg de Malta Maris Otter", "350 g de Malta Crystal 80L", "250 g de Malta Chocolate", "150 g de Cebada Tostada"],
            hops: ["40 g de East Kent Goldings (60 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale S-04",
            other: ["600 g de Avena Arrollada"]
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "19°C",
            boilTime: "60 min",
        },
        notes: "La avena puede espesar mucho el mosto. Añade 150-200g de cáscaras de arroz al macerado para ayudar al drenaje y evitar un empaste atascado."
    },
    {
        id: "dry-stout",
        name: "Dry Stout (Irish Stout)",
        family: "El Alma Oscura",
        description: "La oscuridad seca. Negra como la noche, con un carácter tostado asertivo, amargor pronunciado y un final seco y refrescante.",
        parameters: { ibu: "25–45", abv: "4.0–4.5%", srm: "25–40" },
        recipe: {
            malts: ["3.0 kg de Malta Pale Ale", "400 g de Cebada Tostada (Roasted Barley)"],
            hops: ["45 g de Target (60 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale S-04",
            other: ["500 g de Cebada en Copos (Flaked Barley)"]
        },
        brewing: {
            mashingTemp: "66-67°C",
            fermentationTemp: "18-20°C",
            boilTime: "60 min",
        },
        notes: "La Cebada en Copos es fundamental para la textura cremosa. Asegura una buena conversión macerando a 66-67°C durante al menos 60-75 minutos."
    },
    {
        id: "milk-stout",
        name: "Milk Stout (Sweet Stout)",
        family: "El Alma Oscura",
        description: "El postre líquido. Una stout rica, dulce y reconfortante, con una dulzura y cuerpo pronunciados gracias al uso de lactosa.",
        parameters: { ibu: "20–40", abv: "4.0–6.0%", srm: "30–40" },
        recipe: {
            malts: ["4.0 kg de Malta Pale Ale", "500 g de Malta Crystal 60L", "300 g de Malta Chocolate", "150 g de Cebada Tostada"],
            hops: ["35 g de Fuggles (60 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale S-04",
            other: ["500 g de Lactosa (azúcar de leche)"]
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "18-20°C",
            boilTime: "60 min",
        },
        notes: "La lactosa no es fermentable y aumentará la densidad final (FG). No te alarmes por una lectura alta (ej. 1.020). Esto es normal y es lo que aporta el dulzor característico."
    },
    // --- Parte 4: El Trigo y las Especias ---
    {
        id: "weissbier",
        name: "Weissbier (Hefeweizen)",
        family: "El Trigo y las Especias",
        description: "La icónica cerveza de trigo de Bavaria. Un perfil único a banana y clavo de olor, producto exclusivo de una levadura muy especial.",
        parameters: { ibu: "8–15", abv: "4.3–5.6%", srm: "2–6" },
        recipe: {
            malts: ["2.5 kg de Malta de Trigo", "2.2 kg de Malta Pilsen"],
            hops: ["15 g de Hallertau Mittelfrüh (60 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Lallemand Munich Classic",
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "18-22°C",
            boilTime: "60 min",
        },
        notes: "La temperatura de fermentación controla el sabor: fermenta a 18°C para más clavo de olor, o a 22°C para un perfil más dominante de banana. ¡Tú eliges!"
    },
    {
        id: "witbier",
        name: "Witbier",
        family: "El Trigo y las Especias",
        description: "La Blanca de Bélgica. Refrescante y elegante cerveza de trigo, condimentada con semillas de coriandro y cáscara de naranja.",
        parameters: { ibu: "8–20", abv: "4.5–5.5%", srm: "2–4" },
        recipe: {
            malts: ["2.3 kg de Malta Pilsen"],
            hops: ["20 g de Saaz (60 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Lallemand Munich Classic",
            other: ["2.3 kg de Trigo en Copos (Flaked Wheat)", "25 g semillas de coriandro (5 min)", "25 g cáscara de naranja amarga (5 min)"]
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "20-22°C",
            boilTime: "60 min",
        },
        notes: "Utiliza semillas de coriandro de buena calidad y muélelas justo antes de añadirlas al hervor para un sabor fresco y vibrante. Evita la parte blanca de la cáscara de naranja."
    },
    {
        id: "gose",
        name: "Gose",
        family: "El Trigo y las Especias",
        description: "Ácida, salina y refrescante. Un estilo histórico de cerveza de trigo, caracterizada por su acidez láctica, su carácter salino y un toque de coriandro.",
        parameters: { ibu: "5–12", abv: "4.2–4.8%", srm: "3–4" },
        recipe: {
            malts: ["2.2 kg de Malta Pilsen", "2.2 kg de Malta de Trigo"],
            hops: ["10 g de Hallertau Mittelfrüh (en hervor post-acidificación)"],
            yeast: "1 sobre (11.5 g) de levadura seca Safale US-05",
            other: ["15 g de sal marina no yodada (final hervor)", "15 g de semillas de coriandro (final hervor)", "Cultivo de Lactobacillus"]
        },
        brewing: {
            mashingTemp: "65°C",
            fermentationTemp: "Acidificación 35-45°C, luego Ale 18-20°C",
            boilTime: "15 min",
        },
        notes: "Usa la técnica de 'kettle souring': macera, enfría a 40°C, inocula Lactobacillus por 24-48h, hierve para matar la bacteria y luego fermenta con levadura Ale normalmente."
    },
    // --- Parte 5: La Magia Belga ---
    {
        id: "saison",
        name: "Saison",
        family: "La Magia Belga",
        description: "La cerveza de granja. Refrescante, seca y compleja, con un carácter frutal y especiado (pimienta) producto de una levadura que prospera a altas temperaturas.",
        parameters: { ibu: "20–35", abv: "5.0–7.0%", srm: "5–14" },
        recipe: {
            malts: ["4.5 kg de Malta Pilsen", "500 g de Malta de Trigo", "250 g de Malta Munich"],
            hops: ["30 g de Styrian Goldings (60 min)", "20 g de Saaz (10 min)"],
            yeast: "1 sobre (11 g) de levadura seca Lallemand Belle Saison",
        },
        brewing: {
            mashingTemp: "64°C",
            fermentationTemp: "Empezar a 20°C, luego subir a 26-28°C",
            boilTime: "60 min",
        },
        notes: "No temas al calor. Comienza la fermentación a 20°C y luego deja que suba (o súbela activamente) hasta 26-28°C para asegurar un final muy seco y el carácter especiado clásico."
    },
    {
        id: "belgian-dubbel",
        name: "Belgian Dubbel",
        family: "La Magia Belga",
        description: "Fruta oscura y caramelo. Una ale trapense de color rojizo profundo, compleja, con notas a pasas, higos y un final engañosamente seco.",
        parameters: { ibu: "15–25", abv: "6.0–7.6%", srm: "10–17" },
        recipe: {
            malts: ["5.0 kg de Malta Pilsen", "250 g de Malta Aromatic", "200 g de Malta Special B"],
            hops: ["25 g de Styrian Goldings (60 min)"],
            yeast: "1 sobre (11.5 g) de levadura seca Lallemand Abbaye",
            other: ["500 g de Sirope de Candi Oscuro (D-90)"]
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "18-24°C",
            boilTime: "60 min",
        },
        notes: "El Sirope de Candi Oscuro es clave. Aporta alcohol, sequedad y sabores complejos a caramelo y pasas que son imposibles de lograr solo con malta."
    },
    {
        id: "belgian-tripel",
        name: "Belgian Tripel",
        family: "La Magia Belga",
        description: "El demonio dorado. Fuerte y compleja, con una interacción armoniosa de sabores frutales, especiados, y un final peligrosamente bebible.",
        parameters: { ibu: "20–40", abv: "7.5–9.5%", srm: "4.5–7" },
        recipe: {
            malts: ["6.0 kg de Malta Pilsen"],
            hops: ["40 g de Styrian Goldings (60 min)", "20 g de Saaz (15 min)"],
            yeast: "2 sobres (23 g) de levadura seca Lallemand Abbaye",
            other: ["1.0 kg de Azúcar de Maíz (dextrosa)"]
        },
        brewing: {
            mashingTemp: "64°C",
            fermentationTemp: "18-24°C",
            boilTime: "60 min",
        },
        notes: "Para una cerveza de tan alta densidad, la salud de la levadura es crucial. Usa dos sobres de levadura y oxigena bien el mosto antes de inocular para una fermentación limpia y completa."
    },
    // --- Lagers Europeas ---
    {
        id: "marzen",
        name: "Märzen / Oktoberfest",
        family: "Lagers Europeas",
        description: "La celebración de la malta. Una lager alemana elegante y maltosa que exhibe la riqueza de las maltas alemanas con una limpieza excepcional.",
        parameters: { ibu: "18–24", abv: "5.6–6.3%", srm: "8–17" },
        recipe: {
            malts: ["3.0 kg de Malta Munich", "2.0 kg de Malta Viena", "1.0 kg de Malta Pilsen"],
            hops: ["30 g de Hallertau Mittelfrüh (60 min)"],
            yeast: "2 sobres (23 g) de levadura seca Saflager W-34/70",
        },
        brewing: {
            mashingTemp: "Maceración escalonada",
            fermentationTemp: "9-12°C, con Descanso de Diacetilo",
            boilTime: "60 min",
        },
        notes: "La paciencia es el ingrediente secreto. Después de la fermentación, se requiere una maduración en frío (lagering) a 0-2°C durante 4 a 8 semanas para una cerveza suave, clara y refinada."
    },
    {
        id: "bock",
        name: "Bock (Tradicional)",
        family: "Lagers Europeas",
        description: "La fortaleza de la malta. Una lager alemana oscura, fuerte y maltosa que celebra la riqueza de las maltas de Múnich con un cuerpo pleno y un carácter suave.",
        parameters: { ibu: "20–27", abv: "6.3–7.2%", srm: "14–22" },
        recipe: {
            malts: ["5.0 kg de Malta Munich", "1.5 kg de Malta Viena", "100 g de Malta Carafa Special II"],
            hops: ["25 g de Magnum (60 min)"],
            yeast: "2 sobres (23 g) de levadura seca Saflager W-34/70",
        },
        brewing: {
            mashingTemp: "67°C",
            fermentationTemp: "9-12°C, con Descanso de Diacetilo y lagering",
            boilTime: "60 min",
        },
        notes: "La paciencia es doblemente importante aquí. Un período de lagering (maduración en frío) de al menos 6-8 semanas a 0°C es clave para que los sabores se suavicen e integren."
    },
];


export const generatePlanForBeer = (beer: BeerStyle): PhaseData[] => {
    // Base plan structure
    let phases: PhaseData[] = [
        {
            id: 1,
            title: "Fase 1: Equipamiento y Preparación",
            tasks: [
                { id: "1-1", text: "Revisar utensilios de cocina disponibles (Olla >25L, termómetro, etc.).", ...TAGS.CHEFUEAR, completed: false },
                { id: "1-2", text: "Comprar equipamiento especializado (Fermentador, airlock, bolsa BIAB, densímetro).", ...TAGS.COMPRAR, completed: false },
                { id: "1-3", text: "Investigar y seleccionar un proveedor de insumos.", ...TAGS.INVESTIGAR, completed: false },
                { id: "1-4", text: "Preparar y configurar una heladera con termostato (STC-1000) para control de temperatura.", ...TAGS.PREPARAR, completed: false },
            ],
        },
        {
            id: 2,
            title: "Fase 2: Compra de Insumos",
            tasks: [
                ...beer.recipe.malts.map((malt, i): Task => ({
                    id: `2-m-${i}`, text: `Malta: ${malt}`, ...TAGS.COMPRAR, completed: false
                })),
                ...(beer.recipe.other || []).map((other, i): Task => ({
                    id: `2-o-${i}`, text: `${other}`, ...TAGS.COMPRAR, completed: false
                })),
                ...beer.recipe.hops.map((hop, i): Task => ({
                    id: `2-h-${i}`, text: `Lúpulo: ${hop}`, ...TAGS.COMPRAR, completed: false
                })),
                { id: "2-y-1", text: `Levadura: ${beer.recipe.yeast}`, ...TAGS.COMPRAR, completed: false },
            ],
        },
        {
            id: 3,
            title: "Fase 3: El Día de la Cocción",
            tasks: [
                { id: "3-0", text: "Limpiar y sanitizar rigurosamente TODO el equipamiento.", ...TAGS.EJECUTAR, completed: false },
                { id: "3-1", text: "Calentar el agua y realizar la maceración a la temperatura indicada (~60-75 min).", ...TAGS.EJECUTAR, completed: false },
                { id: "3-2", text: `Temperatura de maceración objetivo: ${beer.brewing.mashingTemp}.`, ...TAGS.DEFINIR, completed: false },
                { id: "3-3", text: `Hervir el mosto por ${beer.brewing.boilTime}. Añadir lúpulos según receta.`, ...TAGS.EJECUTAR, completed: false },
                { id: "3-4", text: "Enfriar el mosto a la temperatura de inoculación lo más rápido posible.", ...TAGS.EJECUTAR, completed: false },
            ],
        },
        {
            id: 4,
            title: "Fase 4: Fermentación",
            tasks: [
                { id: "4-1", text: "Trasvasar, oxigenar e inocular la levadura en el fermentador sanitizado.", ...TAGS.EJECUTAR, completed: false },
                { id: "4-2", text: `Colocar fermentador en la heladera y controlar a la temperatura indicada.`, ...TAGS.PREPARAR, completed: false },
                { id: "4-3", text: `Temperatura de fermentación objetivo: ${beer.brewing.fermentationTemp}.`, ...TAGS.DEFINIR, completed: false },
                { id: "4-4", text: "Esperar de 7 a 14 días para que termine la fermentación primaria.", ...TAGS.ESPERAR, completed: false },
            ],
        },
        {
            id: 5,
            title: "Fase 5: Embotellado y Acondicionamiento",
            tasks: [
                { id: "5-1", text: "Confirmar fin de fermentación con densímetro (lectura estable 3 días).", ...TAGS.CHEFUEAR, completed: false },
                { id: "5-2", text: "Preparar almíbar para carbonatación (usar calculadora cervecera) y mezclar.", ...TAGS.EJECUTAR, completed: false },
                { id: "5-3", text: "Llenar y tapar las botellas previamente sanitizadas.", ...TAGS.EJECUTAR, completed: false },
                { id: "5-4", text: "Acondicionar en botella 2-3 semanas en lugar oscuro a 18-22°C.", ...TAGS.ESPERAR, completed: false },
            ],
        },
        {
            id: 6,
            title: "Fase 6: Degustación y Aprendizaje",
            tasks: [
                { id: "6-1", text: "Refrigerar las botellas en vertical por al menos 24 horas.", ...TAGS.PREPARAR, completed: false },
                { id: "6-2", text: "Servir con cuidado, ¡celebrar y disfrutar del primer sorbo!", ...TAGS.DISFRUTAR, completed: false },
                { id: "6-3", text: "Tomar notas detalladas de la cocción para la próxima vez.", ...TAGS.INVESTIGAR, completed: false },
            ],
        },
    ];

    // Find specific phases to modify
    const coccionPhase = phases.find(p => p.id === 3)!;
    const fermentacionPhase = phases.find(p => p.id === 4)!;
    const embotelladoPhase = phases.find(p => p.id === 5)!;

    // --- Style-Specific Modifications ---

    // Water adjustments
    if (beer.id === 'apa') {
        coccionPhase.tasks.unshift({ id: "3-p-1", text: "Ajuste de agua: Añadir 3-4g de Sulfato de Calcio (Gypsum) al macerado.", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'west-coast-ipa') {
        coccionPhase.tasks.unshift({ id: "3-p-1", text: "Ajuste de agua: Añadir ~5g Gypsum y ~1g Sal de Epsom para un perfil seco.", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'neipa') {
        coccionPhase.tasks.unshift({ id: "3-p-1", text: "Ajuste de agua: Añadir ~5g Cloruro de Calcio y ~1g Gypsum para un perfil 'jugoso'.", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'american-brown-ale') {
        coccionPhase.tasks.unshift({ id: "3-p-1", text: "Ajuste de agua: Añadir 2-4g de Bicarbonato de Sodio al macerado para ajustar pH.", ...TAGS.EJECUTAR, completed: false });
    }

    // Mashing / Boil additions
    if (beer.id === 'irish-red') {
        coccionPhase.tasks.splice(2, 0, { id: "3-p-1", text: "Añadir la Cebada Tostada solo durante los últimos 10-15 min del macerado.", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'american-porter') {
        coccionPhase.tasks.splice(2, 0, { id: "3-p-1", text: "Añadir Malta Negra solo en los últimos 15 min del macerado ('capping').", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'oatmeal-stout') {
        coccionPhase.tasks.splice(2, 0, { id: "3-p-1", text: "Añadir 150-200g de cáscaras de arroz al macerado para facilitar el drenaje.", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'milk-stout') {
        coccionPhase.tasks.push({ id: "3-p-1", text: "Añadir 500g de Lactosa en los últimos 10-15 min del hervor.", ...TAGS.EJECUTAR, completed: false });
        embotelladoPhase.tasks[0].text = "Confirmar fin de fermentación (FG será alta, ~1.020, es normal).";
    }
    if (beer.id === 'witbier') {
        coccionPhase.tasks.push({ id: "3-p-1", text: "Añadir coriandro y cáscara de naranja en los últimos 5 min del hervor.", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'belgian-dubbel' || beer.id === 'belgian-tripel') {
        const sugarText = beer.id === 'belgian-dubbel' ? 'el Sirope de Candi Oscuro' : 'el Azúcar de Maíz';
        coccionPhase.tasks.push({ id: "3-p-1", text: `Añadir ${sugarText} durante el hervor.`, ...TAGS.EJECUTAR, completed: false });
    }

    // Fermentation / Dry Hopping
    if (beer.id === 'west-coast-ipa') {
        fermentacionPhase.tasks.push({ id: "4-p-1", text: "Realizar dry hop con 50g Centennial durante 4 días.", ...TAGS.EJECUTAR, completed: false });
    }
    if (beer.id === 'neipa') {
        fermentacionPhase.tasks.push(
            { id: "4-p-1", text: "Dry hop 1 (en fermentación activa): 50g Citra + 50g Mosaic.", ...TAGS.EJECUTAR, completed: false },
            { id: "4-p-2", text: "Dry hop 2 (5 días antes de envasar): 50g Citra + 50g Mosaic.", ...TAGS.EJECUTAR, completed: false }
        );
        embotelladoPhase.tasks.unshift({ id: "5-p-1", text: "¡CRÍTICO! Minimizar la exposición al oxígeno durante el trasvase y embotellado.", ...TAGS.CHEFUEAR, completed: false });
    }
    if (beer.id === 'belgian-tripel') {
        fermentacionPhase.tasks[0].text = "Trasvasar, oxigenar MUY BIEN e inocular 2 sobres de levadura.";
    }

    // Major process changes: Gose and Lagers
    if (beer.id === 'gose') {
        phases = [
            phases[0], // Fase 1
            phases[1], // Fase 2
            {
                id: 3,
                title: "Fase 3: Maceración y Acidificación (Kettle Sour)",
                tasks: [
                    { id: "3-g-1", text: "Limpiar y sanitizar equipamiento. Macerar normalmente.", ...TAGS.EJECUTAR, completed: false },
                    { id: "3-g-2", text: "Llevar a hervor por 10-15 min para pasteurizar el mosto.", ...TAGS.EJECUTAR, completed: false },
                    { id: "3-g-3", text: "Enfriar el mosto a 35-45°C e inocular con Lactobacillus.", ...TAGS.EJECUTAR, completed: false },
                    { id: "3-g-4", text: "Mantener temperatura por 24-48h hasta alcanzar acidez deseada.", ...TAGS.ESPERAR, completed: false },
                ],
            },
            {
                id: 4,
                title: "Fase 4: Hervor y Fermentación Ale",
                tasks: [
                    { id: "4-g-1", text: "Hervir el mosto acidificado para detener la acción del Lactobacillus.", ...TAGS.EJECUTAR, completed: false },
                    { id: "4-g-2", text: "Añadir lúpulos, sal y coriandro durante el hervor de 15 min.", ...TAGS.EJECUTAR, completed: false },
                    { id: "4-g-3", text: "Enfriar el mosto a temperatura Ale (18-20°C).", ...TAGS.EJECUTAR, completed: false },
                    { id: "4-g-4", text: "Trasvasar, oxigenar e inocular levadura Safale US-05.", ...TAGS.EJECUTAR, completed: false },
                    { id: "4-g-5", text: "Fermentar por 7-14 días como una Ale normal.", ...TAGS.ESPERAR, completed: false },
                ],
            },
            phases[4], // Fase 5
            phases[5], // Fase 6
        ];
    }

    if (beer.id === 'marzen' || beer.id === 'bock') {
        const lageringWeeks = beer.id === 'marzen' ? '4 a 8 semanas' : '6 a 8 semanas';
        const lageringPhase: PhaseData = {
            id: 5,
            title: "Fase 5: Maduración en Frío (Lagering)",
            tasks: [
                { id: "5-l-1", text: "Al finalizar fermentación (y descanso diacetilo), bajar temperatura a 0-2°C.", ...TAGS.EJECUTAR, completed: false },
                { id: "5-l-2", text: `Madurar en frío por ${lageringWeeks} para suavizar y clarificar.`, ...TAGS.ESPERAR, completed: false },
            ],
        };
        
        const embotelladoOriginal = phases.find(p => p.id === 5)!;
        const degustacionOriginal = phases.find(p => p.id === 6)!;

        const newEmbotellado = { ...embotelladoOriginal, id: 6, title: "Fase 6: Embotellado y Acondicionamiento" };
        const newDegustacion = { ...degustacionOriginal, id: 7, title: "Fase 7: Degustación y Aprendizaje" };
        
        phases = [
            phases[0],
            phases[1],
            phases[2],
            phases[3],
            lageringPhase,
            newEmbotellado,
            newDegustacion,
        ];
    }
    
    return phases;
};
