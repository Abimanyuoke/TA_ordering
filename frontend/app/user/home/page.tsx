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
import { IoIosArrowDropright } from 'react-icons/io';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '@/public/image/Articles/1.jpg'
import img2 from '@/public/image/Articles/2.jpg'
import img3 from '@/public/image/Articles/3.jpeg'
import img4 from '@/public/image/Articles/4.webp'
import img5 from '@/public/image/Articles/5.jpg'
import img6 from '@/public/image/Articles/6.avif'
import tomat from "@/public/image/Plantguide/tomat.jpg"
import wortel from "@/public/image/Plantguide/wortel.jpg"
import spinach from "@/public/image/Plantguide/spinach.jpg"
import labu from "@/public/image/Plantguide/labu.jpg"
import timun from "@/public/image/Plantguide/timun.jpg"
import cabai from "@/public/image/Plantguide/cabai.jpg"
import lettuce from "@/public/image/Plantguide/salad.jpg"
import brocoli from "@/public/image/Plantguide/brocoli.jpg"
import bawang from "@/public/image/Plantguide/bawang.jpg"


const SectionHeader = ({ title, subtitle, buttonText, buttonLink }: { title: string; subtitle?: string; buttonText?: string; buttonLink?: string }) => {
    const router = useRouter();
    return (
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>
                {subtitle && <p className="text-gray-600 mt-2 max-w-2xl">{subtitle}</p>}
            </div>
            {buttonText && (
                <button
                    onClick={() => router.push(buttonLink || '#')}
                    className="mt-4 md:mt-0 w-[250px] py-2 bg-[#3CB371] text-white rounded-md hover:bg-[#2E8B57] transition-colors duration-300 flex items-center justify-center cursor-pointer"
                >
                    {buttonText}
                    <IoIosArrowDropright className="ml-2" />
                </button>
            )}
        </div>
    );
};

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
                    <IoIosArrowDropright className='p-1 ml-3' />
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
                    <IoIosArrowDropright className='p-1 ml-3' />
                    <p className='text-white font-semibold text-sm'>See More...</p>
                </div>
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

    type Plant = {
        id: string | number;
        attributes: {
            name: string;
            image?: any;
            description?: string;
            scientific_name?: string;
            family?: string;
            growing_season?: string;
            care_tips?: string[];
            nutritional_info?: string;
        };
    };

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

    const news: NewsArticle[] = [
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


    const plants: Plant[] = [
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
                nutritional_info: "Rich in lycopene, vitamin C, potassium, folate, and vitamin K. Known for antioxidant properties.",
                image: tomat
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
                nutritional_info: "Excellent source of beta-carotene (vitamin A), fiber, vitamin K1, potassium, and antioxidants.",
                image: wortel
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
                nutritional_info: "High in iron, calcium, magnesium, vitamins A, C, K, and folate. Contains antioxidants like lutein and zeaxanthin.",
                image: spinach
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
                nutritional_info: "Good source of vitamin K, vitamin A (as beta-carotene), and folate. Contains small amounts of many other nutrients.",
                image: lettuce
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
                nutritional_info: "Packed with vitamins C, K, and A, folate, potassium, and fiber. Contains sulforaphane, a compound with potential anti-cancer properties.",
                image: brocoli
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
                nutritional_info: "Excellent source of vitamin C (especially red peppers), vitamin A, vitamin B6, and folate. Hot peppers contain capsaicin with various health benefits.",
                image: cabai
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
                nutritional_info: "High water content (about 96%). Contains small amounts of vitamin K, potassium, and antioxidants like beta-carotene and flavonoids.",
                image: timun
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
                nutritional_info: "Rich in beta-carotene (converted to vitamin A), vitamin C, potassium, and fiber. Seeds are high in magnesium, zinc, and healthy fats.",
                image: labu
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
                nutritional_info: "Contains vitamin C, B vitamins, and potassium. Rich in antioxidants and sulfur-containing compounds that may have various health benefits.",
                image: bawang
            }
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

            {/* Plant Guide */}
            <div className='py-10'>
                <SectionHeader
                    title="Marketplace"
                    subtitle="Find everything you need for your garden"
                    buttonText="Browse All Products"
                    buttonLink="/user/marketplace" />

                <div className='relative px-6 pr-[300px]'>
                    <Slider {...setting}>
                        {plants.map((plant) => (
                            <div key={plant.id} className="px-3" onClick={() => router.push(`/user/plantguide`)}>
                                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-video w-full">
                                        <Image
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            src={plant.attributes.image.src}
                                            alt={plant.attributes.name}
                                            fill />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                                            <div className="text-white">
                                                <h3 className="text-2xl font-bold mb-1">{plant.attributes.name}</h3>
                                                <p className="text-sm opacity-90 italic">{plant.attributes.scientific_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Barang */}
            <div className='py-10'>
                <SectionHeader
                    title="Marketplace"
                    subtitle="Find everything you need for your garden"
                    buttonText="Browse All Products"
                    buttonLink="/user/marketplace"
                />
                <div className='mt-6 pl-6 px-[300px]'>
                    <Slider {...settings}>
                        {menu.map((data) => (
                            <div key={data.id} className="px-3">
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full min-h-[400px]">
                                    {/* Gambar */}
                                    <div className="relative h-[200px] w-full">
                                        <Image
                                            src={`${BASE_IMAGE_MENU}/${data.picture}`}
                                            alt={data.name}
                                            fill
                                            className="object-cover bg-gray-100"
                                            unoptimized
                                        />
                                    </div>

                                    {/* Konten */}
                                    <div className="flex flex-col justify-between flex-1 p-6 bg-[#2E8B57] text-white">
                                        <div>
                                            <h5 className="font-bold text-xl mb-2">{data.name}</h5>
                                            <p className="text-sm line-clamp-2">{data.description}</p>
                                        </div>

                                        <div className="mt-auto pt-4 flex justify-between items-center">
                                            <span className="font-bold text-lg">Rp{data.price}</span>
                                            <ButtonKeranjang
                                                type="button"
                                                className="px-4 py-2 text-sm"
                                                onClick={() => router.push('/user/marketplace')}
                                            >
                                                Add to Cart
                                            </ButtonKeranjang>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>


            {/* Video */}
            <div className='py-10'>
                <SectionHeader
                    title="Maintenance Education"
                    subtitle="Learn how to care for your plants with our video guides"
                    buttonText="View All Videos"
                    buttonLink="/user/education"
                />

                <div className="px-6 relative pr-[300px]">
                    <Slider {...setting}>
                        {videos.map((video) => (
                            <div key={video.id} className="px-3">
                                <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <div className="aspect-video w-full relative bg-gray-900">
                                        <iframe
                                            className="w-full h-full rounded-lg"
                                            src={video.thumbnail}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <h3 className="text-lg font-bold">{video.title}</h3>
                                                <p className="text-sm opacity-90">{video.channel}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Article and News */}
            <div className='py-10' >
                <SectionHeader
                    title="Articles & News"
                    subtitle="Stay updated with the latest gardening trends and research"
                    buttonText="Read All Articles"
                    buttonLink="/user/news"
                />

                <div className="mx-auto px-6 relative pr-[300px]">
                    <Slider {...setting}>
                        {news.map((article) => (
                            <div key={article.id} className="px-3">
                                <div
                                    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                                    onClick={() => router.push(`/user/news`)}>
                                    <div className="aspect-video w-full relative">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                                            <div className="text-white">
                                                <span className="text-xs font-semibold bg-[#3CB371] px-2 py-1 rounded">{article.source}</span>
                                                <h3 className="text-xl font-bold mt-2 mb-1">{article.title}</h3>
                                                <p className="text-sm opacity-90">{article.description}</p>
                                                <div className="mt-3 flex items-center text-xs opacity-90">
                                                    <span>{article.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        </div >
    );
};

export default HomePage;



// "use client"

// import React, { useEffect, useState } from 'react'
// import Image from 'next/image';
// import Slider from "react-slick";
// import { IMenu } from "@/app/types";
// import { getCookies } from "@/lib/client-cookies";
// import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
// import { get } from "@/lib/bridge";
// import { ButtonKeranjang } from "@/components/button";
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import { IoIosArrowDropright } from 'react-icons/io';
// import { FiArrowRight } from 'react-icons/fi';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // Import images
// import img1 from '@/public/image/Articles/1.jpg'
// import img2 from '@/public/image/Articles/2.jpg'
// import img3 from '@/public/image/Articles/3.jpeg'
// import img4 from '@/public/image/Articles/4.webp'
// import img5 from '@/public/image/Articles/5.jpg'
// import img6 from '@/public/image/Articles/6.avif'
// import tomat from "@/public/image/Plantguide/tomat.jpg"
// import wortel from "@/public/image/Plantguide/wortel.jpg"
// import spinach from "@/public/image/Plantguide/spinach.jpg"
// import labu from "@/public/image/Plantguide/labu.jpg"
// import timun from "@/public/image/Plantguide/timun.jpg"
// import cabai from "@/public/image/Plantguide/cabai.jpg"
// import lettuce from "@/public/image/Plantguide/salad.jpg"
// import brocoli from "@/public/image/Plantguide/brocoli.jpg"
// import bawang from "@/public/image/Plantguide/bawang.jpg"

// const HomePage = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const search = searchParams.get("search") || "";
//     const [menu, setMenu] = useState<IMenu[]>([]);

//     // Custom Arrows
//     const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
//         return (
//             <div
//                 className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white text-[#3CB371] h-16 w-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
//                 onClick={onClick}
//             >
//                 <FiArrowRight className="text-2xl" />
//             </div>
//         );
//     };

//     const NextArrowYoutube = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
//         return (
//             <div
//                 className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white text-[#3CB371] h-16 w-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
//                 onClick={onClick}
//             >
//                 <FiArrowRight className="text-2xl" />
//             </div>
//         );
//     };

//     interface Video {
//         id: number;
//         title: string;
//         channel: string;
//         views: string;
//         timestamp: string;
//         thumbnail: string;
//     }

//     type NewsArticle = {
//         id: string | number;
//         title: string;
//         source: string;
//         date: string;
//         description: string;
//         image?: any;
//         content: string;
//         url: string;
//     };

//     type Plant = {
//         id: string | number;
//         attributes: {
//             name: string;
//             image?: any;
//             description?: string;
//             scientific_name?: string;
//             family?: string;
//             growing_season?: string;
//             care_tips?: string[];
//             nutritional_info?: string;
//         };
//     };

//     const videos: Video[] = [
//         {
//             id: 1,
//             title: 'Never Gonna Give You Up',
//             channel: 'Rick Astley',
//             views: '1.2B views',
//             timestamp: '3 years ago',
//             thumbnail: 'https://www.youtube.com/embed/eXti7Z5S4TQ'
//         },
//         {
//             id: 2,
//             title: 'Another Great Video',
//             channel: 'Cool Channel',
//             views: '500K views',
//             timestamp: '2 months ago',
//             thumbnail: 'https://www.youtube.com/embed/NaQfp48stwc'
//         },
//         {
//             id: 3,
//             title: 'Another Great Video',
//             channel: 'Cool Channel',
//             views: '500K views',
//             timestamp: '2 months ago',
//             thumbnail: 'https://www.youtube.com/embed/hLxmGAFebxM'
//         },
//         {
//             id: 4,
//             title: 'Another Great Video',
//             channel: 'Cool Channel',
//             views: '500K views',
//             timestamp: '2 months ago',
//             thumbnail: 'https://www.youtube.com/embed/EH84EAq4IaA'
//         },
//         {
//             id: 5,
//             title: 'Another Great Video',
//             channel: 'Cool Channel',
//             views: '500K views',
//             timestamp: '2 months ago',
//             thumbnail: 'https://www.youtube.com/embed/X9gktB2gMEE'
//         },
//         {
//             id: 6,
//             title: 'Another Great Video',
//             channel: 'Cool Channel',
//             views: '500K views',
//             timestamp: '2 months ago',
//             thumbnail: 'https://www.youtube.com/embed/E6cWrYKmdfw'
//         },
//         {
//             id: 7,
//             title: 'Another Great Video',
//             channel: 'Cool Channel',
//             views: '500K views',
//             timestamp: '2 months ago',
//             thumbnail: 'https://www.youtube.com/embed/AXch3-Xm2LE'
//         },
//     ];

//     const news: NewsArticle[] = [
//         {
//             id: 1,
//             title: "New Study Reveals Benefits of Indoor Plants for Mental Health",
//             source: "Botany Today",
//             date: "May 15, 2023",
//             description: "Research shows significant improvements in stress levels when surrounded by greenery.",
//             image: img1,
//             content: "A comprehensive study across 50 offices showed employees with plants reported 15% lower stress levels. The presence of greenery was linked to increased productivity and overall job satisfaction. Experts recommend at least one medium-sized plant per 100 square feet of workspace.",
//             url: "https://stories.tamu.edu/news/2024/02/06/livening-up-your-space-with-plants-can-boost-your-mental-health/?utm_source=chatgpt.com"
//         },
//         {
//             id: 2,
//             title: "Rare Tropical Plant Discovered in Amazon Rainforest",
//             source: "Global Botany News",
//             date: "May 10, 2023",
//             description: "Scientists identify new species with potential medicinal properties.",
//             image: img2,
//             content: "The newly discovered Philodendron amazonicus shows promise in early trials for anti-inflammatory properties. Indigenous tribes have used the plant for generations to treat wounds and fevers. Researchers are now studying its potential for modern pharmaceuticals.",
//             url: "https://www.fieldmuseum.org/about/press/mystery-plant-amazon-declared-new-species-after-nearly-50-years-flummoxing-scientists?utm_source=chatgpt.com"
//         },
//         {
//             id: 3,
//             title: "Urban Farming Initiative Transforms City Rooftops",
//             source: "Sustainable Cities",
//             date: "April 28, 2023",
//             description: "Major cities converting unused spaces into productive gardens.",
//             image: img3,
//             content: "The program has created 12 acres of new growing space downtown, producing 15,000 pounds of fresh produce annually. Participants report improved community bonds and access to fresh food. The initiative aims to expand to 50 acres by 2025.",
//             url: "https://igrownews.com/the-challenges-and-benefits-of-urban-farming/?utm_source=chatgpt.com"
//         },
//         {
//             id: 4,
//             title: "Climate Change Affects Plant Flowering Patterns",
//             source: "Environmental Science Journal",
//             date: "April 20, 2023",
//             description: "Researchers document shifts in flowering times across continents.",
//             image: img4,
//             content: "Data from 120 research stations shows spring-flowering plants are blooming 2.3 days earlier per decade. This phenological shift could disrupt pollination cycles and ecosystem relationships. The changes are most pronounced in temperate regions.",
//             url: "https://www.earth.com/news/flowers-blooming-92-days-earlier-due-to-climate-change/?utm_source=chatgpt.com"
//         },
//         {
//             id: 5,
//             title: "Ancient Healing Plants in Modern Medicine",
//             source: "Ethnobotany Review",
//             date: "April 15, 2023",
//             description: "Traditional remedies validated by scientific research.",
//             image: img5,
//             content: "Plants like turmeric and echinacea are being studied for pharmacological properties. Clinical trials confirm many traditional uses while discovering new applications. Researchers emphasize the importance of preserving indigenous knowledge.",
//             url: "https://www.who.int/news-room/feature-stories/detail/traditional-medicine-has-a-long-history-of-contributing-to-conventional-medicine-and-continues-to-hold-promise?utm_source=chatgpt.com"
//         },
//         {
//             id: 6,
//             title: "Home Gardening Surge During Pandemic Continues",
//             source: "Horticulture Weekly",
//             date: "April 5, 2023",
//             description: "Many pandemic gardeners have maintained their new hobby.",
//             image: img6,
//             content: "Surveys show 65% of people who started gardening during lockdowns have continued. Nurseries report sustained demand for vegetable seeds and starter plants. Experts attribute this to ongoing interest in food security and mental wellbeing.",
//             url: "https://www.seedworld.com/us/2024/01/22/pandemic-still-impacting-home-garden-seed-market/?utm_source=chatgpt.com"
//         }
//     ];


//     const plants: Plant[] = [
//         {
//             id: 1,
//             attributes: {
//                 name: "Tomato",
//                 scientific_name: "Solanum lycopersicum",
//                 family: "Solanaceae",
//                 growing_season: "Summer",
//                 description: "Tomatoes are juicy, sweet, and slightly tangy fruits that are typically red when ripe. They're technically berries but commonly used as vegetables in cooking.",
//                 care_tips: [
//                     "Require 6-8 hours of sunlight daily",
//                     "Keep soil consistently moist but not waterlogged",
//                     "Use stakes or cages to support vines",
//                     "Fertilize every 2-3 weeks with balanced fertilizer"
//                 ],
//                 nutritional_info: "Rich in lycopene, vitamin C, potassium, folate, and vitamin K. Known for antioxidant properties.",
//                 image: tomat
//             }
//         },
//         {
//             id: 2,
//             attributes: {
//                 name: "Carrot",
//                 scientific_name: "Daucus carota",
//                 family: "Apiaceae",
//                 growing_season: "Cool seasons (spring/fall)",
//                 description: "Carrots are crunchy root vegetables known for their bright orange color, though they come in purple, white, yellow, and red varieties.",
//                 care_tips: [
//                     "Plant in loose, sandy soil for straight roots",
//                     "Thin seedlings to 2 inches apart",
//                     "Keep soil moist for even growth",
//                     "Mulch to keep soil cool and retain moisture"
//                 ],
//                 nutritional_info: "Excellent source of beta-carotene (vitamin A), fiber, vitamin K1, potassium, and antioxidants.",
//                 image: wortel
//             }
//         },
//         {
//             id: 3,
//             attributes: {
//                 name: "Spinach",
//                 scientific_name: "Spinacia oleracea",
//                 family: "Amaranthaceae",
//                 growing_season: "Cool seasons (spring/fall)",
//                 description: "Spinach is a leafy green vegetable with tender, dark green leaves that can be eaten raw or cooked. It grows quickly and is packed with nutrients.",
//                 care_tips: [
//                     "Prefers cooler temperatures (15-20°C)",
//                     "Keep soil consistently moist",
//                     "Harvest outer leaves to encourage new growth",
//                     "Use shade cloth in warmer months"
//                 ],
//                 nutritional_info: "High in iron, calcium, magnesium, vitamins A, C, K, and folate. Contains antioxidants like lutein and zeaxanthin.",
//                 image: spinach
//             }
//         },
//         {
//             id: 4,
//             attributes: {
//                 name: "Lettuce",
//                 scientific_name: "Lactuca sativa",
//                 family: "Asteraceae",
//                 growing_season: "Cool seasons (spring/fall)",
//                 description: "Lettuce is a crisp leafy vegetable commonly used in salads. It comes in many varieties from crisphead (iceberg) to loose-leaf, romaine, and butterhead types.",
//                 care_tips: [
//                     "Prefers cooler temperatures (7-20°C)",
//                     "Needs consistent moisture",
//                     "Plant in partial shade in warmer climates",
//                     "Harvest in morning for crispest leaves"
//                 ],
//                 nutritional_info: "Good source of vitamin K, vitamin A (as beta-carotene), and folate. Contains small amounts of many other nutrients.",
//                 image: lettuce
//             }
//         },
//         {
//             id: 5,
//             attributes: {
//                 name: "Broccoli",
//                 scientific_name: "Brassica oleracea var. italica",
//                 family: "Brassicaceae",
//                 growing_season: "Cool seasons (spring/fall)",
//                 description: "Broccoli is a green vegetable with a large flowering head, stalk, and small leaves. The florets are harvested before the flowers bloom.",
//                 care_tips: [
//                     "Needs full sun (6-8 hours)",
//                     "Keep soil consistently moist",
//                     "Use balanced fertilizer at planting",
//                     "Harvest when florets are tight and dark green"
//                 ],
//                 nutritional_info: "Packed with vitamins C, K, and A, folate, potassium, and fiber. Contains sulforaphane, a compound with potential anti-cancer properties.",
//                 image: brocoli
//             }
//         },
//         {
//             id: 6,
//             attributes: {
//                 name: "Pepper",
//                 scientific_name: "Capsicum annuum",
//                 family: "Solanaceae",
//                 growing_season: "Summer",
//                 description: "Peppers come in sweet and hot varieties, ranging from bell peppers to chili peppers. Colors include green, red, yellow, orange, and purple.",
//                 care_tips: [
//                     "Need warm temperatures (20-30°C)",
//                     "Provide support for heavy fruit",
//                     "Water deeply but allow soil to dry slightly between",
//                     "Harvest when fruits reach desired size/color"
//                 ],
//                 nutritional_info: "Excellent source of vitamin C (especially red peppers), vitamin A, vitamin B6, and folate. Hot peppers contain capsaicin with various health benefits.",
//                 image: cabai
//             }
//         },
//         {
//             id: 7,
//             attributes: {
//                 name: "Cucumber",
//                 scientific_name: "Cucumis sativus",
//                 family: "Cucurbitaceae",
//                 growing_season: "Summer",
//                 description: "Cucumbers are refreshing, mild-flavored fruits with high water content. They grow on vines and come in slicing and pickling varieties.",
//                 care_tips: [
//                     "Need full sun and warm temperatures",
//                     "Provide trellis for vertical growth",
//                     "Keep soil consistently moist",
//                     "Harvest regularly to encourage more fruit"
//                 ],
//                 nutritional_info: "High water content (about 96%). Contains small amounts of vitamin K, potassium, and antioxidants like beta-carotene and flavonoids.",
//                 image: timun
//             }
//         },
//         {
//             id: 8,
//             attributes: {
//                 name: "Pumpkin",
//                 scientific_name: "Cucurbita pepo",
//                 family: "Cucurbitaceae",
//                 growing_season: "Summer to Fall",
//                 description: "Pumpkins are large, round, orange winter squash with ribbed skin. They're grown for both culinary uses and decorative purposes (especially at Halloween).",
//                 care_tips: [
//                     "Need full sun and plenty of space",
//                     "Water deeply once a week",
//                     "Use mulch to retain moisture",
//                     "Harvest when rind is hard and color is deep"
//                 ],
//                 nutritional_info: "Rich in beta-carotene (converted to vitamin A), vitamin C, potassium, and fiber. Seeds are high in magnesium, zinc, and healthy fats.",
//                 image: labu
//             }
//         },
//         {
//             id: 9,
//             attributes: {
//                 name: "Onion",
//                 scientific_name: "Allium cepa",
//                 family: "Amaryllidaceae",
//                 growing_season: "Cool seasons (spring/fall)",
//                 description: "Onions are bulb vegetables with layers of papery skin and a pungent flavor when raw that sweetens when cooked. They come in yellow, red, and white varieties.",
//                 care_tips: [
//                     "Plant in well-drained soil",
//                     "Keep weed-free for best bulb development",
//                     "Reduce watering as harvest approaches",
//                     "Harvest when tops yellow and fall over"
//                 ],
//                 nutritional_info: "Contains vitamin C, B vitamins, and potassium. Rich in antioxidants and sulfur-containing compounds that may have various health benefits.",
//                 image: bawang
//             }
//         },
//     ];





//     const settings = {
//         dots: false,
//         infinite: true,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         speed: 500,
//         cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
//         nextArrow: <NextArrow />,
//         responsive: [
//             {
//                 breakpoint: 1280,
//                 settings: { slidesToShow: 3 }
//             },
//             {
//                 breakpoint: 1024,
//                 settings: { slidesToShow: 2 }
//             },
//             {
//                 breakpoint: 640,
//                 settings: { slidesToShow: 1 }
//             }
//         ]
//     };

//     const setting = {
//         ...settings,
//         slidesToShow: 3,
//         nextArrow: <NextArrowYoutube />,
//     };

//     const getMenu = async () => {
//         try {
//             const TOKEN = getCookies("token") || "";
//             const url = `${BASE_API_URL}/menu?search=${search}`;
//             const { data } = await get(url, TOKEN);
//             if ((data as { status: boolean; data: IMenu[] }).status) {
//                 setMenu((data as { status: boolean; data: IMenu[] }).data);
//             }
//         } catch (error) {
//             console.error("Error getmenu menu:", error);
//         }
//     };

//     useEffect(() => {
//         getMenu();
//     }, [search]);

//     // Section Header Component
//     const SectionHeader = ({ title, subtitle, buttonText, buttonLink }: { title: string; subtitle?: string; buttonText?: string; buttonLink?: string }) => (
//         <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>
//                 {subtitle && <p className="text-gray-600 mt-2 max-w-2xl">{subtitle}</p>}
//             </div>
//             {buttonText && (
//                 <button
//                     onClick={() => router.push(buttonLink || '#')}
//                     className="mt-4 md:mt-0 px-6 py-2 bg-[#3CB371] text-white rounded-md hover:bg-[#2E8B57] transition-colors duration-300 flex items-center"
//                 >
//                     {buttonText}
//                     <FiArrowRight className="ml-2" />
//                 </button>
//             )}
//         </div>
//     );

//     return (
//         <div className="w-full overflow-x-hidden bg-gray-50">
//             {/* Hero Section */}
//             <section className="relative w-full h-screen max-h-[800px]">
//                 <div className="absolute inset-0">
//                     <Image
//                         src="/home1.png"
//                         alt="Gardening Community"
//                         className="object-cover"
//                         fill
//                         priority
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
//                 </div>

//                 <div className="relative z-10 h-full flex items-center">
//                     <div className="container mx-auto px-6">
//                         <div className="max-w-2xl text-white">
//                             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//                                 Plant, Care, Be Happy with <span className="text-[#3CB371]">Plantify.id</span>
//                             </h1>
//                             <p className="text-lg md:text-xl mb-8 text-gray-200">
//                                 Your online platform for a positive gardening experience. Join our community of plant lovers today.
//                             </p>
//                             <div className="flex flex-col sm:flex-row gap-4">
//                                 <button
//                                     className="px-8 py-3 bg-[#3CB371] hover:bg-[#2E8B57] rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
//                                     onClick={() => router.push('/user/marketplace')}
//                                 >
//                                     Start Your Gardening Journey
//                                 </button>
//                                 <button
//                                     className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-300"
//                                     onClick={() => router.push('/user/plantguide')}
//                                 >
//                                     Learn About Plants
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Plant Guide Section */}
//             <section className="py-16 bg-white">
//                 <SectionHeader
//                     title="Plant Guide"
//                     subtitle="Discover how to care for your favorite plants"
//                     buttonText="View All Plants"
//                     buttonLink="/user/plantguide"
//                 />

//                 <div className="container mx-auto px-6 relative">
//                     <Slider {...setting}>
//                         {plants.map((plant) => (
//                             <div key={plant.id} className="px-3">
//                                 <div
//                                     className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
//                                     onClick={() => router.push(`/user/plantguide`)}
//                                 >
//                                     <div className="aspect-[4/3] w-full relative">
//                                         <Image
//                                             src={plant.attributes.image}
//                                             alt={plant.attributes.name}
//                                             fill
//                                             className="object-cover transition-transform duration-500 group-hover:scale-110"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
//                                             <div className="text-white">
//                                                 <h3 className="text-2xl font-bold mb-1">{plant.attributes.name}</h3>
//                                                 <p className="text-sm opacity-90 italic">{plant.attributes.scientific_name}</p>
//                                                 <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                                     <span className="inline-block px-3 py-1 bg-[#3CB371] rounded-full text-xs font-semibold">
//                                                         {plant.attributes.growing_season}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             </section>

//             {/* Marketplace Section */}
//             <section className="py-16 bg-gray-50">
//                 <SectionHeader
//                     title="Marketplace"
//                     subtitle="Find everything you need for your garden"
//                     buttonText="Browse All Products"
//                     buttonLink="/user/marketplace"
//                 />

//                 <div className="container mx-auto px-6 relative">
//                     <Slider {...settings}>
//                         {menu.map((data) => (
//                             <div key={data.id} className="px-3">
//                                 <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
//                                     <div className="relative aspect-square w-full">
//                                         <Image
//                                             src={`${BASE_IMAGE_MENU}/${data.picture}`}
//                                             alt={data.name}
//                                             fill
//                                             className="object-cover bg-gray-100"
//                                             unoptimized
//                                         />
//                                     </div>
//                                     <div className="flex flex-col justify-between flex-1 p-6">
//                                         <div>
//                                             <h5 className="font-bold text-xl mb-2 text-gray-800">{data.name}</h5>
//                                             <p className="text-gray-600 text-sm line-clamp-2 mb-4">{data.description}</p>
//                                         </div>
//                                         <div className="flex justify-between items-center">
//                                             <span className="font-bold text-[#3CB371] text-lg">${data.price}</span>
//                                             <ButtonKeranjang
//                                                 type="button"
//                                                 className="px-4 py-2 text-sm"
//                                                 onClick={() => router.push('/user/marketplace')}
//                                             >
//                                                 Add to Cart
//                                             </ButtonKeranjang>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             </section>

//             {/* Education Media Section */}
//             <section className="py-16 bg-white">
//                 <SectionHeader
//                     title="Maintenance Education"
//                     subtitle="Learn how to care for your plants with our video guides"
//                     buttonText="View All Videos"
//                     buttonLink="/user/videos"
//                 />

//                 <div className="container mx-auto px-6 relative">
//                     <Slider {...setting}>
//                         {videos.map((video) => (
//                             <div key={video.id} className="px-3">
//                                 <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
//                                     <div className="aspect-video w-full relative bg-gray-900">
//                                         <iframe
//                                             className="w-full h-full rounded-lg"
//                                             src={video.thumbnail}
//                                             title={video.title}
//                                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                             allowFullScreen
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                                             <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                                                 <h3 className="text-lg font-bold">{video.title}</h3>
//                                                 <p className="text-sm opacity-90">{video.channel}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             </section>

//             {/* News Section */}
//             <section className="py-16 bg-gray-50">
//                 <SectionHeader
//                     title="Articles & News"
//                     subtitle="Stay updated with the latest gardening trends and research"
//                     buttonText="Read All Articles"
//                     buttonLink="/user/news"
//                 />

//                 <div className="container mx-auto px-6 relative">
//                     <Slider {...setting}>
//                         {news.map((article) => (
//                             <div key={article.id} className="px-3">
//                                 <div
//                                     className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
//                                     onClick={() => router.push(`/user/news`)}
//                                 >
//                                     <div className="aspect-[4/3] w-full relative">
//                                         <Image
//                                             src={article.image}
//                                             alt={article.title}
//                                             fill
//                                             className="object-cover transition-transform duration-500 group-hover:scale-110"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
//                                             <div className="text-white">
//                                                 <span className="text-xs font-semibold bg-[#3CB371] px-2 py-1 rounded">{article.source}</span>
//                                                 <h3 className="text-xl font-bold mt-2 mb-1">{article.title}</h3>
//                                                 <p className="text-sm opacity-90">{article.description}</p>
//                                                 <div className="mt-3 flex items-center text-xs opacity-90">
//                                                     <span>{article.date}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="py-20 bg-[#3CB371] text-white">
//                 <div className="container mx-auto px-6 text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Gardening Journey?</h2>
//                     <p className="text-xl mb-8 max-w-2xl mx-auto">
//                         Join thousands of happy plant lovers in our community today.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center gap-4">
//                         <button
//                             className="px-8 py-3 bg-white text-[#3CB371] hover:bg-gray-100 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
//                             onClick={() => router.push('/register')}
//                         >
//                             Sign Up Now
//                         </button>
//                         <button
//                             className="px-8 py-3 border-2 border-white hover:bg-white/10 rounded-lg font-medium transition-all duration-300"
//                             onClick={() => router.push('/about')}
//                         >
//                             Learn More
//                         </button>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePage;