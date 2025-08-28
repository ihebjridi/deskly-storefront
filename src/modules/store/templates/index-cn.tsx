"use client"

import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List, Star, ShoppingCart, X, Plus, Minus, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@modules/common/components/ui/button"
import { Input } from "@modules/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@modules/common/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@modules/common/components/ui/card";
import { Badge } from "@modules/common/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@modules/common/components/ui/dialog";
import { Separator } from "@modules/common/components/ui/separator";
import { Toggle } from "@modules/common/components/ui/toggle";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@modules/common/components/ui/sheet";

// Static product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    category: "electronics",
    brand: "AudioTech",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
    ],
    description: "Experience premium sound quality with these wireless headphones featuring active noise cancellation and 30-hour battery life.",
    features: ["Active Noise Cancellation", "30h Battery Life", "Quick Charge", "Premium Materials"],
    inStock: true,
    tags: ["wireless", "premium", "new"]
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    price: 199.99,
    rating: 4.6,
    reviews: 89,
    category: "electronics",
    brand: "FitTech",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop"
    ],
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and sleep tracking.",
    features: ["Heart Rate Monitor", "GPS Tracking", "Sleep Analysis", "Water Resistant"],
    inStock: true,
    tags: ["fitness", "smart"]
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    rating: 4.9,
    reviews: 156,
    category: "home",
    brand: "LightCraft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"
    ],
    description: "Modern LED desk lamp with adjustable brightness and color temperature for optimal workspace lighting.",
    features: ["LED Technology", "Adjustable Brightness", "USB Charging Port", "Touch Control"],
    inStock: true,
    tags: ["minimalist", "led"]
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.4,
    reviews: 203,
    category: "clothing",
    brand: "EcoWear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop"
    ],
    description: "Comfortable and sustainable organic cotton t-shirt perfect for everyday wear.",
    features: ["100% Organic Cotton", "Pre-shrunk", "Sustainable", "Soft Feel"],
    inStock: true,
    tags: ["organic", "sustainable"]
  },
  {
    id: 5,
    name: "Professional Camera Lens",
    price: 899.99,
    originalPrice: 1099.99,
    rating: 4.9,
    reviews: 67,
    category: "electronics",
    brand: "OpticsXX",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop"
    ],
    description: "Professional grade camera lens with superior optics for stunning photography results.",
    features: ["Superior Optics", "Weather Sealed", "Fast Autofocus", "Professional Grade"],
    inStock: false,
    tags: ["professional", "photography"]
  },
  {
    id: 6,
    name: "Ceramic Coffee Mug Set",
    price: 39.99,
    rating: 4.7,
    reviews: 312,
    category: "home",
    brand: "CeramicCraft",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop"
    ],
    description: "Beautiful handcrafted ceramic coffee mug set perfect for your morning routine.",
    features: ["Handcrafted", "Dishwasher Safe", "Set of 4", "Premium Ceramic"],
    inStock: true,
    tags: ["ceramic", "handcrafted"]
  }
];

const categories = ["all", "electronics", "home", "clothing"];
const brands = ["all", "AudioTech", "FitTech", "LightCraft", "EcoWear", "OpticsXX", "CeramicCraft"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" }
];

const ProductCard = ({ product, onViewProduct, viewMode }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer" onClick={() => onViewProduct(product)}>
                  {product.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-1 h-auto"
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-red-500' : ''} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.inStock ? (
                  <Button size="sm" className="flex items-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <Badge className="absolute top-3 left-3" variant="destructive">
            Sale
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-red-500' : ''} />
        </Button>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button onClick={() => onViewProduct(product)} variant="secondary">
            Quick View
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
            <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
          </div>
        </div>
        <h3 className="font-semibold mb-1 hover:text-primary cursor-pointer" onClick={() => onViewProduct(product)}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{product.brand}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
          {product.inStock ? (
            <Button size="sm" className="p-2">
              <ShoppingCart size={16} />
            </Button>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProductModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <Button
                  key={index}
                  variant={selectedImage === index ? "default" : "outline"}
                  onClick={() => setSelectedImage(index)}
                  className="flex-shrink-0 w-20 h-20 p-0 overflow-hidden"
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.brand}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium ml-1">{product.rating}</span>
                  <span className="text-muted-foreground ml-2">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                    <Badge variant="destructive">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </Badge>
                  </>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="mb-6" />
            
            {product.inStock ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="px-4 py-2 border-x min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Badge variant="destructive" className="mb-2">Out of Stock</Badge>
                <p className="text-muted-foreground">This item is currently unavailable</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MobileFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedBrand, 
  setSelectedBrand, 
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode,
  setCurrentPage 
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Filter size={20} className="mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Use filters to find exactly what you're looking for
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Brand</label>
            <Select value={selectedBrand} onValueChange={(value) => {
              setSelectedBrand(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>
                    {brand === 'all' ? 'All Brands' : brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">View Mode</label>
            <div className="flex gap-2">
              <Toggle
                pressed={viewMode === 'grid'}
                onPressedChange={() => setViewMode('grid')}
                className="flex-1 justify-center"
              >
                <Grid3X3 size={16} className="mr-2" />
                Grid
              </Toggle>
              <Toggle
                pressed={viewMode === 'list'}
                onPressedChange={() => setViewMode('list')}
                className="flex-1 justify-center"
              >
                <List size={16} className="mr-2" />
                List
              </Toggle>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const StoreTemplate = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsPerPage = 6;

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      
      return matchesSearch && matchesCategory && matchesBrand;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground">Discover our curated collection of premium products</p>
        </div>

        {/* Search and Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>

              {/* Mobile Filter Toggle */}
              <MobileFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                setCurrentPage={setCurrentPage}
              />

              {/* Desktop Controls */}
              <div className="hidden lg:flex items-center gap-4">
                <Select value={selectedCategory} onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBrand} onValueChange={(value) => {
                  setSelectedBrand(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex">
                  <Toggle
                    pressed={viewMode === 'grid'}
                    onPressedChange={() => setViewMode('grid')}
                  >
                    <Grid3X3 size={20} />
                  </Toggle>
                  <Toggle
                    pressed={viewMode === 'list'}
                    onPressedChange={() => setViewMode('list')}
                  >
                    <List size={20} />
                  </Toggle>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
          </div>
          {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all' || sortBy !== 'featured') && (
            <Button variant="outline" onClick={resetFilters}>
              Clear all filters
            </Button>
          )}
        </div>

        {/* Products Grid/List */}
        {displayedProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            : "space-y-4 mb-8"
          }>
            {displayedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={handleViewProduct}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters}>Clear filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StoreTemplate; 