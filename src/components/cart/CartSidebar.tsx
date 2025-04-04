import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CartItem } from './CartItem';
import { getProducts } from '../../lib/storage';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state } = useApp();
  
  // Get all products
  const products = getProducts();
  
  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Disable scrolling on body when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Calculate total
  const cartTotal = state.cart.reduce((total, cartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    return total + (product ? product.price * cartItem.quantity : 0);
  }, 0);
  
  // If cart is not open, don't render anything
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className={`absolute bottom-0 right-0 top-0 w-full max-w-md bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} sm:max-w-md`}>
        {/* Cart header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Cart items */}
        <div className="h-[calc(100%-13rem)] overflow-y-auto p-4">
          {state.cart.length === 0 ? (
            <div className="flex h-40 w-full flex-col items-center justify-center text-center">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-white"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            state.cart.map(item => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;
              
              return (
                <CartItem 
                  key={item.productId}
                  product={product}
                  quantity={item.quantity}
                />
              );
            })
          )}
        </div>
        
        {/* Cart footer */}
        {state.cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
            {/* Order summary */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Checkout button */}
            <button
              className="w-full rounded-lg bg-primary py-3 font-medium text-white shadow-sm"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 