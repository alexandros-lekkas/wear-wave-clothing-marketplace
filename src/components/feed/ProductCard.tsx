import React from 'react';
import { Heart, Share2, ShoppingBag } from 'lucide-react';
import { FeedItem } from '../../lib/types';
import { useApp } from '../../contexts/AppContext';
import { SellerInfo } from './SellerInfo';

interface ProductCardProps {
  item: FeedItem;
  isActive: boolean;
  onProductClick: () => void;
  onSellerClick: () => void;
}

export function ProductCard({ item, isActive, onProductClick, onSellerClick }: ProductCardProps) {
  const { likeProduct, addProductToCart, getIsProductLiked } = useApp();
  const { product, seller } = item;
  
  const isLiked = getIsProductLiked(product.id);
  
  // Handle like button click
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeProduct(product.id);
  };
  
  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addProductToCart(product.id);
  };
  
  // Handle share
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      }).catch(err => console.error('Could not share', err));
    }
  };
  
  return (
    <div 
      className="relative flex h-full w-full flex-col bg-black"
      onClick={onProductClick}
      style={{ height: 'calc(100vh - 3.5rem - 4rem)' }}  /* Account for navbar (3.5rem) and bottom nav (4rem) */
    >
      {/* Product image as background */}
      <div className="absolute inset-0 bg-gray-900">
        {product.images.length > 0 && (
          <img 
            src={product.images[0]} 
            alt={product.title}
            className="h-full w-full object-cover opacity-95"
            loading="lazy"
          />
        )}
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>
      
      {/* Product info - positioned at bottom */}
      <div className="mt-auto p-4 z-10 text-white">
        {/* Seller info - now inside product info section */}
        <div className="mb-4">
          <SellerInfo seller={seller} onClick={onSellerClick} />
        </div>
        
        <h2 className="text-xl font-bold mb-1">{product.title}</h2>
        <p className="text-sm text-gray-200 line-clamp-2 mb-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">${product.price}</span>
            <div className="flex items-center mt-1 space-x-2">
              {product.tags.map(tag => (
                <span key={tag} className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart} 
            className="bg-primary text-white px-4 py-2 rounded-full flex items-center space-x-1"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-4 z-20">
        <button
          onClick={handleLike}
          className="rounded-full bg-black/40 p-2.5 backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
        
        <button
          onClick={handleShare}
          className="rounded-full bg-black/40 p-2.5 backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="Share"
        >
          <Share2 className="h-6 w-6 text-white" />
        </button>
      </div>
      
      {/* Stats overlay - views/likes */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-10">
        <div className="flex items-center space-x-1 bg-black/40 rounded-full px-2.5 py-1 backdrop-blur-sm text-xs text-white">
          <Heart className="h-3 w-3" />
          <span>{product.likes}</span>
        </div>
        
        <div className="flex items-center space-x-1 bg-black/40 rounded-full px-2.5 py-1 backdrop-blur-sm text-xs text-white">
          <span>{product.views}</span>
          <span>views</span>
        </div>
      </div>
    </div>
  );
} 