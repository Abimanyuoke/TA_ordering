"use client";

import { useEffect, useState } from "react";
import img1 from '@/public/image/Articles/1.jpg'
import img2 from '@/public/image/Articles/2.jpg'
import img3 from '@/public/image/Articles/3.jpeg'
import img4 from '@/public/image/Articles/4.webp'
import img5 from '@/public/image/Articles/5.jpg'
import img6 from '@/public/image/Articles/6.avif'

type NewsArticle = {
    id: string | number;
    title: string;
    source: string;
    date: string;
    description: string;
    image?: any;
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
                image: img1,
                content: "A comprehensive study across 50 offices showed employees with plants reported 15% lower stress levels. The presence of greenery was linked to increased productivity and overall job satisfaction. Experts recommend at least one medium-sized plant per 100 square feet of workspace.",
                url: "https://stories.tamu.edu/news/2024/02/06/livening-up-your-space-with-plants-can-boost-your-mental-health/?utm_source=chatgpt.com"
            },
            {
                id: 2,
                title: "Rare Tropical Plant Discovered in Amazon Rainforest",
                source: "Global Botany News",
                date: "May 10, 2023",
                description: "Scientists identify new species with potential medicinal properties.",
                image: img2,
                content: "The newly discovered Philodendron amazonicus shows promise in early trials for anti-inflammatory properties. Indigenous tribes have used the plant for generations to treat wounds and fevers. Researchers are now studying its potential for modern pharmaceuticals.",
                url: "https://www.fieldmuseum.org/about/press/mystery-plant-amazon-declared-new-species-after-nearly-50-years-flummoxing-scientists?utm_source=chatgpt.com"
            },
            {
                id: 3,
                title: "Urban Farming Initiative Transforms City Rooftops",
                source: "Sustainable Cities",
                date: "April 28, 2023",
                description: "Major cities converting unused spaces into productive gardens.",
                image: img3, 
                content: "The program has created 12 acres of new growing space downtown, producing 15,000 pounds of fresh produce annually. Participants report improved community bonds and access to fresh food. The initiative aims to expand to 50 acres by 2025.",
                url: "https://igrownews.com/the-challenges-and-benefits-of-urban-farming/?utm_source=chatgpt.com"
            },
            {
                id: 4,
                title: "Climate Change Affects Plant Flowering Patterns",
                source: "Environmental Science Journal",
                date: "April 20, 2023",
                description: "Researchers document shifts in flowering times across continents.",
                image: img4,
                content: "Data from 120 research stations shows spring-flowering plants are blooming 2.3 days earlier per decade. This phenological shift could disrupt pollination cycles and ecosystem relationships. The changes are most pronounced in temperate regions.",
                url: "https://www.earth.com/news/flowers-blooming-92-days-earlier-due-to-climate-change/?utm_source=chatgpt.com"
            },
            {
                id: 5,
                title: "Ancient Healing Plants in Modern Medicine",
                source: "Ethnobotany Review",
                date: "April 15, 2023",
                description: "Traditional remedies validated by scientific research.",
                image: img5,
                content: "Plants like turmeric and echinacea are being studied for pharmacological properties. Clinical trials confirm many traditional uses while discovering new applications. Researchers emphasize the importance of preserving indigenous knowledge.",
                url: "https://www.who.int/news-room/feature-stories/detail/traditional-medicine-has-a-long-history-of-contributing-to-conventional-medicine-and-continues-to-hold-promise?utm_source=chatgpt.com"
            },
            {
                id: 6,
                title: "Home Gardening Surge During Pandemic Continues",
                source: "Horticulture Weekly",
                date: "April 5, 2023",
                description: "Many pandemic gardeners have maintained their new hobby.",
                image: img6,
                content: "Surveys show 65% of people who started gardening during lockdowns have continued. Nurseries report sustained demand for vegetable seeds and starter plants. Experts attribute this to ongoing interest in food security and mental wellbeing.",
                url: "https://www.seedworld.com/us/2024/01/22/pandemic-still-impacting-home-garden-seed-market/?utm_source=chatgpt.com"
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
                                    src={article.image.src}
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
                                <div className="bg-gray-100 rounded-lg h-[350px] flex items-center justify-center overflow-hidden mb-6">
                                    <img
                                        src={selectedArticle.image.src}
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
                                    className="inline-flex items-center px-4 py-2 bg-[#2E8B57] text-white rounded-lg hover:bg-green-700 transition-colors font-semibold justify-center"
                                >
                                    Visit the website
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}