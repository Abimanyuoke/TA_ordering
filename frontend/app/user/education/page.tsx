"use client"

import React, { useState, useEffect } from "react";

export default function Education() {
    interface Video {
        id: number;
        title: string;
        channel: string;
        views: string;
        timestamp: string;
        thumbnail: string;
    }

    const [videos, setVideos] = useState<Video[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const videoData: Video[] = [
            {
                id: 1,
                title: 'Never Gonna Give You Up',
                channel: 'Rick Astley',
                views: '1.2B views',
                timestamp: '3 years ago',
                thumbnail: 'https://www.youtube.com/embed/eXti7Z5S4TQ'
            },
            {
                id: 2,
                title: 'Learn React in 30 Minutes',
                channel: 'Code Masters',
                views: '500K views',
                timestamp: '2 months ago',
                thumbnail: 'https://www.youtube.com/embed/NaQfp48stwc'
            },
            {
                id: 3,
                title: 'CSS Grid Complete Guide',
                channel: 'Web Dev Simplified',
                views: '300K views',
                timestamp: '5 months ago',
                thumbnail: 'https://www.youtube.com/embed/hLxmGAFebxM'
            },
            {
                id: 4,
                title: 'JavaScript Advanced Concepts',
                channel: 'Tech Tutorials',
                views: '800K views',
                timestamp: '1 year ago',
                thumbnail: 'https://www.youtube.com/embed/EH84EAq4IaA'
            },
            {
                id: 5,
                title: 'TypeScript Crash Course',
                channel: 'Programming Hub',
                views: '250K views',
                timestamp: '3 months ago',
                thumbnail: 'https://www.youtube.com/embed/X9gktB2gMEE'
            },
            {
                id: 6,
                title: 'Node.js for Beginners',
                channel: 'Backend Masters',
                views: '150K views',
                timestamp: '6 months ago',
                thumbnail: 'https://www.youtube.com/embed/E6cWrYKmdfw'
            },
            {
                id: 7,
                title: 'Python Data Science',
                channel: 'Data Science Dojo',
                views: '700K views',
                timestamp: '8 months ago',
                thumbnail: 'https://www.youtube.com/embed/AXch3-Xm2LE'
            },
        ];
        setVideos(videoData);
    }, []);

    const filteredVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex flex-col my-10 px-10">
                <h4 className="text-xl font-bold text-slate-900">Video Tutorials</h4>
                <p className="mb-2">Silakan pilih video yang ingin anda ketahui</p>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-sm w-full max-w-md rounded-md p-2 bg-slate-50 border focus:border-[#2E8B57] focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
                {filteredVideos.map((video) => (
                    <div key={video.id} className="flex-shrink-0">
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full rounded-lg shadow-lg"
                                src={video.thumbnail}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="mt-2">
                            <h3 className="font-medium text-gray-900">{video.title}</h3>
                            <p className="text-sm text-gray-600">{video.channel}</p>
                            <div className="flex text-xs text-gray-500">
                                <span>{video.views}</span>
                                <span className="mx-1">•</span>
                                <span>{video.timestamp}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}