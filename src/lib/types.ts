// User type representing sellers/creators
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followersCount: number;
  isVerified: boolean;
}

// Product type for clothing items
export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  likes: number;
  views: number;
}

// Feed item combining product and seller
export interface FeedItem {
  product: Product;
  seller: User;
}

// Cart item for shopping functionality
export interface CartItem {
  productId: string;
  quantity: number;
}

// App state for global state management
export interface AppState {
  currentUser: User | null;
  feed: FeedItem[];
  cart: CartItem[];
  likedProducts: Set<string>;
  followedSellers: Set<string>;
} 