import { Globe, Sparkles, Shirt, ArrowRight, ShoppingCart, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Product, PageType } from '../types';
import { MOCK_PRODUCTS, MOCK_CREATORS } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useRef, useEffect } from 'react';

type HomeProps = {
  onNavigate: (page: PageType) => void;
  onProductSelect: (product: Product) => void;
  onCreatorSelect: (creatorId: string) => void;
  cartItemsCount: number;
};

export function Home({ onNavigate, onProductSelect, onCreatorSelect, cartItemsCount }: HomeProps) {
  const creatorsScrollRef = useRef<HTMLDivElement>(null);
  const [activeCreatorIndex, setActiveCreatorIndex] = useState(0);
  
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured).slice(0, 8);
  const trendingProducts = MOCK_PRODUCTS.filter(p => p.trending).slice(0, 12);
  const customMadeProducts = MOCK_PRODUCTS.filter(p => p.customMade).slice(0, 12);
  const newArrivals = MOCK_PRODUCTS.slice(0, 8);
  
  // Get products by category
  const dresses = MOCK_PRODUCTS.filter(p => p.category === 'Dresses').slice(0, 8);
  const accessories = MOCK_PRODUCTS.filter(p => p.category === 'Accessories').slice(0, 8);

  // Track scroll position to update active indicator
  useEffect(() => {
    const scrollContainer = creatorsScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = scrollContainer.scrollWidth / MOCK_CREATORS.length;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveCreatorIndex(index);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollCreators = (direction: 'left' | 'right') => {
    if (creatorsScrollRef.current) {
      const scrollAmount = 350;
      const newScrollLeft = direction === 'left' 
        ? creatorsScrollRef.current.scrollLeft - scrollAmount
        : creatorsScrollRef.current.scrollLeft + scrollAmount;
      
      creatorsScrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const scrollToCreator = (index: number) => {
    if (creatorsScrollRef.current) {
      const cardWidth = creatorsScrollRef.current.scrollWidth / MOCK_CREATORS.length;
      creatorsScrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
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

      {/* Hero Section - Condensed */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">
                Global Fashion Marketplace
              </div>
              <h1 className="text-gray-900">
                Discover Authentic Fashion From Every Corner of the World
              </h1>
              <p className="text-gray-600">
                Connect with talented fashion makers across the globe. Experience indigenous designs, customize them, and try them on with AR.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => onNavigate('marketplace')}>
                  Explore Marketplace <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('makers')}>
                  Meet Our Makers
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Card className="p-4 space-y-2">
                  <Globe className="w-8 h-8 text-purple-600" />
                  <h3 className="text-gray-900 text-sm md:text-base">150+ Countries</h3>
                  <p className="text-gray-600 text-xs md:text-sm">Fashion makers worldwide</p>
                </Card>
                <Card className="p-4 space-y-2 mt-6">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                  <h3 className="text-gray-900 text-sm md:text-base">AR Try-On</h3>
                  <p className="text-gray-600 text-xs md:text-sm">See before you buy</p>
                </Card>
                <Card className="p-4 space-y-2">
                  <Shirt className="w-8 h-8 text-orange-600" />
                  <h3 className="text-gray-900 text-sm md:text-base">Custom Made</h3>
                  <p className="text-gray-600 text-xs md:text-sm">Tailored to perfection</p>
                </Card>
                <Card className="p-4 space-y-2 mt-6">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">
                    10K+
                  </div>
                  <h3 className="text-gray-900 text-sm md:text-base">Unique Designs</h3>
                  <p className="text-gray-600 text-xs md:text-sm">One-of-a-kind pieces</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Carousel - Mobile Optimized */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">Featured Fashion Makers</h2>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Talented designers from around the world</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('makers')} className="hidden md:flex">
              See all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="relative group">
            {/* Carousel Container */}
            <div 
              ref={creatorsScrollRef}
              className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollPaddingLeft: '1rem',
                scrollPaddingRight: '1rem'
              }}
            >
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {MOCK_CREATORS.map((creator, index) => (
                <div 
                  key={creator.id}
                  className="flex-shrink-0 snap-start w-[calc(100vw-2rem)] sm:w-[300px] md:w-[340px] lg:w-[360px]"
                >
                  <Card 
                    className="h-full overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => onCreatorSelect(creator.id)}
                  >
                    <div className="h-32 sm:h-36 md:h-40 bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                      <ImageWithFallback
                        src={creator.coverImage}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden flex-shrink-0 -mt-10 md:-mt-12 border-4 border-white bg-white shadow-lg">
                          <ImageWithFallback
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 mt-1">
                          <h3 className="text-gray-900 text-base md:text-lg font-semibold leading-tight">{creator.name}</h3>
                          <div className="flex items-center gap-2 text-gray-600 mt-1.5 text-sm">
                            <Badge variant="outline" className="text-xs px-2 py-0.5">{creator.country}</Badge>
                            <span className="flex items-center gap-0.5 font-medium">
                              <span className="text-yellow-500">★</span> {creator.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">{creator.bio}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {creator.specialties.slice(0, 3).map(specialty => (
                          <Badge key={specialty} variant="secondary" className="text-xs px-2 py-1">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicators - Mobile with active state */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
              {MOCK_CREATORS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCreator(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeCreatorIndex 
                      ? 'w-6 bg-purple-600' 
                      : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to creator ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Scroll Buttons - Desktop only, show on hover */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex absolute left-0 top-[45%] -translate-y-1/2 -translate-x-2 rounded-full w-10 h-10 p-0 shadow-lg bg-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-gray-50"
              onClick={() => scrollCreators('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex absolute right-0 top-[45%] -translate-y-1/2 translate-x-2 rounded-full w-10 h-10 p-0 shadow-lg bg-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-gray-50"
              onClick={() => scrollCreators('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="md:hidden mt-6 text-center">
            <Button variant="outline" onClick={() => onNavigate('makers')} className="w-full sm:w-auto">
              View All Fashion Makers <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">New Arrivals</h2>
              <p className="text-gray-600 mt-1">Fresh designs just added</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
              See all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
            {newArrivals.map(product => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onProductSelect(product)}
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white text-gray-900 text-xs">{product.country}</Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-600 text-white text-xs">New</Badge>
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-gray-900 line-clamp-1 text-sm">{product.name}</h3>
                  <p className="text-gray-600 text-xs">{product.maker}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-purple-600 font-medium">${product.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Designs Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">Trending Designs</h2>
              <p className="text-gray-600 mt-1">Popular items loved by our community</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
              See all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
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
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white text-gray-900 text-xs">{product.country}</Badge>
                  </div>
                </div>
                <div className="p-2.5 md:p-3 space-y-1">
                  <h3 className="text-gray-900 line-clamp-1 text-xs md:text-sm">{product.name}</h3>
                  <p className="text-gray-600 text-xs line-clamp-1">{product.maker}</p>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-purple-600 font-medium text-sm">${product.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dresses Category Section */}
      {dresses.length > 0 && (
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Traditional Dresses</h2>
                <p className="text-gray-600 mt-1">Elegant cultural attire</p>
              </div>
              <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
                See all <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
              {dresses.map(product => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onProductSelect(product)}
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white text-gray-900 text-xs">{product.country}</Badge>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-gray-900 line-clamp-1 text-sm">{product.name}</h3>
                    <p className="text-gray-600 text-xs">{product.maker}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-purple-600 font-medium">${product.price}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom-Made Picks Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">Custom-Made Collection</h2>
              <p className="text-gray-600 mt-1">Tailored pieces crafted to your measurements</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
              See all <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
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
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-purple-600 text-white text-xs">Custom</Badge>
                  </div>
                </div>
                <div className="p-2.5 md:p-3 space-y-1">
                  <h3 className="text-gray-900 line-clamp-1 text-xs md:text-sm">{product.name}</h3>
                  <p className="text-gray-600 text-xs line-clamp-1">{product.maker}</p>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-purple-600 font-medium text-sm">${product.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      {accessories.length > 0 && (
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Accessories & Jewelry</h2>
                <p className="text-gray-600 mt-1">Complete your look with unique pieces</p>
              </div>
              <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
                See all <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
              {accessories.map(product => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onProductSelect(product)}
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white text-gray-900 text-xs">{product.country}</Badge>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-gray-900 line-clamp-1 text-sm">{product.name}</h3>
                    <p className="text-gray-600 text-xs">{product.maker}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-purple-600 font-medium">${product.price}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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