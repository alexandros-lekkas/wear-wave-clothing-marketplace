import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Product } from '../../lib/types';
import { useApp } from '../../contexts/AppContext';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const { addProductToCart, removeProductFromCart } = useApp();
  
  // Calculate item total
  const itemTotal = product.price * quantity;
  
  // Increase quantity
  const increaseQuantity = () => {
    addProductToCart(product.id, 1);
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      addProductToCart(product.id, -1);
    } else {
      removeProductFromCart(product.id);
    }
  };
  
  // Remove item
  const removeItem = () => {
    removeProductFromCart(product.id);
  };
  
  return (
    <div className="mb-4 flex items-start border-b pb-4">
      {/* Product image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="ml-3 flex-1">
        <h3 className="line-clamp-1 font-medium">{product.title}</h3>
        <div className="mt-1 text-sm text-gray-500">
          <span>Category: {product.category}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-primary">${product.price}</span>
          
          {/* Quantity controls */}
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              onClick={decreaseQuantity}
              className="px-2 py-1"
              aria-label={quantity === 1 ? "Remove" : "Decrease quantity"}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-2 py-1"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Remove button */}
      <button
        onClick={removeItem}
        className="ml-2 text-gray-400 hover:text-red-500"
        aria-label="Remove from cart"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
} 