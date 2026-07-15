"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, FilterState, SortOption } from '../../types';
import { products } from '../../lib/products';
import Breadcrumb from './Breadcrumb';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';
import RecentlyViewed from './RecentlyViewed';
import { Grid, List, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductListingViewProps {
  initialCategory?: string;
  initialBrand?: string;
  initialSearch?: string;
}

const ITEMS_PER_PAGE = 8;

export default function ProductListingView({
  initialCategory = '',
  initialBrand = '',
  initialSearch = ''
}: ProductListingViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Determine unique categories & brands for filters
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
  const maxProductPrice = Math.max(...products.map((p) => p.price));

  // State-driven filters
  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    category: initialCategory,
    brand: initialBrand,
    minPrice: 0,
    maxPrice: maxProductPrice,
    minRating: 0,
    onlyInStock: false,
    voltage: '',
    current: '',
    protocol: '',
    sensorType: '',
    boardType: '',
    operatingTemp: '',
    packageType: '',
    application: '',
    industry: ''
  });

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state filters with URL query parameters when they change
  useEffect(() => {
    const urlCategory = searchParams.get('category') || '';
    const urlBrand = searchParams.get('brand') || '';
    const urlSearch = searchParams.get('search') || '';
    
    setFilters((prev) => ({
      ...prev,
      category: urlCategory,
      brand: urlBrand,
      search: urlSearch
    }));
    setCurrentPage(1);
  }, [searchParams]);

  // Apply sorting and filtering dynamically
  const filteredProducts = products
    .filter((product) => {
      // Keyword match
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSku = product.sku?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesBrand && !matchesCat && !matchesDesc && !matchesSku) return false;
      }
      
      // Category match
      if (filters.category && product.category !== filters.category) return false;
      
      // Brand match
      if (filters.brand && product.brand !== filters.brand) return false;
      
      // Price range
      if (product.price > filters.maxPrice) return false;
      
      // Rating minimum
      if (product.rating < filters.minRating) return false;
      
      // Stock status
      if (filters.onlyInStock && product.stock === 'Out of Stock') return false;

      // Voltage match
      if (filters.voltage) {
        const v = product.specifications['Operating Voltage'] || product.specifications['Voltage'] || '';
        if (!v.toLowerCase().includes(filters.voltage.toLowerCase())) return false;
      }

      // Current match
      if (filters.current) {
        const c = product.specifications['Operating Current'] || product.specifications['Rated Current'] || product.specifications['Current'] || '';
        if (!c.toLowerCase().includes(filters.current.toLowerCase())) return false;
      }

      // Protocol match
      if (filters.protocol) {
        const p = product.specifications['Communication Protocol'] || '';
        if (!p.toLowerCase().includes(filters.protocol.toLowerCase())) return false;
      }

      // Sensor Type match
      if (filters.sensorType) {
        const s = product.specifications['Sensor Type'] || '';
        if (!s.toLowerCase().includes(filters.sensorType.toLowerCase())) return false;
      }

      // Board Type match
      if (filters.boardType) {
        const b = product.specifications['Board Type'] || '';
        if (!b.toLowerCase().includes(filters.boardType.toLowerCase())) return false;
      }

      // Operating Temp match
      if (filters.operatingTemp) {
        const t = product.specifications['Operating Temperature'] || '';
        if (!t.toLowerCase().includes(filters.operatingTemp.toLowerCase())) return false;
      }

      // Package Type match
      if (filters.packageType) {
        const pkg = product.specifications['Package Type'] || '';
        if (!pkg.toLowerCase().includes(filters.packageType.toLowerCase())) return false;
      }

      // Application match
      if (filters.application) {
        const app = product.specifications['Application'] || '';
        if (!app.toLowerCase().includes(filters.application.toLowerCase())) return false;
      }

      // Industry match
      if (filters.industry) {
        const ind = product.specifications['Industry'] || '';
        if (!ind.toLowerCase().includes(filters.industry.toLowerCase())) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'discount-desc') return b.discount - a.discount;
      return 0; // default featured
    });

  // Pagination bounds
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchTerm = (term: string) => {
    setFilters((prev) => ({ ...prev, search: term }));
    setCurrentPage(1);
    
    // Update url
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
      
      {/* Top Breadcrumb and Search row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <Breadcrumb items={[{ label: 'Products' }]} />
        <SearchBar
          onSearch={handleSearchTerm}
          placeholder="Search items by name, brand, SKU or specs..."
          className="max-w-md w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filters Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            uniqueCategories={uniqueCategories}
            uniqueBrands={uniqueBrands}
            maxProductPrice={maxProductPrice}
          />
        </div>

        {/* Right Product Grid Column */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Controls Bar: Sort, View Toggle, Count */}
          <div className="flex items-center justify-between p-4 bg-card border border-border/40 rounded-2xl glass-panel shadow-sm flex-wrap gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-3">
              {/* Mobile Filter toggle trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl font-bold transition-all"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>

              <span className="font-semibold text-muted-foreground">
                Showing <span className="text-foreground">{totalItems}</span> matching products
              </span>
            </div>

            {/* Right Controls: Sort and Display layout toggle */}
            <div className="flex items-center gap-4">
              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-muted-foreground hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent border border-border/60 hover:border-muted-foreground/60 rounded-xl px-3 py-1.5 font-semibold text-foreground outline-none cursor-pointer text-xs transition-colors"
                >
                  <option value="featured">Featured Selections</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Customer Rating</option>
                  <option value="discount-desc">Highest Discount</option>
                </select>
              </div>

              {/* Grid / List view selectors */}
              <div className="flex items-center border border-border/60 rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setViewType('grid')}
                  className={`p-2 transition-colors ${
                    viewType === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewType('list')}
                  className={`p-2 transition-colors ${
                    viewType === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'
                  }`}
                  aria-label="List view"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile filter sliding drawer */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                />
                {/* Drawer Sheet */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-background border-r border-border/40 p-6 shadow-2xl z-50 overflow-y-auto lg:hidden flex flex-col gap-4 text-left"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-border/20">
                    <h3 className="font-extrabold text-base text-foreground">Refine Selections</h3>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <FilterSidebar
                      filters={filters}
                      setFilters={setFilters}
                      uniqueCategories={uniqueCategories}
                      uniqueBrands={uniqueBrands}
                      maxProductPrice={maxProductPrice}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Grid display products */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border/40 rounded-[20px] shadow-sm flex flex-col items-center justify-center gap-4 glass-panel">
              <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground/60">
                <SlidersHorizontal size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">No Products Found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mt-1 mx-auto leading-relaxed font-light">
                  We couldn&apos;t find any premium hardware matching your specific filters. Try loosening your price threshold or specification selections.
                </p>
              </div>
              <button
                onClick={() => {
                  setFilters({
                    search: '',
                    category: '',
                    brand: '',
                    minPrice: 0,
                    maxPrice: maxProductPrice,
                    minRating: 0,
                    onlyInStock: false,
                    voltage: '',
                    current: '',
                    protocol: '',
                    sensorType: '',
                    boardType: '',
                    operatingTemp: '',
                    packageType: '',
                    application: '',
                    industry: ''
                  });
                  setCurrentPage(1);
                  router.push('/products');
                }}
                className="text-xs font-bold px-5 py-2.5 bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/10 rounded-full transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <ProductGrid products={paginatedProducts} viewType={viewType} />
          )}

          {/* Pagination Footer */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* Recently Viewed Drawer */}
          <RecentlyViewed />

        </div>
      </div>
    </main>
  );
}
