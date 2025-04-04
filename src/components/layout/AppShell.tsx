import React, { useState } from 'react';
import { NavBar } from './NavBar';
import { BottomNav } from './BottomNav';
import { FeedContainer } from '../feed/FeedContainer';
import { ProductDetail } from '../product/ProductDetail';
import { UserProfile } from '../user/UserProfile';
import { CartSidebar } from '../cart/CartSidebar';
import { FeedItem } from '../../lib/types';

// App views
type View = 'feed' | 'product' | 'profile' | 'cart';

export function AppShell() {
  const [currentView, setCurrentView] = useState<View>('feed');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Change view handler
  const navigateTo = (view: View) => {
    setCurrentView(view);
    
    // Reset selection when switching views
    if (view !== 'product') {
      setSelectedProductId(null);
    }
    
    if (view !== 'profile') {
      setSelectedSellerId(null);
    }
    
    // Close cart when navigating elsewhere
    if (view !== 'cart') {
      setIsCartOpen(false);
    } else {
      setIsCartOpen(true);
    }
  };
  
  // View product details
  const viewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };
  
  // View user profile
  const viewProfile = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    setCurrentView('profile');
  };
  
  // Toggle cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) {
      setCurrentView('cart');
    }
  };
  
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50">
      {/* Top navbar */}
      <NavBar toggleCart={toggleCart} />
      
      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        {/* Feed view */}
        {currentView === 'feed' && (
          <FeedContainer onProductClick={viewProduct} onSellerClick={viewProfile} />
        )}
        
        {/* Product detail view */}
        {currentView === 'product' && selectedProductId && (
          <ProductDetail 
            productId={selectedProductId} 
            onSellerClick={viewProfile}
            onBack={() => navigateTo('feed')} 
          />
        )}
        
        {/* User profile view */}
        {currentView === 'profile' && selectedSellerId && (
          <UserProfile 
            sellerId={selectedSellerId} 
            onProductClick={viewProduct}
            onBack={() => navigateTo('feed')} 
          />
        )}
      </main>
      
      {/* Cart sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      
      {/* Bottom navigation */}
      <BottomNav 
        currentView={currentView}
        onNavigate={navigateTo} 
      />
    </div>
  );
} 