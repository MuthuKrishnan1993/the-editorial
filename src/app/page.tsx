"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/product/product-grid";

const featuredProducts = products.filter((p) => p.featured);

const categories = [
  { icon: "man", label: "Men" },
  { icon: "woman", label: "Women" },
  { icon: "watch", label: "Accessories" },
  { icon: "steps", label: "Shoes" },
  { icon: "child_care", label: "Kids" },
];

export default function HomePage() {
  return (
    <main className="pt-16 pb-32">
      {/* Hero Section */}
      <section className="relative px-6 py-8">
        <div className="relative h-[480px] w-full rounded-xl overflow-hidden shadow-none group transition-transform duration-200 ease-out active:scale-95">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyaNt_phNsjkg_JOz03bNRKavDX3KdAsuLc-yf0bF1fWLRcpbsZDkvlGz1PufjPgvCQpkh_wW_9B4vBoufGbZzjqwfczT7s9v5dqmD3UqbQgcJ9nbk_Adue-Z9-7-_DhOcFgyvG9vumruNBz-IfLsFIAtAfNC-KBmX_F4OPEQypzrjdf1UGc6axK5vqDBjjYVsERa5mwaXreZ-b9fFRDPxX_GD3SCQfwP17dZbP_sSPcIAhL7TvgaUH_i32S2UBzQhE18fmc1Paw"
            alt="Modern minimalist interior with sustainable linen clothing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4e211e]/60 to-transparent" />
          <div className="absolute bottom-10 left-8 right-8">
            <p className="font-label text-white/80 text-xs uppercase tracking-widest mb-2">
              New Season
            </p>
            <h1 className="font-headline text-4xl text-white font-extrabold tracking-tighter leading-none mb-6">
              The Art of <br />
              Essentialism
            </h1>
            <Link
              href="/products"
              className="bg-gradient-to-br from-[#fe7e4f] to-[#a03a0f] text-white px-8 py-3.5 rounded-full font-label font-semibold shadow-lg hover:opacity-90 transition-all inline-flex items-center gap-2"
            >
              Shop Now
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 overflow-hidden">
        <div className="px-6 mb-4 flex justify-between items-end">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-[#4e211e]">
            Categories
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href="/products"
              className="flex-shrink-0 flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 rounded-full bg-[#ffedeb] flex items-center justify-center transition-colors active:bg-[#ffc7c1]">
                <span className="material-symbols-outlined text-3xl text-[#a03a0f]">
                  {cat.icon}
                </span>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest font-semibold text-[#834d48]">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-6 py-10 bg-[#ffedeb]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#a03a0f] font-bold">
              Curated Selection
            </span>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-[#4e211e]">
              Trending Now
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[#a03a0f] font-label text-sm font-semibold flex items-center gap-1"
          >
            View All
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </div>
        <ProductGrid products={featuredProducts} variant="featured" />
      </section>

      {/* Newsletter */}
      <section className="px-6 py-12 bg-[#fff4f3]">
        <div className="rounded-3xl bg-[#240303] p-10 flex flex-col items-center text-center">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#ce8c86] mb-4">
            Editorial Circle
          </span>
          <h3 className="font-headline text-2xl font-bold text-white mb-4 leading-tight">
            Get 15% off your first <br />
            boutique order
          </h3>
          <div className="w-full max-w-xs mt-4">
            <div className="relative flex items-center bg-white/10 rounded-full p-1.5 backdrop-blur-md">
              <input
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-[#ce8c86] px-4 py-2 w-full text-sm"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-white text-[#4e211e] px-6 py-2 rounded-full font-label text-xs font-bold uppercase tracking-widest transition-transform active:scale-95">
                Join
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
