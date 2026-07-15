"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, History, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { products, formatPrice } from '../../lib/products';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SearchBarProps {
 onSearch?: (term: string) => void;
 placeholder?: string;
 className?: string;
}

const TRENDING_SEARCHES = ['iPhone', 'MacBook', 'OLED', 'Sony', 'PlayStation', 'Smart Home'];

export default function SearchBar({
 onSearch,
 placeholder = "Search premium electronics...",
 className = ''
}: SearchBarProps) {
 const router = useRouter();
 const [query, setQuery] = useState('');
 const [suggestions, setSuggestions] = useState<Product[]>([]);
 const [recentSearches, setRecentSearches] = useState<string[]>([]);
 const [isOpen, setIsOpen] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);

 // Load recent searches
 useEffect(() => {
 const saved = localStorage.getItem('recent_searches');
 if (saved) {
 try {
 setRecentSearches(JSON.parse(saved));
 } catch (e) {
 console.error(e);
 }
 }
 }, []);

 // Handle autocomplete filters
 useEffect(() => {
 if (query.trim().length > 1) {
 const matches = products.filter(
 (p) =>
 p.name.toLowerCase().includes(query.toLowerCase()) ||
 p.brand.toLowerCase().includes(query.toLowerCase()) ||
 p.category.toLowerCase().includes(query.toLowerCase())
 );
 setSuggestions(matches.slice(0, 5));
 } else {
 setSuggestions([]);
 }
 }, [query]);

 // Click outside to close dropdown
 useEffect(() => {
 const handleOutsideClick = (e: MouseEvent) => {
 if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
 setIsOpen(false);
 }
 };
 document.addEventListener('mousedown', handleOutsideClick);
 return () => document.removeEventListener('mousedown', handleOutsideClick);
 }, []);

 const saveSearchTerm = (term: string) => {
 const list = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5);
 setRecentSearches(list);
 localStorage.setItem('recent_searches', JSON.stringify(list));
 };

 const handleSearchSubmit = (term: string) => {
 if (!term.trim()) return;
 saveSearchTerm(term);
 setIsOpen(false);
 
 if (onSearch) {
 onSearch(term);
 } else {
 router.push(`/products?search=${encodeURIComponent(term)}`);
 }
 };

 const clearSearch = () => {
 setQuery('');
 setSuggestions([]);
 if (onSearch) onSearch('');
 };

 const removeRecentSearch = (e: React.MouseEvent, term: string) => {
 e.stopPropagation();
 const list = recentSearches.filter((t) => t !== term);
 setRecentSearches(list);
 localStorage.setItem('recent_searches', JSON.stringify(list));
 };

 return (
 <div ref={containerRef} className={`relative w-full ${className}`}>
 {/* Search Input Field */}
 <div 
 style={{ backgroundColor: 'var(--card)' }}
 className="relative flex items-center hover:bg-white/95 :bg-zinc-900/80 border border-border/80 focus-within:border-primary/50 :border-primary/40 focus-within:bg-white :bg-zinc-950 rounded-full transition-all px-4 py-2.5 shadow-sm"
 >
 <Search className="text-muted-foreground w-4 h-4 mr-2" />
 <input
 type="text"
 value={query}
 onChange={(e) => {
 setQuery(e.target.value);
 setIsOpen(true);
 }}
 onFocus={() => setIsOpen(true)}
 onKeyDown={(e) => {
 if (e.key === 'Enter') handleSearchSubmit(query);
 }}
 placeholder={placeholder}
 className="bg-transparent border-none text-foreground text-xs md:text-sm outline-none w-full placeholder:text-muted-foreground"
 />
 {query && (
 <button onClick={clearSearch} className="text-muted-foreground hover:text-foreground">
 <X size={16} />
 </button>
 )}
 </div>

 {/* Dropdown Suggestions */}
 {isOpen && (
 <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-card border border-border/60 rounded-2xl shadow-2xl glass-panel p-4 overflow-hidden max-h-[85vh] overflow-y-auto">
 {/* Autocomplete Suggestions */}
 {suggestions.length > 0 ? (
 <div className="space-y-3">
 <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
 Products Match
 </span>
 <div className="flex flex-col gap-2">
 {suggestions.map((item) => (
 <button
 key={item.id}
 onClick={() => {
 saveSearchTerm(item.name);
 setIsOpen(false);
 router.push(`/products?id=${item.id}`);
 }}
 className="flex gap-3 items-center w-full text-left p-1.5 hover:bg-muted/60 rounded-xl transition-colors"
 >
 <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border/30 bg-muted flex-shrink-0">
 <Image
 src={item.images[0]}
 alt={item.name}
 fill
 className="object-cover"
 sizes="40px"
 />
 </div>
 <div>
 <h4 className="text-xs font-bold text-foreground line-clamp-1">
 {item.name}
 </h4>
 <span className="text-[10px] text-muted-foreground">{item.brand} • {formatPrice(item.price)}</span>
 </div>
 </button>
 ))}
 </div>
 </div>
 ) : query.trim().length > 1 ? (
 <div className="text-xs text-muted-foreground py-2">
 No direct product matches found for &quot;{query}&quot;
 </div>
 ) : null}

 {/* Separation line */}
 {suggestions.length > 0 && <div className="h-px bg-border/40 my-3" />}

 {/* Recent Searches */}
 {recentSearches.length > 0 && (
 <div className="mb-4">
 <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1 mb-2">
 <History size={10} />
 Recent Searches
 </span>
 <div className="flex flex-wrap gap-2">
 {recentSearches.map((term) => (
 <div
 key={term}
 onClick={() => {
 setQuery(term);
 handleSearchSubmit(term);
 }}
 className="flex items-center gap-1 px-3 py-1 bg-muted/40 hover:bg-muted/80 rounded-full border border-border/40 text-xs text-foreground cursor-pointer transition-colors"
 >
 <span>{term}</span>
 <button
 onClick={(e) => removeRecentSearch(e, term)}
 className="text-muted-foreground hover:text-red-500 rounded-full"
 >
 <X size={10} />
 </button>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Trending Searches */}
 <div>
 <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1 mb-2">
 <Sparkles size={10} className="text-primary" />
 Trending Searches
 </span>
 <div className="flex flex-wrap gap-2">
 {TRENDING_SEARCHES.map((term) => (
 <button
 key={term}
 onClick={() => {
 setQuery(term);
 handleSearchSubmit(term);
 }}
 className="px-3 py-1 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full text-xs font-medium text-primary transition-colors"
 >
 {term}
 </button>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
