"use client"
import React from "react";
import Image from "next/image";
import imgLogo from "@/public/Logo.svg"
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    return (
        <header className="flex justify-between items-center p-4 pl-13 bg-[#FAFAD2]">
            <div className="flex items-center gap-2">
                <Image
                    src={imgLogo} alt="logo of Plantify" width={40} height={40} className="max-w-full" />
                <div className="text-3xl font-bold items-center text-[#2E8B57]">Plantify</div>
            </div>

            <div className="flex items-center gap-8 ml-auto">
                <nav className="hidden md:flex items-center gap-4 text-[#333333] font-bold">
                    <a href="#about" className="hover:underline">About Us</a>
                    <a href="#features" className="hover:underline">Features</a>
                    <span>|</span>
                </nav>

                <div className="flex gap-4">
                    <button className="w-32 cursor-pointer border font-bold bg-white border-[#2E8B57] text-[#2E8B57] px-4 py-2 rounded-lg hover:bg-green-50 transition" onClick={() => router.push("/signUp")}>
                        Sign Up
                    </button>
                    <button className="w-32 bg-[#2E8B57] cursor-pointer font-bold text-white px-4 py-2 rounded-lg hover:bg-[#276f48] transition" onClick={() => router.push("/signIn")}>
                        Sign In
                    </button>
                </div>
            </div>
        </header>
    )
}