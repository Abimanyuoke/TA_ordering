import React from "react";
import Image from "next/image";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";

export default function NavbarLogin() {
    return (
        <nav className="bg-[#FAFAD2] shadow-md w-full font-inter px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex p-5 justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src="./Logo.svg" alt="logo of Plantify" width={40} height={40} className="max-w-full" />
                        <div className="text-3xl font-bold items-center text-[#2E8B57]">Plantify</div>
                    </div>
                    <div className="flex flex-row items-center space-x-3 gap-x-3">
                        <div className="flex flex-row items-center space-x-2 text-xl text-[#333333] font-black">
                            <FaInstagramSquare className="text-4xl" />
                            <a href="#">@Plantify.id</a>
                        </div>
                        <div className="flex flex-row items-center space-x-2 text-xl text-[#333333] font-black">
                            <FaFacebook className="text-3xl" />
                            <a href="#">Plantify.id</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}