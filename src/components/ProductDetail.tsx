import { useState } from 'react';
import { Globe, ChevronLeft, Camera, Palette, ShoppingCart, Sparkles, User, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Product, PageType, CartItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CustomizeModal } from './CustomizeModal';
import { ARTryOn } from './ARTryOn';

type ProductDetailProps = {
  product: Product;
  onNavigate: (page: PageType) => void;
  onAddToCart: (item: Omit<CartItem, 'selected'>) => void;
  cartItemsCount: number;
};

export function ProductDetail({ product, onNavigate, onAddToCart, cartItemsCount }: ProductDetailProps) {
  const [showARTryOn, setShowARTryOn] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [customColor, setCustomColor] = useState('#8B5CF6');
  const [brightness, setBrightness] = useState([100]);
  const [pattern, setPattern] = useState('original');
  const [customizations, setCustomizations] = useState<{
    chest?: number;
    waist?: number;
    hips?: number;
    height?: number;
    size?: string;
  }>({});

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      product,
      quantity: 1,
      selectedColor: customColor,
      selectedPattern: pattern,
      customizations
    });
    // Show success message or navigate to cart
  };

  const handleCheckout = () => {
    onAddToCart({
      productId: product.id,
      product,
      quantity: 1,
      selectedColor: customColor,
      selectedPattern: pattern,
      customizations
    });
    onNavigate('checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <Globe className="w-8 h-8 text-purple-600" />
              <span className="text-purple-600">Begeto</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => onNavigate('cart')}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Button variant="ghost" onClick={() => onNavigate('marketplace')} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Marketplace
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={{ filter: `brightness(${brightness[0]}%)` }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-gray-900">{product.country}</Badge>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button
                className="flex-1"
                onClick={() => setShowARTryOn(true)}
              >
                <Camera className="w-4 h-4 mr-2" />
                Try with AR
              </Button>
              <Button 
                className="flex-1" 
                variant="outline"
                onClick={() => setShowCustomize(true)}
              >
                <Palette className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-purple-600">${product.price}</span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Maker Info */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600">Made by</p>
                  <p className="text-gray-900">{product.maker}</p>
                  <p className="text-gray-600">{product.country}</p>
                </div>
              </div>
            </Card>

            {/* Cultural Context */}
            <Card className="p-6 bg-purple-50 border-purple-100">
              <h3 className="text-gray-900 mb-2">Cultural Story</h3>
              <p className="text-gray-600">{product.culturalContext}</p>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${product.price}
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={handleCheckout}>
                <CreditCard className="w-5 h-5 mr-2" />
                Checkout Now
              </Button>
            </div>

            {/* Info */}
            <div className="space-y-2 text-gray-600 border-t pt-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Custom-made to order</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Ships worldwide in 2-4 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR Try-On Modal */}
      <ARTryOn
        product={product}
        customColor={customColor}
        pattern={pattern}
        isOpen={showARTryOn}
        onClose={() => setShowARTryOn(false)}
      />

      {/* Customize Modal */}
      <CustomizeModal
        isOpen={showCustomize}
        onClose={() => setShowCustomize(false)}
        productName={product.name}
        category={product.category}
        customColor={customColor}
        setCustomColor={setCustomColor}
        pattern={pattern}
        setPattern={setPattern}
        brightness={brightness}
        setBrightness={setBrightness}
      />
    </div>
  );
}