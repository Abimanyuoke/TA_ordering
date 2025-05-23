"use client";

import Image from "next/image";
import imgLanding from "@/public/image/img - landing.png"
import imgLogo from "@/public/image/img - logo.png"

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <header className="flex justify-between items-center p-4 pl-13 bg-[#FAFAD2]">
        <div className="flex items-center gap-2">
          <Image
            src={imgLogo} alt="logo of Plantify" width={40} height={40} className="max-w-full" />
          <div className="text-3xl font-bold items-center text-[#2E8B57]">Plantify</div>
        </div>

        <div className="flex items-center gap-8 ml-auto">
          <nav className="hidden md:flex items-center gap-4 text-[#333333] font-bold">
            <a href="#about">About Us</a>
            <a href="#features">Features</a>
            <span>|</span>
          </nav>

          <div className="flex gap-4">
            <button className="w-32 border font-bold bg-white border-[#2E8B57] text-[#2E8B57] px-4 py-2 rounded-lg hover:bg-green-50 transition">
              Sign Up
            </button>
            <button className="w-32 bg-[#2E8B57] font-bold text-white px-4 py-2 rounded-lg hover:bg-[#276f48] transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <section className="grid md:grid-cols-2 gap-8 p-10 items-center bg-white">
        <div>
          <h1 className="text-5xl font-bold text-[#333333] mb-4">
            Plant, Nurture, and <br /> Be Happy with the <br /> Plants of Your Choice
          </h1>
          <p className="text-[#333333] mb-6">
            Some people still have limited knowledge in caring for plants, even
            though plants play an important role in creating a healthy
            environment. Plantify comes as a solution by providing information,
            practical solutions, and quality tools and materials to help care
            for plants at home.
          </p>
          <button className="w-full font-bold bg-[#2E8B57] text-white px-6 py-3 rounded-lg hover:bg-[#2E8B57] transition">
            Join Us
          </button> 
          {/* ini aslinya mau dibikin ky di figma, tp ternyata jelek jadinya. klo mo disamain, coba otakatik gpp */}
        
        </div>
        <div className="flex justify-center">
          <Image
            src={imgLanding} alt="Illustration of a woman taking care of plants"
            width={600} height={600} className="max-w-full" />
        </div>
      </section>

      <section id="about" className="relative bg-[#333333] text-white py-20 px-6 md:px-20 overflow-hidden">
        <div className="grid md:grid-cols-2 p-10 items-center gap-10 relative z-10">

          <div className="flex items-start gap-6">
            <Image
              src={imgLogo} alt="Plantify Logo" width={150} height={150} className="shrink-0" />

            <div>
              <h2 className="text-5xl p-1.5 font-extrabold text-[#2E8B57] mb-2">
                About <span className="text-[#FAFAD2]">Us</span>
              </h2>
              <p className="text-[#2E8B57] leading-relaxed max-w-xl">
                Welcome to Plantify, a one-stop platform that provides information, care solutions,
                and quality products to support your gardening hobby. With a focus on education,
                plant troubleshooting, and supplying tools and planting materials, Plantify helps you
                make caring for your plants easier and more sustainable.
              </p>
            </div>
          </div>

          <div className="hidden md:block absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 opacity-10 z-0">
            <Image
              src={imgLogo} alt="Decorative Leaf" width={500} height={500} />
          </div>
        </div>
      </section>

      <section id="features" className="bg-white text-[#333333] py-20 px-6 md:px-20">
        <h2 className="text-5xl font-bold  mb-12 text-[#333333]">
          Features We Provide
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-3xl font-bold text-[#2E8B57] mb-2">
              Interactive Plant Guides
            </h3>
            <p className="text-[#333333] text-xl">
              Provides comprehensive information on different types of plants,
              including care, light requirements, and fertilization.
            </p>
          </div>

          <div>
            <h3 className="text-3xl pt-40 font-bold text-[#2E8B57] mb-2">
              Plant Related Articles and News
            </h3>
            <p className="text-[#333333] text-xl">
              The latest articles on gardening trends, new research in agriculture,
              or seasonal plant care tips.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#2E8B57] mb-2">
              Gardening Tools and Materials Marketplace
            </h3>
            <p className="text-[#333333] text-xl">
              Platform for buying and selling gardening tools and plant materials,
              such as pots, soil, fertilizers, and seeds. Provides a filter
              feature to search for products by category or price.
            </p>
          </div>

          <div>
            <h3 className="text-3xl pt-40 font-bold text-[#2E8B57] mb-2">
              Integrated YouTube Tutorials
            </h3>
            <p className="text-[#333333] text-xl">
              Provides a list of tutorial videos from YouTube integrated with
              specific pages on the web. Users can easily find tutorials for
              planting, caring, or troubleshooting plant-related issues.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-[#333333] pl-20 text-white py-6">
        © Copyright Plantify 2025
      </footer>
    </div>
  );
}
