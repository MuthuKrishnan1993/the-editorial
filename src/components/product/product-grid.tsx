import type { Product } from "@/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  variant?: "grid" | "featured";
}

export function ProductGrid({ products, variant = "grid" }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
