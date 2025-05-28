import React from "react";

export default function PlantGuidePreview() {
    return (
        <div className="min-h-screen bg-[#1E1E1E]">
            <div className="bg-white py-6 px-6">
                <div className="max-w-md mb-6">
                    <input
                        type="text" placeholder="Search" className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#2E8B57]"
                    />
                </div>

                <div className="bg-gray-800 rounded-lg w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg" fill="#FF0000" viewBox="0 0 24 24" width="60" height="60"
                    >
                        <path d="M10 15l5.19-3L10 9v6z" />
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C15.2 4 12 4 12 4h-.1s-3.2 0-6.7.3c-.5.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2 9.1 2 11v2c0 1.9.2 3.8.2 3.8s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.1 7.6.3 7.6.3s3.2 0 6.7-.3c.5-.1 1.3-.1 2-.9.6-.6.8-2 .8-2S22 14.9 22 13v-2c0-1.9-.4-3.8-.4-3.8z" />
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto mt-4">
                    <h2 className="text-xl font-semibold text-black">Lorem Ipsum</h2>
                    <p className="text-gray-700 mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                        sapien non tellus congue efficitur.
                    </p>
                </div>
            </div>
        </div>
    );
}
