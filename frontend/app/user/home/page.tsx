"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Slider from "react-slick";
import { IMenu } from "@/app/types";
import { getCookies } from "@/lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "@/lib/bridge";
import { ButtonKeranjang } from "@/components/button";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosArrowDropright, IoIosArrowForward } from 'react-icons/io';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const [menu, setMenu] = useState<IMenu[]>([]);

    // useEffect(() => {
    //     // Disable klik kanan
    //     const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    //     document.addEventListener("contextmenu", handleContextMenu);

    //     // Disable drag gambar
    //     const handleDragStart = (e: DragEvent) => e.preventDefault();
    //     document.addEventListener("dragstart", handleDragStart);

    //     // Disable seleksi teks
    //     document.body.style.userSelect = "none";

    //     return () => {
    //         document.removeEventListener("contextmenu", handleContextMenu);
    //         document.removeEventListener("dragstart", handleDragStart);
    //         document.body.style.userSelect = "auto";
    //     };
    // }, []);


    // useEffect(() => {
    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         if (
    //             (e.ctrlKey && e.key === "u") || // View source
    //             (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // DevTools
    //             (e.ctrlKey && e.key === "s") || // Save page
    //             (e.key === "F12") // DevTools
    //         ) {
    //             e.preventDefault();
    //         }
    //     };

    //     document.addEventListener("keydown", handleKeyDown);
    //     return () => document.removeEventListener("keydown", handleKeyDown);
    // }, []);



const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
        return (
            <div
                className="absolute -right-56 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#3CB371] h-[400px] w-[200px] text-5xl p-2 flex items-center justify-center rounded-md"
                onClick={onClick}
            >
                <div className='flex flex-col justify-center'>
                    <IoIosArrowDropright className='p-1 ml-3'/>
                    <p className='text-white font-semibold text-sm'>See More...</p>
                </div>
            </div>
        );
};

const NextArrowYoutube = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div
            className="absolute -right-69 top-[107px] transform -translate-y-1/2 z-10 cursor-pointer text-white bg-[#3CB371] h-[217px] w-[250px] text-5xl p-2 flex items-center justify-center rounded-md"
            onClick={onClick}
        >
            <div className='flex flex-col justify-center'>
                <IoIosArrowDropright className='p-1 ml-3'/>
                <p className='text-white font-semibold text-sm'>See More...</p>
            </div>
        </div>
    );
};

const PrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-400 text-5xl p-2"
            onClick={onClick}>
            <IoIosArrowBack />
        </div>
    );
};

interface Video {
    id: number;
    title: string;
    channel: string;
    views: string;
    timestamp: string;
    thumbnail: string;
}

const videos: Video[] = [
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
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/NaQfp48stwc'
    },
    {
        id: 3,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/hLxmGAFebxM'
    },
    {
        id: 4,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/EH84EAq4IaA'
    },
    {
        id: 5,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/X9gktB2gMEE'
    },
    {
        id: 6,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/E6cWrYKmdfw'
    },
    {
        id: 7,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/AXch3-Xm2LE'
    },
];


const plantguide: Video[] = [
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
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/NaQfp48stwc'
    },
    {
        id: 3,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/hLxmGAFebxM'
    },
    {
        id: 4,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/EH84EAq4IaA'
    },
    {
        id: 5,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/X9gktB2gMEE'
    },
    {
        id: 6,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/E6cWrYKmdfw'
    },
    {
        id: 7,
        title: 'Another Great Video',
        channel: 'Cool Channel',
        views: '500K views',
        timestamp: '2 months ago',
        thumbnail: 'https://www.youtube.com/embed/AXch3-Xm2LE'
    },
];


const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 200,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3 }
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 480,
            settings: { slidesToShow: 1 }
        }
    ]
};

const setting = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    nextArrow: <NextArrowYoutube />,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3 }
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 480,
            settings: { slidesToShow: 1 }
        }
    ]
};

    const getMenu = async () => {
        try {
            const TOKEN = getCookies("token") || "";
            const url = `${BASE_API_URL}/menu?search=${search}`;
            const { data } = await get(url, TOKEN);
            if ((data as { status: boolean; data: IMenu[] }).status) {
                setMenu((data as { status: boolean; data: IMenu[] }).data);
            }
        } catch (error) {
            console.error("Error getmenu menu:", error);
        }
    };

    useEffect(() => {
        getMenu();
    }, [search]);

    return (
        <div className='w-full overflow-x-hidden'>
            {/* Hero */}
            <div className='relative w-full h-[670px]'>
                <div className='absolute inset-0'>
                    <Image src="/home1.png" alt='Home Image' className='object-cover' fill />
                    <div className="absolute bg-gradient-to-t from-black/70 to-transparent inset-0 lg:block"></div>
                </div>
                <div className="py-16 px-6 md:px-16 lg:px-32 font-roboto absolute top-24 lg:top-32">
                    <div className="text-black lg:text-white space-y-5 md:text-center lg:text-left md:w-[670px] lg:w-[700px]">
                        <h1 className="text-2xl font-bold lg:text-3xl">
                            Plant, Care, Be Happy! “Plantify.id” Online Platform for Positive Gardening Experience 
                        </h1>
                        <p className="text-sm font-normal lg:text-base">
                            You're not alone on this journey. Our compassionate counselors are here to guide you.
                        </p>
                        <div className="flex justify-start text-xs space-x-5 md:justify-center lg:justify-start">
                            <button className="bg-[#2E8B57] text-white text-center px-4 py-2 rounded-md lg:text-base cursor-pointer lg:px-7">
                                Start Your Healing Journey Today
                            </button>
                            <button className="border border-black lg:border-white rounded-md bg-transparent px-4 py-2 lg:text-base cursor-pointer lg:px-7">
                                Schedule Your Counseling Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barang */}
            <div className='py-10'>
                <div className='flex justify-start items-center p-10'>
                    <h1 className='text-4xl font-bold '>MarketPlace</h1>
                </div>
                <div className='mt-6 pl-6 pr-[300px]'>
                    <Slider {...settings}>
                        {menu.map((data) => (
                            <div key={data.id}>
                                <div className="bg-[#2E8B57] text-white rounded-lg overflow-hidden shadow-md flex flex-col h-[400px] w-[260px] mx-auto">
                                    <Image
                                        width={300}
                                        height={200}
                                        src={`${BASE_IMAGE_MENU}/${data.picture}`}
                                        alt="preview"
                                        className="object-cover bg-white w-full h-[200px] rounded-t-lg"
                                        unoptimized
                                    />
                                    <div className="flex flex-col justify-between flex-1 p-4">
                                        <div className='text-center'>
                                            <h5 className="font-bold text-xl mb-2">{data.name}</h5>
                                            <p className="text-sm line-clamp-3">{data.description}</p>
                                        </div>
                                        <ButtonKeranjang type="button" className="mt-4 justify-center" onClick={() => router.replace('/user/marketplace')}>
                                            Beli Sekarang
                                        </ButtonKeranjang>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Video */}
            <div className='py-10'>
                <div className='flex justify-start items-center p-10'>
                    <h1 className='text-4xl font-bold'>Video Terbaru</h1>
                </div>
                <div className='mt-6 pl-6 pr-[300px]'>
                    <Slider {...setting}>
                        {videos.map((video) => (
                            <div className="px-2 flex-shrink-0" style={{ width: '500px' }}>
                                <div className="aspect-video w-full" key={video.id}>
                                    <iframe
                                        className="w-full h-full rounded-lg shadow-lg"
                                        src={video.thumbnail}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Plant Guide */}
            <div className='py-10'>
                <div className='flex justify-start items-center p-10'>
                    <h1 className='text-4xl font-bold'>PlantGuide</h1>
                </div>
                <div className='mt-6 pl-6 pr-[300px]'>
                    <Slider {...setting}>
                        {videos.map((video) => (
                            <div className="px-2 flex-shrink-0" style={{ width: '500px' }}>
                                <div className="aspect-video w-full" key={video.id}>
                                    <iframe
                                        className="w-full h-full rounded-lg shadow-lg"
                                        src={video.thumbnail}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default HomePage;


