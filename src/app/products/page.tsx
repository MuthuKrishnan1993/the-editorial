"use client";

import { products } from "@/lib/data";
import { ProductGrid } from "@/components/product/product-grid";
import { useFilterStore } from "@/stores/filter-store";

export default function ProductListingPage() {
  const { filters, setSortBy } = useFilterStore();

  const sortedProducts = [...products].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <main className="pt-20 pb-32 px-4 bg-[#fff4f3]">
      {/* Category Title & Result Count */}
      <div className="mb-6 flex flex-col gap-1">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#834d48]">
          Summer Collection
        </span>
        <h2 className="font-headline font-extrabold text-3xl text-[#4e211e] tracking-tight">
          New Arrivals
        </h2>
        <p className="font-body text-sm text-[#834d48]/70 italic">
          Showing {sortedProducts.length} items
        </p>
      </div>

      {/* Filter/Sort Bar */}
      <section className="mb-8 sticky top-16 z-40 bg-[#fff4f3]/95 backdrop-blur-sm -mx-4 px-4 py-3 flex gap-3">
        <button className="flex-1 flex items-center justify-between px-4 py-2.5 bg-[#ffedeb] rounded-xl font-label text-sm text-[#4e211e]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Filter</span>
          </div>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
        <button
          onClick={() => {
            const options = ["newest", "price-low", "price-high", "rating"] as const;
            const current = options.indexOf(filters.sortBy as typeof options[number]);
            const next = options[(current + 1) % options.length];
            setSortBy(next);
          }}
          className="flex-1 flex items-center justify-between px-4 py-2.5 bg-[#ffedeb] rounded-xl font-label text-sm text-[#4e211e]"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">swap_vert</span>
            <span>Sort</span>
          </div>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      </section>

      {/* Product Grid */}
      <ProductGrid products={sortedProducts} />
    </main>
  );
}
