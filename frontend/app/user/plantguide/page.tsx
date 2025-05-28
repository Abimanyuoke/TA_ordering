"use client";

import { useEffect, useState } from "react";

type Plant = {
    id: string | number;
    attributes: {
        name: string;
        main_image_path?: string;
        description?: string;
        scientific_name?: string;
        family?: string;
        growing_season?: string;
        care_tips?: string[];
        nutritional_info?: string;
    };
};

export default function PlantGuide() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

    useEffect(() => {
        const dummyPlants: Plant[] = [
            {
                id: 1,
                attributes: {
                    name: "Tomato",
                    scientific_name: "Solanum lycopersicum",
                    family: "Solanaceae",
                    growing_season: "Summer",
                    description: "Tomatoes are juicy, sweet, and slightly tangy fruits that are typically red when ripe. They're technically berries but commonly used as vegetables in cooking.",
                    care_tips: [
                        "Require 6-8 hours of sunlight daily",
                        "Keep soil consistently moist but not waterlogged",
                        "Use stakes or cages to support vines",
                        "Fertilize every 2-3 weeks with balanced fertilizer"
                    ],
                    nutritional_info: "Rich in lycopene, vitamin C, potassium, folate, and vitamin K. Known for antioxidant properties."
                }
            },
            {
                id: 2,
                attributes: {
                    name: "Carrot",
                    scientific_name: "Daucus carota",
                    family: "Apiaceae",
                    growing_season: "Cool seasons (spring/fall)",
                    description: "Carrots are crunchy root vegetables known for their bright orange color, though they come in purple, white, yellow, and red varieties.",
                    care_tips: [
                        "Plant in loose, sandy soil for straight roots",
                        "Thin seedlings to 2 inches apart",
                        "Keep soil moist for even growth",
                        "Mulch to keep soil cool and retain moisture"
                    ],
                    nutritional_info: "Excellent source of beta-carotene (vitamin A), fiber, vitamin K1, potassium, and antioxidants."
                }
            },
            {
                id: 3,
                attributes: {
                    name: "Spinach",
                    scientific_name: "Spinacia oleracea",
                    family: "Amaranthaceae",
                    growing_season: "Cool seasons (spring/fall)",
                    description: "Spinach is a leafy green vegetable with tender, dark green leaves that can be eaten raw or cooked. It grows quickly and is packed with nutrients.",
                    care_tips: [
                        "Prefers cooler temperatures (15-20°C)",
                        "Keep soil consistently moist",
                        "Harvest outer leaves to encourage new growth",
                        "Use shade cloth in warmer months"
                    ],
                    nutritional_info: "High in iron, calcium, magnesium, vitamins A, C, K, and folate. Contains antioxidants like lutein and zeaxanthin."
                }
            },
            {
                id: 4,
                attributes: {
                    name: "Lettuce",
                    scientific_name: "Lactuca sativa",
                    family: "Asteraceae",
                    growing_season: "Cool seasons (spring/fall)",
                    description: "Lettuce is a crisp leafy vegetable commonly used in salads. It comes in many varieties from crisphead (iceberg) to loose-leaf, romaine, and butterhead types.",
                    care_tips: [
                        "Prefers cooler temperatures (7-20°C)",
                        "Needs consistent moisture",
                        "Plant in partial shade in warmer climates",
                        "Harvest in morning for crispest leaves"
                    ],
                    nutritional_info: "Good source of vitamin K, vitamin A (as beta-carotene), and folate. Contains small amounts of many other nutrients."
                }
            },
            {
                id: 5,
                attributes: {
                    name: "Broccoli",
                    scientific_name: "Brassica oleracea var. italica",
                    family: "Brassicaceae",
                    growing_season: "Cool seasons (spring/fall)",
                    description: "Broccoli is a green vegetable with a large flowering head, stalk, and small leaves. The florets are harvested before the flowers bloom.",
                    care_tips: [
                        "Needs full sun (6-8 hours)",
                        "Keep soil consistently moist",
                        "Use balanced fertilizer at planting",
                        "Harvest when florets are tight and dark green"
                    ],
                    nutritional_info: "Packed with vitamins C, K, and A, folate, potassium, and fiber. Contains sulforaphane, a compound with potential anti-cancer properties."
                }
            },
            {
                id: 6,
                attributes: {
                    name: "Pepper",
                    scientific_name: "Capsicum annuum",
                    family: "Solanaceae",
                    growing_season: "Summer",
                    description: "Peppers come in sweet and hot varieties, ranging from bell peppers to chili peppers. Colors include green, red, yellow, orange, and purple.",
                    care_tips: [
                        "Need warm temperatures (20-30°C)",
                        "Provide support for heavy fruit",
                        "Water deeply but allow soil to dry slightly between",
                        "Harvest when fruits reach desired size/color"
                    ],
                    nutritional_info: "Excellent source of vitamin C (especially red peppers), vitamin A, vitamin B6, and folate. Hot peppers contain capsaicin with various health benefits."
                }
            },
            {
                id: 7,
                attributes: {
                    name: "Cucumber",
                    scientific_name: "Cucumis sativus",
                    family: "Cucurbitaceae",
                    growing_season: "Summer",
                    description: "Cucumbers are refreshing, mild-flavored fruits with high water content. They grow on vines and come in slicing and pickling varieties.",
                    care_tips: [
                        "Need full sun and warm temperatures",
                        "Provide trellis for vertical growth",
                        "Keep soil consistently moist",
                        "Harvest regularly to encourage more fruit"
                    ],
                    nutritional_info: "High water content (about 96%). Contains small amounts of vitamin K, potassium, and antioxidants like beta-carotene and flavonoids."
                }
            },
            {
                id: 8,
                attributes: {
                    name: "Pumpkin",
                    scientific_name: "Cucurbita pepo",
                    family: "Cucurbitaceae",
                    growing_season: "Summer to Fall",
                    description: "Pumpkins are large, round, orange winter squash with ribbed skin. They're grown for both culinary uses and decorative purposes (especially at Halloween).",
                    care_tips: [
                        "Need full sun and plenty of space",
                        "Water deeply once a week",
                        "Use mulch to retain moisture",
                        "Harvest when rind is hard and color is deep"
                    ],
                    nutritional_info: "Rich in beta-carotene (converted to vitamin A), vitamin C, potassium, and fiber. Seeds are high in magnesium, zinc, and healthy fats."
                }
            },
            {
                id: 9,
                attributes: {
                    name: "Onion",
                    scientific_name: "Allium cepa",
                    family: "Amaryllidaceae",
                    growing_season: "Cool seasons (spring/fall)",
                    description: "Onions are bulb vegetables with layers of papery skin and a pungent flavor when raw that sweetens when cooked. They come in yellow, red, and white varieties.",
                    care_tips: [
                        "Plant in well-drained soil",
                        "Keep weed-free for best bulb development",
                        "Reduce watering as harvest approaches",
                        "Harvest when tops yellow and fall over"
                    ],
                    nutritional_info: "Contains vitamin C, B vitamins, and potassium. Rich in antioxidants and sulfur-containing compounds that may have various health benefits."
                }
            },
        ];
        setPlants(dummyPlants);
    }, []);

    const filteredPlants = plants.filter((plant) =>
        plant.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold text-green-600 mb-6">Plant Guide</h1>
            <input
                type="text"
                placeholder="🔍 Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md mb-8 px-4 py-3 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 text-lg"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
                    <div
                        key={plant.id}
                        onClick={() => setSelectedPlant(plant)}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border border-green-100 dark:border-gray-700"
                    >
                        <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">{plant.attributes.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2 italic">{plant.attributes.scientific_name}</p>
                        <p className="text-gray-700 dark:text-gray-200 line-clamp-2">{plant.attributes.description}</p>
                        <div className="mt-3 text-sm text-green-600 dark:text-green-300">
                            {plant.attributes.growing_season} • {plant.attributes.family}
                        </div>
                    </div>
                ))}
            </div>

            {/* Plant Detail Modal */}
            {selectedPlant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
                                        {selectedPlant.attributes.name}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 italic">
                                        {selectedPlant.attributes.scientific_name}
                                    </p>
                                    <div className="flex gap-2 mt-1">
                                        <span className="bg-green-100 dark:bg-gray-700 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">
                                            {selectedPlant.attributes.family}
                                        </span>
                                        <span className="bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                                            {selectedPlant.attributes.growing_season}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedPlant(null)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                                    <span className="text-gray-400">Plant Image</span>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-400">Description</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        {selectedPlant.attributes.description}
                                    </p>

                                    <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-400">Nutritional Information</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        {selectedPlant.attributes.nutritional_info}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-400">Care Tips</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {selectedPlant.attributes.care_tips?.map((tip, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}