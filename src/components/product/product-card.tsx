"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "featured";
}

export function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  const hydrated = useHydrated();
  const { toggle, items } = useWishlistStore();
  const isWishlisted = hydrated && items.includes(product.id);
  const isNew = product.tags.includes("new");

  return (
    <Link href={`/products/${product.id}`} className="flex flex-col group cursor-pointer">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white transition-all duration-300 group-hover:scale-[1.02]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 50vw, 200px"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm z-10"
        >
          <span
            className={`material-symbols-outlined text-sm ${
              isWishlisted ? "text-red-500" : "text-[#4e211e]"
            }`}
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>
        {isNew && (
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#a03a0f] text-white text-[10px] font-bold uppercase rounded-sm">
            New
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-label text-[10px] uppercase tracking-widest text-[#834d48]">
          {product.category}
        </span>
        <h3 className="font-headline font-bold text-[#4e211e] text-sm leading-snug">
          {product.name}
        </h3>
        {variant === "grid" && (
          <div className="flex items-center gap-1 my-1">
            <span
              className="material-symbols-outlined text-[#ed7244] text-[12px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label text-[11px] font-semibold text-[#4e211e]">
              {product.rating}
            </span>
          </div>
        )}
        <p className="font-headline font-extrabold text-lg text-[#a03a0f] mt-auto">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
