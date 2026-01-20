import { useState } from 'react';
import { Globe, ChevronLeft, CreditCard, MapPin, Package, Check, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CartItem, PageType } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CheckoutProps = {
  cartItems: CartItem[];
  onNavigate: (page: PageType) => void;
};

export function Checkout({ cartItems, onNavigate }: CheckoutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = () => {
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    setStep(3);
  };

  const steps = [
    { number: 1, label: 'Shipping', icon: MapPin },
    { number: 2, label: 'Payment', icon: CreditCard },
    { number: 3, label: 'Review', icon: Package }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Globe className="w-8 h-8 text-purple-600" />
            <span className="text-purple-600">Begeto</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Lock className="w-4 h-4" />
            <span className="hidden md:inline">Secure Checkout</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Button variant="ghost" onClick={() => onNavigate('cart')} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Cart
        </Button>

        {/* Progress Steps */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isComplete = step > s.number;

              return (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
                        isComplete
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 hidden md:block ${
                        isActive || isComplete ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        isComplete ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card className="p-6 md:p-8">
                <h2 className="text-gray-900 mb-6">Shipping Information</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleShippingSubmit();
                  }}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      placeholder="123 Main St, Apt 4B"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        placeholder="NY"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        required
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6">
                    Continue to Payment
                  </Button>
                </form>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <Card className="p-6 md:p-8">
                <h2 className="text-gray-900 mb-6">Payment Information</h2>
                
                {/* Stripe Placeholder */}
                <div className="mb-6 p-6 bg-purple-50 border-2 border-purple-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    <h3 className="text-gray-900">Stripe Payment Integration</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    This is a placeholder for Stripe payment integration. In production, this would include:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Stripe Elements for secure card input
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Payment method selection (Card, Apple Pay, Google Pay)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      3D Secure authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Real-time validation
                    </li>
                  </ul>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePaymentSubmit();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        defaultValue="12/26"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        defaultValue="123"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                <Card className="p-6 md:p-8">
                  <h2 className="text-gray-900 mb-6">Review Your Order</h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-gray-900 mb-2">Shipping Address</h3>
                      <div className="text-gray-600">
                        <p>{shippingInfo.fullName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.country}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-gray-900 mb-2">Contact Information</h3>
                      <div className="text-gray-600">
                        <p>{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-gray-900 mb-2">Payment Method</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CreditCard className="w-4 h-4" />
                        <span>Card ending in 4242</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        alert('Order placed successfully! In production, this would process the payment and create the order.');
                        onNavigate('home');
                      }}
                      className="flex-1"
                    >
                      Place Order - ${total.toFixed(2)}
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 line-clamp-1">{item.product.name}</h4>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-gray-900">${item.product.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Lock className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <p className="text-green-600 mt-1">Your payment information is encrypted and secure</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
