import { Globe, Search, MapPin, Star, Package, ShoppingCart, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PageType } from '../types';
import { MOCK_CREATORS } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

type MakersProps = {
  onNavigate: (page: PageType) => void;
  onCreatorSelect: (creatorId: string) => void;
  cartItemsCount: number;
};

export function Makers({ onNavigate, onCreatorSelect, cartItemsCount }: MakersProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCreators = MOCK_CREATORS.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 space-y-2">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Button>
          <h1 className="text-gray-900">Meet Our Fashion Makers</h1>
          <p className="text-gray-600">Connect with talented artisans from around the world</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, country, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map(creator => (
            <Card
              key={creator.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onCreatorSelect(creator.id)}
            >
              {/* Cover Image */}
              <div className="h-32 md:h-40 bg-gray-100 relative overflow-hidden">
                <ImageWithFallback
                  src={creator.coverImage}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                {/* Avatar and Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 -mt-10 border-4 border-white bg-gray-200">
                    <ImageWithFallback
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 mt-2">
                    <h3 className="text-gray-900 mb-1">{creator.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{creator.country}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{creator.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 line-clamp-2 mb-4">{creator.bio}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.specialties.slice(0, 3).map(specialty => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{creator.productsCount} products</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Profile →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No makers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
