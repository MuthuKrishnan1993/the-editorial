export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'stripe' | 'razorpay' | 'cod';
  shippingAddress: Address;
  createdAt: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: SortOption;
}
