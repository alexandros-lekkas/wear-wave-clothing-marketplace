import React from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { UserProducts } from './UserProducts';

interface UserProfileProps {
  sellerId: string;
  onProductClick: (productId: string) => void;
  onBack: () => void;
}

export function UserProfile({ sellerId, onProductClick, onBack }: UserProfileProps) {
  const { state, followSeller, getIsSellerFollowed } = useApp();
  
  // Find seller in users
  const seller = state.feed.find(item => item.seller.id === sellerId)?.seller;
  
  // Handle if seller not found
  if (!seller) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-gray-500">Seller not found</p>
      </div>
    );
  }
  
  const isFollowed = getIsSellerFollowed(seller.id);
  
  // Handle follow button click
  const handleFollow = () => {
    followSeller(seller.id);
  };
  
  // Filter products by this seller
  const sellerProducts = state.feed
    .filter(item => item.seller.id === sellerId)
    .map(item => item.product);
  
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
      
      {/* Profile header */}
      <div className="bg-gray-50 p-4 pb-6 pt-16">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
            <img 
              src={seller.avatar} 
              alt={seller.name}
              className="h-full w-full object-cover" 
            />
          </div>
          
          {/* Name and verification */}
          <div className="mt-3 flex items-center space-x-1">
            <h1 className="text-xl font-bold">{seller.name}</h1>
            {seller.isVerified && (
              <CheckCircle className="h-5 w-5 text-blue-500" />
            )}
          </div>
          
          {/* Bio */}
          <p className="mt-2 max-w-md text-center text-gray-600">
            {seller.bio}
          </p>
          
          {/* Stats */}
          <div className="mt-4 flex items-center space-x-6">
            <div className="text-center">
              <div className="font-bold">{sellerProducts.length}</div>
              <div className="text-sm text-gray-500">Products</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{seller.followersCount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>
          
          {/* Follow button */}
          <button
            onClick={handleFollow}
            className={`mt-4 rounded-full px-8 py-2 font-medium ${
              isFollowed
                ? 'border border-gray-300 bg-white text-gray-800'
                : 'bg-primary text-white'
            }`}
            aria-label={isFollowed ? "Unfollow" : "Follow"}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
      
      {/* Seller's products */}
      <div className="p-4">
        <h2 className="mb-4 text-lg font-bold">Products by {seller.name}</h2>
        <UserProducts products={sellerProducts} onProductClick={onProductClick} />
      </div>
    </div>
  );
} 