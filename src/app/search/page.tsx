"use client";

import { useState } from "react";
import Link from "next/link";

const recentSearches = ["Linen blazer", "Summer dress", "Leather tote", "Sneakers"];

const trendingItems = [
  "Heritage Linen Blazer",
  "Merino Crewneck",
  "Sculptural Heel",
  "Cashmere Cardigan",
  "Studio Sneaker",
];

const browseCategories = [
  {
    label: "Men's Wear",
    count: "126 items",
    icon: "man",
    gradient: "from-[#a03a0f]/80 to-[#902e02]/90",
  },
  {
    label: "Women's Wear",
    count: "184 items",
    icon: "woman",
    gradient: "from-[#a03833]/80 to-[#902c28]/90",
  },
  {
    label: "Accessories",
    count: "89 items",
    icon: "watch",
    gradient: "from-[#863c96]/80 to-[#5e136f]/90",
  },
  {
    label: "Footwear",
    count: "67 items",
    icon: "steps",
    gradient: "from-[#4e3b31]/80 to-[#2a1f19]/90",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recentList, setRecentList] = useState(recentSearches);

  return (
    <main className="pt-20 pb-32 px-6">
      {/* Search Header */}
      <div className="fixed top-0 w-full max-w-[430px] left-1/2 -translate-x-1/2 z-50 bg-[#fff4f3]/80 backdrop-blur-xl flex items-center gap-3 px-6 h-16">
        <Link href="/" className="text-[#4e211e] hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#834d48] text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search essentials..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#ffedeb] border-none rounded-full pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#a03a0f] outline-none text-[#4e211e] placeholder-[#834d48]/50"
          />
        </div>
      </div>

      {/* Recent Searches */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline font-bold text-lg text-[#4e211e]">Recent Searches</h2>
          <button
            onClick={() => setRecentList([])}
            className="text-xs font-semibold text-[#a03a0f]"
          >
            Clear All
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentList.length === 0 ? (
            <p className="text-sm text-[#834d48] italic">No recent searches</p>
          ) : (
            recentList.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-4 py-2 bg-[#ffedeb] rounded-full text-sm text-[#834d48] font-medium transition-colors hover:bg-[#ffc7c1]"
              >
                {term}
              </button>
            ))
          )}
        </div>
      </section>

      {/* Trending Searches */}
      <section className="mb-10">
        <h2 className="font-headline font-bold text-lg text-[#4e211e] mb-4">Trending Now</h2>
        <div className="space-y-0">
          {trendingItems.map((item, i) => (
            <div
              key={item}
              className={`flex items-center gap-4 py-3.5 cursor-pointer hover:bg-[#ffedeb]/50 -mx-2 px-2 rounded-lg transition-colors ${
                i < trendingItems.length - 1 ? "border-b border-[#e09c95]/10" : ""
              }`}
              onClick={() => setQuery(item)}
            >
              <span className="font-headline font-extrabold text-[#a03a0f]/40 text-lg w-6 text-center">
                {i + 1}
              </span>
              <span className="material-symbols-outlined text-[#a03a0f] text-xl">
                trending_up
              </span>
              <span className="text-sm font-medium text-[#4e211e]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <section>
        <h2 className="font-headline font-bold text-lg text-[#4e211e] mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {browseCategories.map((cat) => (
            <Link
              key={cat.label}
              href="/products"
              className="relative h-32 rounded-xl overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
              <div className="relative z-10 flex flex-col justify-end h-full p-4">
                <span className="material-symbols-outlined text-white/70 text-3xl mb-1">
                  {cat.icon}
                </span>
                <span className="font-headline font-bold text-white text-sm">{cat.label}</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
