import React from 'react';
import { CheckCircle } from 'lucide-react';
import { User } from '../../lib/types';
import { useApp } from '../../contexts/AppContext';

interface SellerInfoProps {
  seller: User;
  onClick: () => void;
}

export function SellerInfo({ seller, onClick }: SellerInfoProps) {
  const { followSeller, getIsSellerFollowed } = useApp();
  const isFollowed = getIsSellerFollowed(seller.id);
  
  // Handle follow button click
  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    followSeller(seller.id);
  };
  
  // Handle seller profile click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  
  return (
    <div className="flex items-center space-x-2" onClick={handleClick}>
      {/* Seller avatar */}
      <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Seller info */}
      <div className="text-white">
        <div className="flex items-center space-x-1">
          <span className="font-medium">{seller.name}</span>
          {seller.isVerified && (
            <CheckCircle className="h-4 w-4 text-blue-400" />
          )}
        </div>
        <div className="text-xs text-gray-300">
          {seller.followersCount.toLocaleString()} followers
        </div>
      </div>
      
      {/* Follow button */}
      <button
        onClick={handleFollow}
        className={`ml-2 rounded-full px-3 py-1 text-xs font-medium ${
          isFollowed
            ? 'bg-white/20 text-white'
            : 'bg-white text-black'
        }`}
        aria-label={isFollowed ? "Unfollow" : "Follow"}
      >
        {isFollowed ? 'Following' : 'Follow'}
      </button>
    </div>
  );
} 