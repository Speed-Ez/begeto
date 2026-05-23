import { Globe, MapPin, Star, Calendar, ShoppingCart, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Creator, Product, PageType } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CreatorProfileProps = {
  creator: Creator;
  onNavigate: (page: PageType) => void;
  onProductSelect: (product: Product) => void;
  cartItemsCount: number;
};

export function CreatorProfile({ creator, onNavigate, onProductSelect, cartItemsCount }: CreatorProfileProps) {
  const creatorProducts = MOCK_PRODUCTS.filter(p => p.makerId === creator.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <Globe className="w-8 h-8 text-purple-600" />
              <span className="text-purple-600">Begeto</span>
            </div>
            <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-gray-900 hidden md:block">Home</button>
            <button onClick={() => onNavigate('marketplace')} className="text-gray-600 hover:text-gray-900 hidden md:block">Marketplace</button>
            <button onClick={() => onNavigate('makers')} className="text-gray-900 hidden md:block">Fashion Makers</button>
          </div>
          <Button variant="ghost" onClick={() => onNavigate('cart')}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
          </Button>
        </div>
      </nav>

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gray-200 overflow-hidden">
        <ImageWithFallback
          src={creator.coverImage}
          alt={`${creator.name} cover`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Creator Header */}
        <div className="relative -mt-16 md:-mt-20 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white overflow-hidden flex-shrink-0 shadow-lg">
              <ImageWithFallback
                src={creator.avatar}
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 bg-white rounded-lg shadow-lg p-6 md:mt-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-gray-900">{creator.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{creator.region}, {creator.country}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{creator.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Package className="w-4 h-4" />
                      <span>{creator.productsCount} Products</span>
                    </div>
                  </div>
                </div>
                <Button className="md:self-start">Contact Maker</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="products" className="mb-12">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {creatorProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {creatorProducts.map(product => (
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
                      {product.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-purple-600 text-white text-xs">Featured</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-gray-900 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-600">${product.price}</span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-600">This maker hasn't listed any products yet.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="about">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">About {creator.name}</h3>
                <p className="text-gray-600 mb-6">{creator.bio}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Based in {creator.region}, {creator.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {new Date(creator.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{creator.productsCount} products listed</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.specialties.map(specialty => (
                    <Badge key={specialty} variant="secondary" className="text-sm px-3 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-gray-900 mt-8 mb-4">Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{creator.rating}/5.0</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Products</span>
                    <span className="text-gray-900">{creator.productsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-gray-900">Within 24 hours</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', rating: 5, date: '2 weeks ago', comment: 'Absolutely beautiful craftsmanship! The attention to detail is incredible.' },
                { name: 'Michael Chen', rating: 5, date: '1 month ago', comment: 'Fast shipping and exactly as described. Very happy with my purchase!' },
                { name: 'Emma Williams', rating: 4, date: '2 months ago', comment: 'Great quality and unique design. Shipping took a bit longer than expected but worth the wait.' }
              ].map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-gray-900">{review.name}</h4>
                      <p className="text-gray-600">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-600">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
