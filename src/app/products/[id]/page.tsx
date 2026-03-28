"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductById } from "@/lib/data";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = getProductById(id);
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [activeImage] = useState(0);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  if (!product) {
    return (
      <main className="pt-20 pb-32 px-6 flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-headline text-2xl font-bold text-[#4e211e] mb-4">Product not found</h1>
        <Link href="/products" className="text-[#a03a0f] font-semibold">
          Browse all products
        </Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem(product, product.sizes[selectedSize], product.colors[selectedColor].name);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <main className="pt-16 pb-32">
      {/* Image Carousel */}
      <section className="relative w-full aspect-[4/5] bg-[#ffedeb] overflow-hidden">
        <div className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {product.images.map((img, i) => (
            <div key={i} className="flex-none w-full h-full snap-center">
              <Image
                src={img}
                alt={`${product.name} - Image ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        {/* Pagination Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === activeImage ? "bg-[#4e211e]" : "bg-[#4e211e]/20"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Product Info Header */}
      <section className="px-6 mt-8">
        <div className="flex justify-between items-start mb-2">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-[#834d48] font-medium">
            {product.subcategory || product.category}
          </span>
          <div className="flex items-center gap-1">
            <span
              className="material-symbols-outlined text-sm text-[#a03a0f]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label text-xs font-semibold text-[#4e211e]">
              {product.rating}
            </span>
          </div>
        </div>
        <h2 className="font-headline text-3xl font-bold tracking-tight text-[#4e211e] leading-tight mb-2">
          {product.name}
        </h2>
        <p className="font-headline text-2xl font-medium text-[#a03a0f]">
          {formatPrice(product.price)}
        </p>
      </section>

      {/* Selectors Section */}
      <section className="px-6 mt-10 space-y-8">
        {/* Color Selector */}
        <div>
          <h3 className="font-label text-[10px] uppercase tracking-widest text-[#834d48] font-bold mb-4">
            Select Color:{" "}
            <span className="text-[#4e211e] ml-1">{product.colors[selectedColor].name}</span>
          </h3>
          <div className="flex gap-4">
            {product.colors.map((color, i) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(i)}
                className={`w-8 h-8 rounded-full transition-all ${
                  i === selectedColor
                    ? "ring-2 ring-[#a03a0f] ring-offset-2"
                    : "hover:ring-2 hover:ring-[#e09c95] hover:ring-offset-2"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-label text-[10px] uppercase tracking-widest text-[#834d48] font-bold">
              Select Size
            </h3>
            <button className="font-label text-[10px] uppercase tracking-widest text-[#a03a0f] font-bold border-b border-[#a03a0f]/30">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((size, i) => (
              <button
                key={size}
                onClick={() => setSelectedSize(i)}
                className={`py-3 text-sm font-medium rounded-xl transition-colors ${
                  i === selectedSize
                    ? "border-2 border-[#a03a0f] bg-white text-[#4e211e]"
                    : "border border-[#e09c95]/30 bg-white text-[#4e211e] hover:bg-[#ffedeb]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mt-10 space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 rounded-full bg-gradient-to-br from-[#fe7e4f] to-[#a03a0f] text-white font-headline font-bold text-base shadow-[0_8px_24px_-4px_rgba(160,58,15,0.3)] active:scale-[0.98] transition-all"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="w-full py-4 rounded-full bg-[#ffdad6] text-[#4e211e] font-headline font-bold text-base active:scale-[0.98] transition-all"
        >
          Buy Now
        </button>
      </section>

      {/* Description Accordion */}
      <section className="mt-12 border-t border-[#e09c95]/10">
        <button
          onClick={() => setDescriptionOpen(!descriptionOpen)}
          className="w-full px-6 py-6 flex justify-between items-center bg-[#ffedeb]/30"
        >
          <h3 className="font-headline font-bold text-sm tracking-tight">Product Description</h3>
          <span className="material-symbols-outlined text-[#834d48]">
            {descriptionOpen ? "expand_less" : "expand_more"}
          </span>
        </button>
        {descriptionOpen && (
          <div className="px-6 py-4">
            <p className="font-body text-sm leading-relaxed text-[#834d48]">
              {product.description}
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-3 text-xs font-medium text-[#4e211e]">
                <span className="w-1 h-1 rounded-full bg-[#a03a0f]" />
                100% Sustainable Organic Materials
              </li>
              <li className="flex items-center gap-3 text-xs font-medium text-[#4e211e]">
                <span className="w-1 h-1 rounded-full bg-[#a03a0f]" />
                Handmade in Italy
              </li>
              <li className="flex items-center gap-3 text-xs font-medium text-[#4e211e]">
                <span className="w-1 h-1 rounded-full bg-[#a03a0f]" />
                Dry clean only
              </li>
            </ul>
          </div>
        )}
        <div className="px-6 py-6 flex justify-between items-center border-t border-[#e09c95]/10">
          <h3 className="font-headline font-bold text-sm tracking-tight">Shipping & Returns</h3>
          <span className="material-symbols-outlined text-[#834d48]">chevron_right</span>
        </div>
      </section>
    </main>
  );
}
