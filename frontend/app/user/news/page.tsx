"use client";

import { useEffect, useState } from "react";

type NewsArticle = {
    id: string | number;
    title: string;
    source: string;
    date: string;
    description: string;
    image?: string;
    content: string;
    url: string;
};

export default function PlantNews() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        const mockNews: NewsArticle[] = [
            {
                id: 1,
                title: "New Study Reveals Benefits of Indoor Plants for Mental Health",
                source: "Botany Today",
                date: "May 15, 2023",
                description: "Research shows significant improvements in stress levels when surrounded by greenery.",
                image: "/image/Plantnews/indoor-plants.jpg",
                content: "A comprehensive study across 50 offices showed employees with plants reported 15% lower stress levels. The presence of greenery was linked to increased productivity and overall job satisfaction. Experts recommend at least one medium-sized plant per 100 square feet of workspace.",
                url: "#"
            },
            {
                id: 2,
                title: "Rare Tropical Plant Discovered in Amazon Rainforest",
                source: "Global Botany News",
                date: "May 10, 2023",
                description: "Scientists identify new species with potential medicinal properties.",
                image: "/image/Plantnews/tropical-plant.jpg",
                content: "The newly discovered Philodendron amazonicus shows promise in early trials for anti-inflammatory properties. Indigenous tribes have used the plant for generations to treat wounds and fevers. Researchers are now studying its potential for modern pharmaceuticals.",
                url: "#"
            },
            {
                id: 3,
                title: "Urban Farming Initiative Transforms City Rooftops",
                source: "Sustainable Cities",
                date: "April 28, 2023",
                description: "Major cities converting unused spaces into productive gardens.",
                image: "/image/Plantnews/urban-farming.jpg",
                content: "The program has created 12 acres of new growing space downtown, producing 15,000 pounds of fresh produce annually. Participants report improved community bonds and access to fresh food. The initiative aims to expand to 50 acres by 2025.",
                url: "#"
            },
            {
                id: 4,
                title: "Climate Change Affects Plant Flowering Patterns",
                source: "Environmental Science Journal",
                date: "April 20, 2023",
                description: "Researchers document shifts in flowering times across continents.",
                image: "/image/Plantnews/flowering-plants.jpg",
                content: "Data from 120 research stations shows spring-flowering plants are blooming 2.3 days earlier per decade. This phenological shift could disrupt pollination cycles and ecosystem relationships. The changes are most pronounced in temperate regions.",
                url: "#"
            },
            {
                id: 5,
                title: "Ancient Healing Plants in Modern Medicine",
                source: "Ethnobotany Review",
                date: "April 15, 2023",
                description: "Traditional remedies validated by scientific research.",
                image: "/image/Plantnews/healing-plants.jpg",
                content: "Plants like turmeric and echinacea are being studied for pharmacological properties. Clinical trials confirm many traditional uses while discovering new applications. Researchers emphasize the importance of preserving indigenous knowledge.",
                url: "#"
            },
            {
                id: 6,
                title: "Home Gardening Surge During Pandemic Continues",
                source: "Horticulture Weekly",
                date: "April 5, 2023",
                description: "Many pandemic gardeners have maintained their new hobby.",
                image: "/image/Plantnews/home-garden.jpg",
                content: "Surveys show 65% of people who started gardening during lockdowns have continued. Nurseries report sustained demand for vegetable seeds and starter plants. Experts attribute this to ongoing interest in food security and mental wellbeing.",
                url: "#"
            }
        ];

        setArticles(mockNews);
    }, []);

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-white bg-opacity-90 min-h-screen">
            <div className="flex flex-col my-10 px-10">
                <h4 className="text-xl font-bold text-slate-900">Plant News</h4>
                <p className="mb-2">Silakan pilih berita tanaman yang ingin anda ketahui</p>
                <input
                    type="text"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-sm w-full max-w-md rounded-md p-2 bg-slate-50 border focus:border-[#2E8B57] focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border border-green-100"
                    >
                        {article.image && (
                            <div className="h-48 overflow-hidden rounded-lg mb-4">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <h3 className="text-xl font-bold mb-2 text-green-700">{article.title}</h3>
                        <p className="text-gray-600 mb-2">{article.source} • {article.date}</p>
                        <p className="text-gray-700 line-clamp-2">{article.description}</p>
                    </div>
                ))}
            </div>

            {/* News Detail Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 font-inter">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-green-700">
                                        {selectedArticle.title}
                                    </h2>
                                    <p className="text-black">
                                        {selectedArticle.source} • {selectedArticle.date}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {selectedArticle.image && (
                                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center overflow-hidden mb-6">
                                    <img
                                        src={selectedArticle.image}
                                        alt={selectedArticle.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="grid gap-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2 text-green-700">Summary</h3>
                                    <p className="text-gray-700 mb-4">
                                        {selectedArticle.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2 text-green-700">Full Story</h3>
                                    <p className="text-gray-700 mb-4">
                                        {selectedArticle.content}
                                    </p>
                                </div>

                                <a
                                    href={selectedArticle.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Read Full Article
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}