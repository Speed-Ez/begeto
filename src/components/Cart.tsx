import { Globe, ChevronLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { CartItem, PageType } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CartProps = {
  cartItems: CartItem[];
  onNavigate: (page: PageType) => void;
  onUpdateItem: (productId: string, updates: Partial<CartItem>) => void;
  onRemoveItem: (productId: string) => void;
};

export function Cart({ cartItems, onNavigate, onUpdateItem, onRemoveItem }: CartProps) {
  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = selectedItems.length > 0 ? 15 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const toggleSelectItem = (productId: string) => {
    const item = cartItems.find(i => i.productId === productId);
    if (item) {
      onUpdateItem(productId, { selected: !item.selected });
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      onUpdateItem(productId, { quantity: newQuantity });
    }
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    cartItems.forEach(item => {
      onUpdateItem(item.productId, { selected: !allSelected });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Globe className="w-8 h-8 text-purple-600" />
            <span className="text-purple-600">Begeto</span>
          </div>
          <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
            Continue Shopping
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Button variant="ghost" onClick={() => onNavigate('marketplace')} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Shopping
        </Button>

        <h1 className="text-gray-900 mb-8">Shopping Cart ({cartItems.length} items)</h1>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Discover unique fashion pieces from makers around the world</p>
            <Button onClick={() => onNavigate('marketplace')}>
              Start Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  <Checkbox
                    checked={cartItems.every(item => item.selected)}
                    onCheckedChange={toggleSelectAll}
                  />
                  <span className="text-gray-900">
                    Select All ({selectedItems.length}/{cartItems.length} selected)
                  </span>
                </div>

                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={item.productId} className="flex gap-4 pb-6 border-b last:border-b-0">
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={() => toggleSelectItem(item.productId)}
                        className="mt-1"
                      />
                      
                      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className="text-gray-900 line-clamp-1">{item.product.name}</h3>
                            <p className="text-gray-600 mt-1">{item.product.maker}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline">{item.product.country}</Badge>
                              {item.selectedPattern !== 'original' && (
                                <Badge variant="secondary">Custom Pattern</Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-900">${item.product.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-gray-900 w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.productId)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            {selectedItems.length > 0 && (
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h3 className="text-gray-900 mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({selectedItems.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full mb-3"
                    onClick={() => onNavigate('checkout')}
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="space-y-2 text-gray-600 pt-4 border-t">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Free returns within 30 days
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Secure checkout
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Ships worldwide
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
