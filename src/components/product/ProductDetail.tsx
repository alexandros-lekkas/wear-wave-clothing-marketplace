import React, { useState } from 'react';
import { ChevronLeft, Heart, Share2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ProductGallery } from './ProductGallery';

interface ProductDetailProps {
  productId: string;
  onSellerClick: (sellerId: string) => void;
  onBack: () => void;
}

export function ProductDetail({ productId, onSellerClick, onBack }: ProductDetailProps) {
  const { 
    getFeedItem, 
    likeProduct, 
    getIsProductLiked,
    addProductToCart
  } = useApp();
  
  const [quantity, setQuantity] = useState(1);
  
  const feedItem = getFeedItem(productId);
  
  // Handle if product not found
  if (!feedItem) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }
  
  const { product, seller } = feedItem;
  const isLiked = getIsProductLiked(product.id);
  
  // Handle quantity change
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    addProductToCart(product.id, quantity);
  };
  
  // Handle like
  const handleLike = () => {
    likeProduct(product.id);
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      }).catch(err => console.error('Could not share', err));
    }
  };
  
  return (
    <div className="h-full w-full overflow-y-auto bg-white pb-16">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute left-4 top-4 z-10 rounded-full bg-white p-2 shadow-md"
        aria-label="Go back"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {/* Product gallery */}
      <div className="h-96 w-full sm:h-[450px]">
        <ProductGallery images={product.images} title={product.title} />
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <span className="text-2xl font-bold text-primary">${product.price}</span>
        </div>
        
        {/* Category & tags */}
        <div className="mt-2 flex flex-wrap items-center space-x-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {product.category}
          </span>
          {product.tags.map(tag => (
            <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Seller info */}
        <div 
          className="mt-4 flex items-center cursor-pointer" 
          onClick={() => onSellerClick(seller.id)}
        >
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img src={seller.avatar} alt={seller.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-2">
            <div className="font-medium">{seller.name}</div>
            <div className="text-xs text-gray-500">
              {seller.followersCount.toLocaleString()} followers
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-4">
          <h2 className="font-medium">Description</h2>
          <p className="mt-2 text-gray-700">{product.description}</p>
        </div>
        
        {/* Stats */}
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Heart className="mr-1 h-4 w-4" />
            <span>{product.likes} likes</span>
          </div>
          <div>
            <span>{product.views} views</span>
          </div>
        </div>
        
        {/* Actions bar */}
        <div className="mt-6 flex items-center space-x-3">
          {/* Quantity selector */}
          <div className="flex items-center rounded-lg border border-gray-300">
            <button 
              onClick={decreaseQuantity}
              className="px-3 py-2"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="px-3 py-2"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          {/* Like button */}
          <button
            onClick={handleLike}
            className={`rounded-full border p-2.5 ${
              isLiked ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          
          {/* Share button */}
          <button
            onClick={handleShare}
            className="rounded-full border border-gray-300 p-2.5"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-lg bg-primary py-3 font-medium text-white shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingBag className="mr-2 inline-block h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 