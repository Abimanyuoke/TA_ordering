import React from "react"

export default function News() {
    return (
        <div className="min-h-screen bg-[#1E1E1E]">
            <div className="bg-white py-6 px-6">
                <div className="max-w-md mb-6">
                    <input
                        type="text" placeholder="Search" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#2E8B57]"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-gray-800 rounded-lg h-48 w-full max-w-sm flex flex-col justify-center px-4 py-3 shadow-md">
                                <h3 className="text-white text-lg font-semibold pt-20">Lorem Ipsum</h3>
                                <p className="text-gray-300 text-sm mt-1">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}