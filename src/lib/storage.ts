import { User, Product, CartItem, AppState } from './types';
import { generateMockUsers, generateMockProducts, generateMockFeed } from './mockData';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'wearwave_users',
  PRODUCTS: 'wearwave_products',
  STATE: 'wearwave_state',
};

// Initialize local storage with mock data if it doesn't exist
export function initializeStorage(): AppState {
  // Check if data exists
  const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  const existingProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  const existingState = localStorage.getItem(STORAGE_KEYS.STATE);
  
  if (existingUsers && existingProducts && existingState) {
    // Return existing state
    return JSON.parse(existingState);
  }
  
  // Generate mock data
  const users = generateMockUsers(20);
  const userIds = users.map(user => user.id);
  const products = generateMockProducts(userIds, 100);
  const feed = generateMockFeed(users, products);
  
  // Create initial state
  const initialState: AppState = {
    currentUser: null, // No user logged in initially
    feed,
    cart: [],
    likedProducts: new Set<string>(),
    followedSellers: new Set<string>(),
  };
  
  // Save to localStorage (convert Sets to arrays for storage)
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  localStorage.setItem(
    STORAGE_KEYS.STATE, 
    JSON.stringify({
      ...initialState,
      likedProducts: Array.from(initialState.likedProducts),
      followedSellers: Array.from(initialState.followedSellers),
    })
  );
  
  return initialState;
}

// Get all users
export function getUsers(): User[] {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
}

// Get all products
export function getProducts(): Product[] {
  const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return products ? JSON.parse(products) : [];
}

// Get application state
export function getAppState(): AppState {
  const stateStr = localStorage.getItem(STORAGE_KEYS.STATE);
  
  if (!stateStr) {
    return initializeStorage();
  }
  
  const state = JSON.parse(stateStr);
  
  // Convert arrays back to Sets
  return {
    ...state,
    likedProducts: new Set(state.likedProducts),
    followedSellers: new Set(state.followedSellers),
  };
}

// Update application state
export function updateAppState(state: AppState): void {
  localStorage.setItem(
    STORAGE_KEYS.STATE,
    JSON.stringify({
      ...state,
      likedProducts: Array.from(state.likedProducts),
      followedSellers: Array.from(state.followedSellers),
    })
  );
}

// Add item to cart
export function addToCart(productId: string, quantity = 1): void {
  const state = getAppState();
  const existingItemIndex = state.cart.findIndex(item => item.productId === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    state.cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    state.cart.push({ productId, quantity });
  }
  
  updateAppState(state);
}

// Remove item from cart
export function removeFromCart(productId: string): void {
  const state = getAppState();
  state.cart = state.cart.filter(item => item.productId !== productId);
  updateAppState(state);
}

// Toggle product like
export function toggleLike(productId: string): boolean {
  const state = getAppState();
  
  if (state.likedProducts.has(productId)) {
    state.likedProducts.delete(productId);
  } else {
    state.likedProducts.add(productId);
  }
  
  updateAppState(state);
  return state.likedProducts.has(productId);
}

// Toggle following a seller
export function toggleFollow(sellerId: string): boolean {
  const state = getAppState();
  
  if (state.followedSellers.has(sellerId)) {
    state.followedSellers.delete(sellerId);
  } else {
    state.followedSellers.add(sellerId);
  }
  
  updateAppState(state);
  return state.followedSellers.has(sellerId);
} 