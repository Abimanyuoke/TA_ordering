"use client"

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookies";
import { toast } from "sonner";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { IoEyeSharp } from "react-icons/io5";
import { HiEyeSlash } from "react-icons/hi2";
import axios from "axios";

export default function SignIn() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()
    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user/login`
            const payload = JSON.stringify({ email: email, password })
            const { data } = await axios.post<{ status: boolean; message: string; token: string; data?: { id: string; name: string; role: string; profile_picture?: string } }>(url, payload, {
                headers: { "Content-Type": "application/json" }
            })
            if (data.status == true) {
                toast.success("Login success", { duration: 2000 })
                storeCookie("token", data.token)
                if (data.data) {
                    storeCookie("id", data.data.id)
                    storeCookie("name", data.data.name)
                    storeCookie("role", data.data.role)
                    storeCookie("profile_picture", data.data.profile_picture || "")
                    let role = data.data.role
                    if (role === `MANAGER`) setTimeout(() => router.replace(`/manager/dashboard`), 1000)
                    else if (role === `USER`) setTimeout(() => router.replace(`/user/home`), 1000)
                }
            }
            else toast.warning(data.message, { duration: 2000 })
        } catch (error) {
            console.log(error);
            toast.error(`Something wrong`, { duration: 2000 })
        }
    }

    return (
        <div className="bg-[#333333] min-h-screen flex items-center justify-center px-8 pr-20 py-12 relative">

            <div className="mb-2 p-5 absolute top-0 left-0">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-white hover:text-slate-400">
                    <FaArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                </button>
            </div>

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
                        <button className="w-32 text-sm cursor-pointer font-bold text-white bg-[#2E8B57] border border-[#2E8B57] px-3 py-1 rounded hover:bg-[#256d47] transition" onAbort={() => router.push("/signIn")}>
                            Sign In
                        </button>
                        <button className="w-32 text-sm cursor-pointer font-semibold text-[#2E8B57] border border-[#2E8B57] rounded px-3 py-1 hover:bg-[#2E8B57]/10 transition" onClick={() => router.push("/signUp")}>
                            Sign Up
                        </button>
                    </div>

                    <form className="flex flex-col pt-5 gap-3" onSubmit={handleSubmit}>
                        <div className="flex w-full items-center border border-[#2E8B57] rounded relative">
                            <div className="p-3 absolute text-[#8390A2]">
                                <MdOutlineEmail className="text-xl" />
                            </div>
                            <input type="email" placeholder="Email" className="pl-10 text-[#8390A2] border border-[#2E8B57] focus:outline-none focus:ring-[#2E8B57] rounded px-3 py-2 text-sm w-full"
                                onChange={e => setEmail(e.target.value)} id={`email`} />
                        </div>

                        <div className="flex w-full items-center border border-[#2E8B57] rounded relative">
                            <div className="p-3 absolute text-[#8390A2]">
                                <GiPadlock className="text-xl" />
                            </div>
                            <input type={showPassword ? `text` : `password`} className="pl-10 text-[#8390A2] border border-[#2E8B57] rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-[#2E8B57]" value={password}
                                onChange={e => setPassword(e.target.value)} placeholder="Password" id={`password`} />
                            <div className="cursor-pointer rounded-r-md p-3 absolute right-0" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <IoEyeSharp  className="text-[#8390A2] text-lg"/> :
                                    <HiEyeSlash className="text-[#8390A2] text-lg"/>
                                }
                            </div>
                        </div>

                        <button
                            type="submit" className="mt-3 bg-[#2E8B57] text-white py-2 rounded font-bold cursor-pointer">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
