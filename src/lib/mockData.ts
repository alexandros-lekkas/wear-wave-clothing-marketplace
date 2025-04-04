import { User, Product } from './types';

// Generate random users
export function generateMockUsers(count = 20): User[] {
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      id: `user-${i + 1}`,
      name: `Seller ${i + 1}`,
      avatar: `https://avatars.githubusercontent.com/u/${10000 + i}?v=4`,
      bio: `Independent designer creating unique clothing since ${2015 + (i % 7)}.`,
      followersCount: Math.floor(Math.random() * 10000),
      isVerified: Math.random() > 0.7,
    });
  }
  
  return users;
}

// Clothing categories
const CATEGORIES = [
  'Tops', 'Dresses', 'Bottoms', 'Outerwear', 
  'Accessories', 'Footwear', 'Sustainable', 'Vintage'
];

// Generate tags for products
const TAGS = [
  'handmade', 'eco-friendly', 'vintage', 'plus-size', 
  'limited-edition', 'summer', 'winter', 'fall', 
  'spring', 'unisex', 'casual', 'formal', 'bohemian', 
  'minimalist', 'streetwear', 'festival', 'athleisure', 'party'
];

// Product images (use placeholder images)
function getRandomImages(category: string): string[] {
  const width = 600;
  const height = 800;
  const categoryId = CATEGORIES.indexOf(category) + 1;
  const imageCount = Math.floor(Math.random() * 3) + 1;
  
  return Array(imageCount).fill(0).map((_, idx) => 
    `https://picsum.photos/seed/${categoryId}-${idx}/600/800`
  );
}

// Generate random products
export function generateMockProducts(userIds: string[], count = 100): Product[] {
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const randomTags = [...TAGS]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 1);
    
    products.push({
      id: `product-${i + 1}`,
      sellerId: userIds[Math.floor(Math.random() * userIds.length)],
      title: `${['Stylish', 'Vintage', 'Designer', 'Handcrafted', 'Premium'][i % 5]} ${category} Item ${i + 1}`,
      description: `Beautifully crafted ${category.toLowerCase()} piece perfect for any occasion. Made with high-quality materials and attention to detail.`,
      price: Math.floor(Math.random() * 200) + 15,
      images: getRandomImages(category),
      category,
      tags: randomTags,
      likes: Math.floor(Math.random() * 500),
      views: Math.floor(Math.random() * 2000) + 500,
    });
  }
  
  return products;
}

// Generate mock feed items combining products and sellers
export function generateMockFeed(users: User[], products: Product[]) {
  return products.map(product => {
    const seller = users.find(user => user.id === product.sellerId)!;
    return { product, seller };
  }).sort(() => Math.random() - 0.5); // Shuffle for realistic feed
} 