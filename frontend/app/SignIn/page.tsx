import React from "react";
import Image from "next/image";
import iconUser from "@/public/image/icon - user.png";
import iconEmail from "@/public/image/icon - mail.png";
import iconPass from "@/public/image/icon - password.png";

export default function SignIn() {
    return (
        <div className="bg-[#333333] min-h-screen flex items-center justify-center px-8 pr-20 py-12">
            <div className="flex flex-row w-full max-w-6xl items-center justify-between gap-12">

                <div className="text-white flex-1">
                    <h2 className="text-5xl font-bold leading-snug">
                        Take <span className="text-[#90EE90]">Better Care</span> of{" "}
                        <span className="text-[#FAFAD2]">Your <br /> Plants</span> with{" "}
                        <span className="text-[#2E8B57]">Plantify</span>
                    </h2>
                    <p className="mt-4 max-w-xl text-[#FCFCFC] text-sm leading-relaxed">
                        The issue of plant care is still often overlooked because some
                        people have limited knowledge on how to take good care of them.
                        Therefore, we invite plant lovers to jointly care for and maintain
                        plants to grow healthy and optimally. Plantify presents an
                        integrated solution that focuses on Education, Care, and Provision
                        of quality tools and materials to support gardening activities at
                        home.
                    </p>
                </div>

                <div className="bg-[#FCFCFC] shadow-lg rounded-xl p-6 w-80 max-w-sm">
                    <div className="flex justify-between mb-4 gap-2">
                        <button className="w-32 text-sm font-bold text-white bg-[#2E8B57] border border-[#2E8B57] px-3 py-1 rounded hover:bg-[#256d47] transition">
                            <a href="/signIn">Sign In</a>
                        </button>
                        <button className="w-32 text-sm font-semibold text-[#2E8B57] border border-[#2E8B57] rounded px-3 py-1 hover:bg-[#2E8B57]/10 transition">
                            <a href="/signUp">Sign Up</a>
                        </button>
                    </div>

                    <form className="flex flex-col pt-5 gap-3">

                        <div className="relative">
                            <Image
                                src={iconEmail} alt="Email Icon" width={18} height={18} className="opacity-50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="email" placeholder="Email" className="pl-10 text-[#8390A2] border border-[#2E8B57] rounded px-3 py-2 text-sm w-full" />
                        </div>

                        <div className="relative">
                            <Image
                                src={iconPass} alt="Password Icon" width={18} height={18} className="opacity-50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="password" placeholder="Password" className="pl-10 text-[#8390A2] border border-[#2E8B57] rounded px-3 py-2 text-sm w-full" />
                        </div>

                        <button
                            type="submit" className="mt-3 bg-[#2E8B57] text-white py-2 rounded font-bold">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
