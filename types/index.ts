export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number; // percentage, e.g. 15
  rating: number; // e.g. 4.8
  reviewsCount: number;
  stock: 'In Stock' | 'Low Stock' | 'Out of Stock';
  images: string[];
  description: string;
  specifications: Record<string, string>;
  features: string[];
  warranty: string;
  deliveryInfo: string;
  sku?: string;
  datasheet?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onlyInStock: boolean;
  voltage?: string;
  current?: string;
  protocol?: string;
  sensorType?: string;
  boardType?: string;
  operatingTemp?: string;
  packageType?: string;
  application?: string;
  industry?: string;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'discount-desc';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  featured: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
