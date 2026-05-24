import { useState } from 'react';
import { Home } from './components/Home';
import { Marketplace } from './components/Marketplace';
import { ProductDetail } from './components/ProductDetail';
import { Makers } from './components/Makers';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Auth } from './components/Auth';
import { CreatorProfile } from './components/CreatorProfile';
import { CreatorDashboard } from './components/CreatorDashboard';
import { Product, Creator, CartItem, User, PageType } from './types';
import { MOCK_CREATORS } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleCreatorSelect = (creatorId: string) => {
    const creator = MOCK_CREATORS.find(c => c.id === creatorId);
    if (creator) {
      setSelectedCreator(creator);
      setCurrentPage('creator-profile');
    }
  };

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  const addToCart = (item: Omit<CartItem, 'selected'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.productId === item.productId);
      if (existingItem) {
        return prev.map(i => 
          i.productId === item.productId 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item, selected: true }];
    });
  };

  const updateCartItem = (productId: string, updates: Partial<CartItem>) => {
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId ? { ...item, ...updates } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'creator') {
      setCurrentPage('creator-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'home' && (
        <Home 
          onNavigate={navigateTo} 
          onProductSelect={handleProductSelect}
          onCreatorSelect={handleCreatorSelect}
          cartItemsCount={cartItems.length}
        />
      )}
      {currentPage === 'marketplace' && (
        <Marketplace 
          onProductSelect={handleProductSelect} 
          onNavigate={navigateTo}
          cartItemsCount={cartItems.length}
        />
      )}
      {currentPage === 'product' && selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onNavigate={navigateTo}
          onAddToCart={addToCart}
          cartItemsCount={cartItems.length}
        />
      )}
      {currentPage === 'makers' && (
        <Makers 
          onNavigate={navigateTo}
          onCreatorSelect={handleCreatorSelect}
          cartItemsCount={cartItems.length}
        />
      )}
      {currentPage === 'cart' && (
        <Cart
          cartItems={cartItems}
          onNavigate={navigateTo}
          onUpdateItem={updateCartItem}
          onRemoveItem={removeFromCart}
        />
      )}
      {currentPage === 'checkout' && (
        <Checkout
          cartItems={cartItems.filter(item => item.selected)}
          onNavigate={navigateTo}
        />
      )}
      {currentPage === 'auth' && (
        <Auth
          onNavigate={navigateTo}
          onLogin={handleLogin}
        />
      )}
      {currentPage === 'creator-profile' && selectedCreator && (
        <CreatorProfile
          creator={selectedCreator}
          onNavigate={navigateTo}
          onProductSelect={handleProductSelect}
          cartItemsCount={cartItems.length}
        />
      )}
      {currentPage === 'creator-dashboard' && user?.role === 'creator' && (
        <CreatorDashboard
          user={user}
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
}
