import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, FeedItem, User, Product, CartItem } from '../lib/types';
import { initializeStorage, getAppState, updateAppState, toggleLike, toggleFollow, addToCart, removeFromCart } from '../lib/storage';

// Define context type with state and methods
interface AppContextType {
  state: AppState;
  isLoading: boolean;
  likeProduct: (productId: string) => boolean;
  followSeller: (sellerId: string) => boolean;
  addProductToCart: (productId: string, quantity?: number) => void;
  removeProductFromCart: (productId: string) => void;
  getIsProductLiked: (productId: string) => boolean;
  getIsSellerFollowed: (sellerId: string) => boolean;
  getCartItemCount: () => number;
  getFeedItem: (productId: string) => FeedItem | undefined;
  refreshFeed: () => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  state: {
    currentUser: null,
    feed: [],
    cart: [],
    likedProducts: new Set<string>(),
    followedSellers: new Set<string>(),
  },
  isLoading: true,
  likeProduct: () => false,
  followSeller: () => false,
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  getIsProductLiked: () => false,
  getIsSellerFollowed: () => false,
  getCartItemCount: () => 0,
  getFeedItem: () => undefined,
  refreshFeed: () => {},
});

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize storage on mount
  useEffect(() => {
    const appState = getAppState();
    setState(appState);
    setIsLoading(false);
  }, []);

  // If state is null (initial load), show a loading indicator
  if (isLoading || !state) {
    return <div className="flex h-screen w-screen items-center justify-center">Loading...</div>;
  }

  // Like a product
  const likeProduct = (productId: string): boolean => {
    const isLiked = toggleLike(productId);
    setState(getAppState());
    return isLiked;
  };

  // Follow a seller
  const followSeller = (sellerId: string): boolean => {
    const isFollowed = toggleFollow(sellerId);
    setState(getAppState());
    return isFollowed;
  };

  // Add to cart
  const addProductToCart = (productId: string, quantity = 1) => {
    addToCart(productId, quantity);
    setState(getAppState());
  };

  // Remove from cart
  const removeProductFromCart = (productId: string) => {
    removeFromCart(productId);
    setState(getAppState());
  };

  // Check if product is liked
  const getIsProductLiked = (productId: string): boolean => {
    return state.likedProducts.has(productId);
  };

  // Check if seller is followed
  const getIsSellerFollowed = (sellerId: string): boolean => {
    return state.followedSellers.has(sellerId);
  };

  // Get total cart item count
  const getCartItemCount = (): number => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get feed item by product ID
  const getFeedItem = (productId: string): FeedItem | undefined => {
    return state.feed.find(item => item.product.id === productId);
  };

  // Refresh feed (randomize order)
  const refreshFeed = () => {
    const newState = { ...state };
    newState.feed = [...state.feed].sort(() => Math.random() - 0.5);
    setState(newState);
    updateAppState(newState);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        isLoading,
        likeProduct,
        followSeller,
        addProductToCart,
        removeProductFromCart,
        getIsProductLiked,
        getIsSellerFollowed,
        getCartItemCount,
        getFeedItem,
        refreshFeed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
} 