import React from 'react';
import { Product } from '../../lib/types';

interface UserProductsProps {
  products: Product[];
  onProductClick: (productId: string) => void;
}

export function UserProducts({ products, onProductClick }: UserProductsProps) {
  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-50">
        <p className="text-gray-500">No products yet</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <div
          key={product.id}
          className="group cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition-transform hover:scale-[1.02]"
          onClick={() => onProductClick(product.id)}
        >
          {/* Product image */}
          <div className="aspect-square overflow-hidden">
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <span className="text-sm text-gray-400">No image</span>
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div className="p-2">
            <h3 className="line-clamp-1 font-medium">{product.title}</h3>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-bold text-primary">${product.price}</span>
              <span className="text-xs text-gray-500">{product.likes} likes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 