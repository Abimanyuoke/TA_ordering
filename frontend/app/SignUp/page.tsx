"use client"

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import iconPass from "@/public/image/icon - password.png";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/client-cookies";
import { IUser } from "@/app/types";
import { post } from "@/lib/bridge";
import { MdOutlineEmail } from "react-icons/md";
import { InputGroupComponent } from "@/components/InputComponent"
import FileInput from "@/components/fileInput"
import { LuUserRound } from "react-icons/lu";
import { GiPadlock } from "react-icons/gi";
import { SiGooglemaps } from "react-icons/si";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { HiEyeSlash } from "react-icons/hi2";


export default function SignUp() {


    const [user, setUser] = useState<IUser>({
        id: 0, uuid: ``, name: ``, email: ``,
        password: ``, profile_picture: ``, role: `USER`, alamat: ``, telephone: ``, createdAt: ``, updatedAt: ``
    })
    const router = useRouter()
    const TOKEN = getCookies("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user`
            const { name, email, password, role, alamat, telephone } = user
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("password", password || "")
            payload.append("role", role || "USER")
            payload.append("alamat", alamat || "")
            payload.append("telephone", telephone || "")
            if (file !== null) payload.append("profile_picture", file)

            const response = await post(url, payload, TOKEN)
            const data = response as { status: boolean; message: string }

            if (data.status) {
                toast.success("Your account has been created, please login")
                setTimeout(() => {
                    router.replace(`/signIn`)
                }, 2000)
            } else {
                toast.warning("Your password or email is wrong", { duration: 2000 })
            }
        } catch (error) {
            console.error(error)
            toast.error(`Something went wrong`, { duration: 2000 })
        }
    }

    return (
        <div className="bg-[#333333] min-h-screen flex items-center justify-center px-8 pr-20 py-12">
            <div className="flex flex-row w-full max-w-6xl items-center justify-between gap-12">

                <div className="text-white flex-1">
                    <h2 className="text-5xl font-extrabold leading-tight">
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

                <div className="bg-[#FCFCFC] shadow-lg rounded-xl p-6 w-[400px] max-w-sm">
                    <div className="flex justify-evenly mb-4 gap-2">
                        <button className="w-32 text-sm cursor-pointer font-semibold text-[#2E8B57] border border-[#2E8B57] rounded px-3 py-1 hover:bg-[#2E8B57]/10 transition" onClick={() => router.push("/signIn")}>
                            Sign In
                        </button>
                        <button className="w-32 text-sm font-bold cursor-pointer text-white bg-[#2E8B57] border border-[#2E8B57] px-3 py-1 rounded hover:bg-[#256d47] transition" onClick={() => router.push("/signUp")}>
                            Sign Up
                        </button>
                    </div>

                    <form className="flex flex-col pt-5 text-[#8390A2] " onSubmit={handleSubmit}>
                        <div className="relative flex w-full items-center">
                            <div className="p-3 top-6 absolute text-[#8390A2]">
                                <LuUserRound className=" text-lg" />
                            </div>
                            <InputGroupComponent id={`name`} type="text" value={user.name}
                                onChange={val => setUser({ ...user, name: val })}
                                required={true} label="Name" placeholder="Name" className="pl-9" />
                        </div>

                        <div className="relative flex w-full items-center">
                            <div className="p-3 top-[26px] absolute text-[#8390A2]">
                                <MdOutlineEmail className=" text-lg" />
                            </div>
                            <InputGroupComponent id={`email`} type="text" value={user.email}
                                onChange={val => setUser({ ...user, email: val })}
                                required={true} label="Email" placeholder="Email" className="pl-9" />
                        </div>

                        <div className="relative flex w-full items-center">
                            <div className="p-3 top-[26px] absolute text-[#8390A2]">
                                <GiPadlock className=" text-lg" />
                            </div>
                            <InputGroupComponent id={`password`} type={showPassword ? `text` : `password`} value={user.password}
                                onChange={val => setUser({ ...user, password: val })}
                                required={true} label="Password" placeholder="Password" className="pl-9" />
                            <div className="cursor-pointer rounded-r-md p-3 top-6 absolute right-0" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <IoEyeSharp className="text-[#8390A2] text-lg" /> :
                                    <HiEyeSlash className="text-[#8390A2] text-lg" />
                                }
                            </div>
                        </div>

                        <div className="flex items-center gap-2">

                            <div className="relative flex w-full items-center">
                                <div className="p-3 top-[26px] absolute text-[#8390A2]">
                                    <SiGooglemaps className=" text-lg" />
                                </div>
                                <InputGroupComponent id={`alamat`} type="text" value={user.alamat}
                                    onChange={val => setUser({ ...user, alamat: val })}
                                    required={true} label="Alamat" placeholder="Alamat" className="pl-9" />
                            </div>

                            <div className="relative flex w-full items-center">
                                <div className="p-3 top-[26px] absolute text-[#8390A2]">
                                    <BsFillTelephoneForwardFill className=" text-lg" />
                                </div>
                                <InputGroupComponent id={`telephone`} type="text" value={user.telephone}
                                    onChange={val => setUser({ ...user, telephone: val })}
                                    required={true} label="Telephone" placeholder="+62xxx" className="pl-9" />
                            </div>

                        </div>


                        <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
                            label="Upload Picture" onChange={f => setFile(f)} required={false} />

                        <button
                            type="submit" className="mt-3 bg-[#2E8B57] text-white py-2 rounded font-bold cursor-pointer">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
