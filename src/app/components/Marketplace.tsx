import { useState } from 'react';
import { Globe, Search, Filter, ChevronLeft, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Product, PageType } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

type MarketplaceProps = {
  onProductSelect: (product: Product) => void;
  onNavigate: (page: PageType) => void;
  cartItemsCount: number;
};

export function Marketplace({ onProductSelect, onNavigate, cartItemsCount }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Dresses', 'Headwear', 'Jewelry', 'Tops', 'Outerwear', 'Accessories'];
  const countries = [...new Set(MOCK_PRODUCTS.map(p => p.country))];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  let filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.maker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(product.country);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesCountry && matchesPrice;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.filter(c => c !== 'All').map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={`category-${category}`} className="cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-900 mb-4">Countries</h3>
        <div className="space-y-3">
          {countries.slice(0, 8).map(country => (
            <div key={country} className="flex items-center space-x-2">
              <Checkbox
                id={`country-${country}`}
                checked={selectedCountries.includes(country)}
                onCheckedChange={() => toggleCountry(country)}
              />
              <Label htmlFor={`country-${country}`} className="cursor-pointer">
                {country}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-gray-900 mb-4">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'featured', label: 'Featured' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'newest', label: 'Newest' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value as typeof sortBy)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                sortBy === option.value
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedCountries.length > 0) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedCountries([]);
            setPriceRange([0, 300]);
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
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
            <button onClick={() => onNavigate('marketplace')} className="text-gray-900 hidden md:block">Marketplace</button>
            <button onClick={() => onNavigate('makers')} className="text-gray-600 hover:text-gray-900 hidden md:block">Fashion Makers</button>
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
          <h1 className="text-gray-900">Global Fashion Marketplace</h1>
          <p className="text-gray-600">Discover unique fashion pieces from makers around the world</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 md:mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by item, country, or maker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <FilterPanel />
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map(product => (
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
                    {product.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-purple-600 text-white text-xs">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4 space-y-1">
                    <h3 className="text-gray-900 line-clamp-1 text-sm md:text-base">{product.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{product.maker}</p>
                    <div className="flex items-center justify-between pt-1 md:pt-2">
                      <span className="text-purple-600">${product.price}</span>
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500">No products found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}