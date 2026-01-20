import { Globe, Sparkles, Shirt, ArrowRight, ShoppingCart, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Product, PageType } from '../types';
import { MOCK_PRODUCTS, MOCK_CREATORS } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

type HomeProps = {
  onNavigate: (page: PageType) => void;
  onProductSelect: (product: Product) => void;
  onCreatorSelect: (creatorId: string) => void;
  cartItemsCount: number;
};

export function Home({ onNavigate, onProductSelect, onCreatorSelect, cartItemsCount }: HomeProps) {
  const [creatorScrollPosition, setCreatorScrollPosition] = useState(0);
  
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured).slice(0, 3);
  const trendingProducts = MOCK_PRODUCTS.filter(p => p.trending).slice(0, 6);
  const customMadeProducts = MOCK_PRODUCTS.filter(p => p.customMade).slice(0, 6);

  const scrollCreators = (direction: 'left' | 'right') => {
    const container = document.getElementById('creators-scroll');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? Math.max(0, creatorScrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, creatorScrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setCreatorScrollPosition(newPosition);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-purple-600" />
            <span className="text-purple-600">Begeto</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('home')} className="text-gray-900">Home</button>
            <button onClick={() => onNavigate('marketplace')} className="text-gray-600 hover:text-gray-900">Marketplace</button>
            <button onClick={() => onNavigate('makers')} className="text-gray-600 hover:text-gray-900">Fashion Makers</button>
            <Button variant="ghost" onClick={() => onNavigate('cart')}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
            </Button>
            <Button onClick={() => onNavigate('auth')}>Sign In</Button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('cart')}>
              <ShoppingCart className="w-4 h-4" />
              {cartItemsCount > 0 && <span className="ml-1">{cartItemsCount}</span>}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 md:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
                Global Fashion Marketplace
              </div>
              <h1 className="text-gray-900">
                Discover Authentic Fashion From Every Corner of the World
              </h1>
              <p className="text-gray-600">
                Begeto connects you with talented fashion makers across the globe. Experience indigenous designs, customize them to your style, and try them on with AR before they're crafted just for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => onNavigate('marketplace')}>
                  Explore Marketplace <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('makers')}>
                  Meet Our Makers
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 absolute inset-0 blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <Card className="p-4 md:p-6 space-y-2">
                  <Globe className="w-8 md:w-10 h-8 md:h-10 text-purple-600" />
                  <h3 className="text-gray-900">150+ Countries</h3>
                  <p className="text-gray-600">Fashion makers worldwide</p>
                </Card>
                <Card className="p-4 md:p-6 space-y-2 mt-8">
                  <Sparkles className="w-8 md:w-10 h-8 md:h-10 text-pink-600" />
                  <h3 className="text-gray-900">AR Try-On</h3>
                  <p className="text-gray-600">See before you buy</p>
                </Card>
                <Card className="p-4 md:p-6 space-y-2">
                  <Shirt className="w-8 md:w-10 h-8 md:h-10 text-orange-600" />
                  <h3 className="text-gray-900">Custom Made</h3>
                  <p className="text-gray-600">Tailored to perfection</p>
                </Card>
                <Card className="p-4 md:p-6 space-y-2 mt-8">
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    10K+
                  </div>
                  <h3 className="text-gray-900">Unique Designs</h3>
                  <p className="text-gray-600">One-of-a-kind pieces</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900">Featured Creators</h2>
              <p className="text-gray-600 mt-2">Meet talented makers from around the world</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('makers')}>
              See all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="relative">
            <div 
              id="creators-scroll"
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {MOCK_CREATORS.map(creator => (
                <Card 
                  key={creator.id}
                  className="min-w-[280px] md:min-w-[320px] flex-shrink-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onCreatorSelect(creator.id)}
                >
                  <div className="h-32 md:h-40 bg-gray-100 relative overflow-hidden">
                    <ImageWithFallback
                      src={creator.coverImage}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 -mt-8 md:-mt-10 border-4 border-white bg-gray-200">
                        <ImageWithFallback
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 mt-2">
                        <h3 className="text-gray-900">{creator.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <Badge variant="outline">{creator.country}</Badge>
                          <span>★ {creator.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-2 mb-3">{creator.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {creator.specialties.slice(0, 2).map(specialty => (
                        <Badge key={specialty} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Scroll Buttons - Desktop Only */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full w-10 h-10 p-0 shadow-lg bg-white"
                onClick={() => scrollCreators('left')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full w-10 h-10 p-0 shadow-lg bg-white"
                onClick={() => scrollCreators('right')}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Designs Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900">Trending Designs</h2>
              <p className="text-gray-600 mt-2">Popular items loved by our community</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
              See all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
            {trendingProducts.map(product => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onProductSelect(product)}
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white text-gray-900 text-xs">{product.country}</Badge>
                  </div>
                </div>
                <div className="p-3 md:p-4 space-y-1">
                  <h3 className="text-gray-900 line-clamp-1 text-sm md:text-base">{product.name}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{product.maker}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-purple-600">${product.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom-Made Picks Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900">Custom-Made Picks</h2>
              <p className="text-gray-600 mt-2">Tailored pieces crafted to your measurements</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
              See all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
            {customMadeProducts.map(product => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onProductSelect(product)}
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-purple-600 text-white text-xs">Custom</Badge>
                  </div>
                </div>
                <div className="p-3 md:p-4 space-y-1">
                  <h3 className="text-gray-900 line-clamp-1 text-sm md:text-base">{product.name}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{product.maker}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-purple-600">${product.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-gray-900">How Begeto Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience a new way to shop for fashion that celebrates cultural heritage and craftsmanship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 md:p-8 space-y-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600">1</span>
              </div>
              <h3 className="text-gray-900">Discover Global Fashion</h3>
              <p className="text-gray-600">
                Browse authentic designs from fashion makers across 150+ countries. From Malawian hats to Ghanaian Ankara, find unique pieces that tell a story.
              </p>
            </Card>

            <Card className="p-6 md:p-8 space-y-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-pink-600">2</span>
              </div>
              <h3 className="text-gray-900">Customize & Try with AR</h3>
              <p className="text-gray-600">
                Use our digital tools to modify colors, patterns, and styles. See how it looks on you with our augmented reality try-on technology.
              </p>
            </Card>

            <Card className="p-6 md:p-8 space-y-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-orange-600">3</span>
              </div>
              <h3 className="text-gray-900">Made & Shipped to You</h3>
              <p className="text-gray-600">
                Your customized outfit is crafted by skilled makers and shipped directly to your location anywhere in the world.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-white">Ready to Discover Your Next Favorite Outfit?</h2>
          <p className="text-purple-100 max-w-2xl mx-auto">
            Join thousands of fashion lovers who are embracing global craftsmanship and cultural diversity.
          </p>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('marketplace')}>
            Start Shopping Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400">Begeto</span>
            </div>
            <p className="text-gray-400">Connecting the world through fashion</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
