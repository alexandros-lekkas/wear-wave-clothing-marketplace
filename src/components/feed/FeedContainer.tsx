import React, { useEffect, useRef, useState } from 'react';
import { ProductCard } from './ProductCard';
import { useApp } from '../../contexts/AppContext';
import { FeedItem } from '../../lib/types';

interface FeedContainerProps {
  onProductClick: (productId: string) => void;
  onSellerClick: (sellerId: string) => void;
}

export function FeedContainer({ onProductClick, onSellerClick }: FeedContainerProps) {
  const { state, refreshFeed } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  
  // Get feed from state
  const feed = state.feed;
  
  // Pull to refresh functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };
  
  const handleTouchEnd = () => {
    // Pull down gesture detection (for refresh)
    if (touchStartY.current - touchEndY.current < -100 && currentIndex === 0) {
      refreshFeed();
    }
  };
  
  // Scroll handler to determine current product card
  const handleScroll = () => {
    if (!feedRef.current || isScrolling) return;
    
    const container = feedRef.current;
    const containerHeight = container.clientHeight;
    const scrollPosition = container.scrollTop;
    
    // Determine which product card is most visible
    const index = Math.floor(scrollPosition / containerHeight);
    setCurrentIndex(Math.min(index, feed.length - 1));
  };
  
  // Smooth scroll to a specific item
  const scrollToItem = (index: number) => {
    if (!feedRef.current) return;
    
    setIsScrolling(true);
    const container = feedRef.current;
    
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: 'smooth',
    });
    
    // Update index after scrolling completes
    setTimeout(() => {
      setCurrentIndex(index);
      setIsScrolling(false);
    }, 500);
  };
  
  return (
    <div 
      ref={feedRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {feed.map((item, index) => (
        <div 
          key={item.product.id} 
          className="h-full w-full snap-start snap-always"
        >
          <ProductCard
            item={item}
            isActive={currentIndex === index}
            onProductClick={() => onProductClick(item.product.id)}
            onSellerClick={() => onSellerClick(item.seller.id)}
          />
        </div>
      ))}
      
      {/* Empty state */}
      {feed.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-gray-500">
            No items found. Pull down to refresh.
          </p>
        </div>
      )}
      
      {/* Pagination indicators (mobile only) */}
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col space-y-1 md:hidden">
        {feed.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToItem(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 