import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, ShoppingBag, Menu } from 'lucide-react';

interface NavBarProps {
  toggleCart: () => void;
}

export function NavBar({ toggleCart }: NavBarProps) {
  const { getCartItemCount } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartItemCount = getCartItemCount();
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <Menu className="h-6 w-6 text-gray-700 md:hidden" />
          <h1 className="text-xl font-bold text-primary">WearWave</h1>
        </div>
        
        {/* Search bar (expandable on mobile) */}
        <div className={`${isSearchOpen ? 'absolute inset-x-0 top-0 bg-white px-4 py-2' : 'hidden md:flex'} flex-1 max-w-xl mx-auto`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            
            {isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-2 text-sm font-medium text-primary"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        
        {/* Right controls */}
        <div className="flex items-center space-x-4">
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 md:hidden"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
          )}
          
          <button
            onClick={toggleCart}
            className="relative text-gray-700"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
} 