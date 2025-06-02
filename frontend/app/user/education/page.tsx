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
                title: '12 Cara Merawat Tanaman Hias Daun dan Bunga',
                channel: 'Tanaman Sehat',
                views: '1.2M views',
                timestamp: '2 years ago',
                thumbnail: 'https://www.youtube.com/embed/eXti7Z5S4TQ'
            },
            {
                id: 2,
                title: 'Tips Menanam dan Merawat Tanaman Ala SiapDarling',
                channel: 'Siap Darling',
                views: '980K views',
                timestamp: '5 months ago',
                thumbnail: 'https://www.youtube.com/embed/NaQfp48stwc'
            },
            {
                id: 3,
                title: 'Panduan Lengkap Menanam dan Merawat Anggrek',
                channel: 'Anggrek Lovers',
                views: '420K views',
                timestamp: '1 year ago',
                thumbnail: 'https://www.youtube.com/embed/hLxmGAFebxM'
            },
            {
                id: 4,
                title: 'Cara Menanam dan Merawat Sukulen dan Kaktus',
                channel: 'Sukulen Kita',
                views: '750K views',
                timestamp: '8 months ago',
                thumbnail: 'https://www.youtube.com/embed/EH84EAq4IaA'
            },
            {
                id: 5,
                title: 'Panduan Lengkap Menanam dan Merawat Bunga Begonia',
                channel: 'Begonia Channel',
                views: '250K views',
                timestamp: '3 months ago',
                thumbnail: 'https://www.youtube.com/embed/X9gktB2gMEE'
            },
            {
                id: 6,
                title: 'Cara Menanam dan Perawatan Tanaman Cabai untuk Pemula',
                channel: 'Petani Pemula',
                views: '150K views',
                timestamp: '6 months ago',
                thumbnail: 'https://www.youtube.com/embed/E6cWrYKmdfw'
            },
            {
                id: 7,
                title: 'Cara Menanam Bibit Tanaman Agar Tidak Mati',
                channel: 'Bibit Jaya',
                views: '700K views',
                timestamp: '8 months ago',
                thumbnail: 'https://www.youtube.com/embed/o0sFbQMfskU'
            },
            {
                id: 8,
                title: 'Playlist: Tanaman Sayur Tutorial Menanam Sampai Panen',
                channel: 'Buah Tani',
                views: '520K views',
                timestamp: '11 months ago',
                thumbnail: 'https://www.youtube.com/embed/utlEwntqqPU'
            },
            {
                id: 9,
                title: 'Cara Mudah Menanam Tomat di Rumah',
                channel: 'Kebun Mini',
                views: '330K views',
                timestamp: '1 year ago',
                thumbnail: 'https://www.youtube.com/embed/7fz6bREQBbs'
            },
            {
                id: 10,
                title: 'Trik Merawat Tanaman Hias di Balkon Sempit',
                channel: 'Rumah Hijau',
                views: '810K views',
                timestamp: '2 weeks ago',
                thumbnail: 'https://www.youtube.com/embed/Go2F8pAfOgo'
            },
            {
                id: 11,
                title: 'Cara Menanam Kangkung Hidroponik',
                channel: 'Hidroponik Lokal',
                views: '115K views',
                timestamp: '3 months ago',
                thumbnail: 'https://www.youtube.com/embed/54qUgN8Wdn4'
            },
            {
                id: 12,
                title: 'Perawatan Tanaman Herbal untuk Dapur Sehat',
                channel: 'Dapur Organik',
                views: '278K views',
                timestamp: '6 months ago',
                thumbnail: 'https://www.youtube.com/embed/cr2TI64yRI0'
            },
            {
                id: 13,
                title: 'Panduan Pemula Menanam Cabe Rawit',
                channel: 'Tanam Sendiri',
                views: '145K views',
                timestamp: '2 months ago',
                thumbnail: 'https://www.youtube.com/embed/O_sruPLt_g0'
            },
            {
                id: 14,
                title: 'Cara Menanam Bawang Merah di Pot',
                channel: 'Kebun Rumah',
                views: '190K views',
                timestamp: '4 months ago',
                thumbnail: 'https://www.youtube.com/embed/RFgh2JgGkeE'
            },
            {
                id: 15,
                title: 'Tips Mempercepat Pertumbuhan Tanaman',
                channel: 'Tani Cerdas',
                views: '560K views',
                timestamp: '1 week ago',
                thumbnail: 'https://www.youtube.com/embed/htjMq4kapNo'
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