export type Product = {
  id: string;
  name: string;
  maker: string;
  makerId: string;
  country: string;
  price: number;
  image: string;
  description: string;
  category: string;
  culturalContext: string;
  featured?: boolean;
  trending?: boolean;
  customMade?: boolean;
};

export type Creator = {
  id: string;
  name: string;
  country: string;
  region: string;
  bio: string;
  avatar: string;
  coverImage: string;
  specialties: string[];
  productsCount: number;
  rating: number;
  joinedDate: string;
};

export type CartItem = {
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedPattern?: string;
  customizations?: {
    chest?: number;
    waist?: number;
    hips?: number;
    height?: number;
    size?: string;
  };
  selected: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'creator';
  avatar?: string;
};

export type PageType = 
  | 'home' 
  | 'marketplace' 
  | 'product' 
  | 'makers' 
  | 'cart' 
  | 'checkout'
  | 'auth'
  | 'creator-profile'
  | 'creator-dashboard';
