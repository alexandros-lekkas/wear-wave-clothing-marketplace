import React from 'react';
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react';

// App views from AppShell
type View = 'feed' | 'product' | 'profile' | 'cart';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="border-t border-gray-200 bg-white shadow-md z-10 w-full">
      <div className="flex h-16 items-center justify-around">
        <NavButton 
          icon={<Home className="h-6 w-6" />}
          label="Home"
          isActive={currentView === 'feed'}
          onClick={() => onNavigate('feed')}
        />
        
        <NavButton 
          icon={<Search className="h-6 w-6" />}
          label="Discover"
          isActive={false}
          onClick={() => {}}
        />
        
        <NavButton 
          icon={<Heart className="h-6 w-6" />}
          label="Favorites"
          isActive={false}
          onClick={() => {}}
        />
        
        <NavButton 
          icon={<ShoppingBag className="h-6 w-6" />}
          label="Cart"
          isActive={currentView === 'cart'}
          onClick={() => onNavigate('cart')}
        />
        
        <NavButton 
          icon={<User className="h-6 w-6" />}
          label="Profile"
          isActive={currentView === 'profile'}
          onClick={() => onNavigate('profile')}
        />
      </div>
    </nav>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center"
      aria-label={label}
    >
      <div className={`mb-1 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? 'font-medium text-primary' : 'text-gray-500'}`}>
        {label}
      </span>
    </button>
  );
} 