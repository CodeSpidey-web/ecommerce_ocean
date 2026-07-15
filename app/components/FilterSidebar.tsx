"use client";

import React, { useState } from 'react';
import { FilterState } from '../../types';
import { Star, Check, ChevronDown } from 'lucide-react';
import { formatPrice } from '../../lib/products';

interface FilterSidebarProps {
 filters: FilterState;
 setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
 uniqueCategories: string[];
 uniqueBrands: string[];
 maxProductPrice: number;
}

export default function FilterSidebar({
 filters,
 setFilters,
 uniqueCategories,
 uniqueBrands,
 maxProductPrice
}: FilterSidebarProps) {
 
 // Accordion state management for clean vertical layout
 const [expanded, setExpanded] = useState<Record<string, boolean>>({
 category: true,
 brand: true,
 price: true,
 voltage: false,
 protocol: false,
 sensorType: false,
 boardType: false,
 application: false,
 industry: false
 });

 const toggleSection = (section: string) => {
 setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
 };

 const handleCategorySelect = (category: string) => {
 setFilters((prev) => ({
 ...prev,
 category: prev.category === category ? '' : category
 }));
 };

 const handleBrandSelect = (brand: string) => {
 setFilters((prev) => ({
 ...prev,
 brand: prev.brand === brand ? '' : brand
 }));
 };

 const handleSpecSelect = (field: keyof FilterState, value: string) => {
 setFilters((prev) => ({
 ...prev,
 [field]: prev[field] === value ? '' : value
 }));
 };

 const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const val = parseInt(e.target.value, 10);
 setFilters((prev) => ({
 ...prev,
 maxPrice: val
 }));
 };

 const handleRatingSelect = (rating: number) => {
 setFilters((prev) => ({
 ...prev,
 minRating: prev.minRating === rating ? 0 : rating
 }));
 };

 const toggleInStock = () => {
 setFilters((prev) => ({
 ...prev,
 onlyInStock: !prev.onlyInStock
 }));
 };

 const clearAllFilters = () => {
 setFilters({
 search: filters.search, // Preserve search text
 category: '',
 brand: '',
 minPrice: 0,
 maxPrice: maxProductPrice || 40000,
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
 };

 const activeFilterCount =
 (filters.category ? 1 : 0) +
 (filters.brand ? 1 : 0) +
 (filters.maxPrice < maxProductPrice ? 1 : 0) +
 (filters.minRating > 0 ? 1 : 0) +
 (filters.onlyInStock ? 1 : 0) +
 (filters.voltage ? 1 : 0) +
 (filters.protocol ? 1 : 0) +
 (filters.sensorType ? 1 : 0) +
 (filters.boardType ? 1 : 0) +
 (filters.application ? 1 : 0) +
 (filters.industry ? 1 : 0);

 // Filter options lists
 const voltageOptions = ['3.3V', '5V', '11.1V', '24V'];
 const protocolOptions = ['I2C', 'SPI', 'UART', 'CAN', 'Wi-Fi', 'BLE', '1-Wire'];
 const boardOptions = ['Microcontroller', 'Single Board Computer'];
 const sensorOptions = ['Ultrasonic', 'Temperature', 'Humidity', 'IMU'];
 const applicationOptions = ['Robotics', 'IoT', 'Drone', '3D Printing', 'EV'];
 const industryOptions = ['Education', 'Industrial', 'STEM', 'Aerospace'];

 return (
 <div className="w-full flex flex-col gap-5 bg-card border border-border/40 p-5 rounded-[20px] glass-panel sticky top-24 max-h-[85vh] overflow-y-auto">
 {/* Header */}
 <div className="flex items-center justify-between pb-3 border-b border-border/40 flex-shrink-0">
 <h3 className="font-bold text-foreground flex items-center gap-2">
 <span>Filters</span>
 {activeFilterCount > 0 && (
 <span className="text-[10px] bg-primary text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
 {activeFilterCount}
 </span>
 )}
 </h3>
 {activeFilterCount > 0 && (
 <button
 onClick={clearAllFilters}
 className="text-xs font-semibold text-primary hover:underline transition-all cursor-pointer"
 >
 Clear All
 </button>
 )}
 </div>

 {/* Category Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('category')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Category</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.category ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.category && (
 <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
 {uniqueCategories.map((cat) => {
 const isSelected = filters.category === cat;
 return (
 <button
 key={cat}
 onClick={() => handleCategorySelect(cat)}
 className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-extrabold shadow-inner'
 : 'bg-muted/10 border-border/20 hover:border-border/60 hover:bg-muted/20 text-muted-foreground hover:text-foreground'
 }`}
 >
 <span>{cat}</span>
 {isSelected && <Check size={12} />}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Brand Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('brand')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Brand</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.brand ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.brand && (
 <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
 {uniqueBrands.map((b) => {
 const isSelected = filters.brand === b;
 return (
 <button
 key={b}
 onClick={() => handleBrandSelect(b)}
 className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-extrabold shadow-inner'
 : 'bg-muted/10 border-border/20 hover:border-border/60 hover:bg-muted/20 text-muted-foreground hover:text-foreground'
 }`}
 >
 <span>{b}</span>
 {isSelected && <Check size={12} />}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Price Slider */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <div className="flex justify-between items-center w-full">
 <span className="text-xs font-black uppercase tracking-wider text-foreground">Max Price</span>
 <span className="text-xs font-black text-primary">{formatPrice(filters.maxPrice)}</span>
 </div>
 <input
 type="range"
 min="0"
 max={maxProductPrice || 40000}
 value={filters.maxPrice}
 onChange={handlePriceChange}
 className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
 />
 <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
 <span>₹0</span>
 <span>{formatPrice(maxProductPrice || 40000)}</span>
 </div>
 </div>

 {/* Voltage Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('voltage')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Voltage</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.voltage ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.voltage && (
 <div className="grid grid-cols-2 gap-1.5">
 {voltageOptions.map((v) => {
 const isSelected = filters.voltage === v;
 return (
 <button
 key={v}
 onClick={() => handleSpecSelect('voltage', v)}
 className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-black'
 : 'border-border/60 bg-transparent text-muted-foreground hover:bg-muted'
 }`}
 >
 {v}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Protocol Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('protocol')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Protocol</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.protocol ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.protocol && (
 <div className="flex flex-wrap gap-1.5">
 {protocolOptions.map((p) => {
 const isSelected = filters.protocol === p;
 return (
 <button
 key={p}
 onClick={() => handleSpecSelect('protocol', p)}
 className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-black'
 : 'border-border/60 bg-transparent text-muted-foreground hover:bg-muted'
 }`}
 >
 {p}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Board Type Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('boardType')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Board Type</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.boardType ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.boardType && (
 <div className="flex flex-col gap-1.5">
 {boardOptions.map((opt) => {
 const isSelected = filters.boardType === opt;
 return (
 <button
 key={opt}
 onClick={() => handleSpecSelect('boardType', opt)}
 className={`flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold text-left transition-all border ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-black shadow-inner'
 : 'bg-muted/10 border-border/20 hover:border-border/60 hover:bg-muted/20 text-muted-foreground'
 }`}
 >
 <span>{opt}</span>
 {isSelected && <Check size={12} />}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Sensor Type Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('sensorType')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Sensor Type</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.sensorType ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.sensorType && (
 <div className="grid grid-cols-2 gap-1.5">
 {sensorOptions.map((s) => {
 const isSelected = filters.sensorType === s;
 return (
 <button
 key={s}
 onClick={() => handleSpecSelect('sensorType', s)}
 className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-black'
 : 'border-border/60 bg-transparent text-muted-foreground hover:bg-muted'
 }`}
 >
 {s}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Application Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('application')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Application</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.application ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.application && (
 <div className="grid grid-cols-2 gap-1.5">
 {applicationOptions.map((app) => {
 const isSelected = filters.application === app;
 return (
 <button
 key={app}
 onClick={() => handleSpecSelect('application', app)}
 className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-black'
 : 'border-border/60 bg-transparent text-muted-foreground hover:bg-muted'
 }`}
 >
 {app}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Industry Section */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <button 
 onClick={() => toggleSection('industry')} 
 className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-foreground text-left"
 >
 <span>Industry</span>
 <ChevronDown size={14} className={`transition-transform duration-200 ${expanded.industry ? 'rotate-180 text-primary' : ''}`} />
 </button>
 {expanded.industry && (
 <div className="grid grid-cols-2 gap-1.5">
 {industryOptions.map((ind) => {
 const isSelected = filters.industry === ind;
 return (
 <button
 key={ind}
 onClick={() => handleSpecSelect('industry', ind)}
 className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-black'
 : 'border-border/60 bg-transparent text-muted-foreground hover:bg-muted'
 }`}
 >
 {ind}
 </button>
 );
 })}
 </div>
 )}
 </div>

 {/* Ratings */}
 <div className="border-b border-border/30 pb-3.5 space-y-2.5">
 <span className="text-xs font-black uppercase tracking-wider text-foreground block text-left">Customer Rating</span>
 <div className="grid grid-cols-2 gap-2">
 {[4, 4.5, 4.7, 4.9].map((rating) => {
 const isSelected = filters.minRating === rating;
 return (
 <button
 key={rating}
 onClick={() => handleRatingSelect(rating)}
 className={`flex items-center justify-center gap-1 py-2 px-2.5 border rounded-xl text-xs font-bold transition-all ${
 isSelected
 ? 'bg-primary/10 border-primary/30 text-primary font-black shadow-inner'
 : 'border-border/60 bg-transparent text-muted-foreground hover:bg-muted'
 }`}
 >
 <Star size={10} fill={isSelected ? 'white' : 'currentColor'} className="text-amber-500" />
 <span>{rating}+</span>
 </button>
 );
 })}
 </div>
 </div>

 {/* Stock Status */}
 <div className="pt-1.5">
 <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors select-none">
 <input
 type="checkbox"
 checked={filters.onlyInStock}
 onChange={toggleInStock}
 className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary accent-primary"
 />
 <span className="font-bold">Only In Stock</span>
 </label>
 </div>
 </div>
 );
}
