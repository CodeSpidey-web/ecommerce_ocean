"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useWishlist } from '../context/AppContext';
import Image from 'next/image';
import {
  ShoppingBag, Heart, Search, Menu, X, User, ChevronDown, ChevronRight,
  Cpu, Wifi, Layers, Zap, Battery, Settings, Radar, Wind, Car,
  Printer, Boxes, Wrench, Gauge
} from 'lucide-react';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';

interface CategoryItem {
  name: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  detail: {
    heading: string;
    body: string;
    links: { label: string; href: string }[];
  };
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'Development Boards',
    desc: 'Arduino, Raspberry Pi, STM32',
    href: '/products?category=Development%20Boards',
    icon: <Cpu size={16} className="text-blue-500" />,
    detail: {
      heading: 'Development Boards',
      body: 'From beginner-friendly Arduino UNO to the powerful Raspberry Pi 5 and STM32 Blue Pill, our curated board selection covers every embedded development use case — IoT, AI, real-time control and automation.',
      links: [
        { label: 'Browse All Boards', href: '/products?category=Development%20Boards' },
        { label: 'Arduino Collections', href: '/products?search=Arduino' },
        { label: 'Raspberry Pi Series', href: '/products?search=Raspberry%20Pi' },
      ],
    },
  },
  {
    name: 'IoT Modules',
    desc: 'WiFi, BLE, LoRa & ZigBee',
    href: '/products?category=IoT%20Modules',
    icon: <Wifi size={16} className="text-cyan-500" />,
    detail: {
      heading: 'IoT Modules',
      body: 'Industrial wireless modules covering WiFi, Bluetooth LE, LoRa long-range, ZigBee mesh, NB-IoT, and LTE-M connectivity. Build cloud-connected sensors, gateways, and remote monitoring devices.',
      links: [
        { label: 'Browse IoT Modules', href: '/products?category=IoT%20Modules' },
        { label: 'ESP32 Modules', href: '/products?search=ESP32' },
      ],
    },
  },
  {
    name: 'Electronic Components',
    desc: 'Passives, displays & relays',
    href: '/products?category=Electronic%20Components',
    icon: <Layers size={16} className="text-indigo-500" />,
    detail: {
      heading: 'Electronic Components',
      body: 'SMD/THT resistors, capacitors, inductors, OLED/TFT displays, relay modules, op-amps, logic ICs, MOSFETs and more — everything you need for PCB-level circuit design and prototyping.',
      links: [
        { label: 'Browse Components', href: '/products?category=Electronic%20Components' },
      ],
    },
  },
  {
    name: 'Sensors',
    desc: 'Ultrasonic, IMUs, Temp & LIDAR',
    href: '/products?category=Sensors',
    icon: <Radar size={16} className="text-rose-500" />,
    detail: {
      heading: 'Sensors & Detectors',
      body: 'High-precision sensors including ultrasonic range finders, 6-axis IMUs, DHT22 temperature & humidity, LIDAR units, IR proximity, hall-effect, and soil moisture sensors for any embedded project.',
      links: [
        { label: 'Browse Sensors', href: '/products?category=Sensors' },
        { label: 'IMU & Gyroscopes', href: '/products?search=IMU' },
      ],
    },
  },
  {
    name: 'Robotics',
    desc: 'Servo motors, steppers & chassis',
    href: '/products?category=Robotics',
    icon: <Settings size={16} className="text-orange-500" />,
    detail: {
      heading: 'Robotics Hardware',
      body: 'NEMA17 & NEMA23 stepper motors, high-torque digital servos, robot arm kits, wheeled chassis, differential drive platforms, and motor driver shields for autonomous robotic systems.',
      links: [
        { label: 'Browse Robotics', href: '/products?category=Robotics' },
        { label: 'Stepper Motors', href: '/products?search=Stepper' },
      ],
    },
  },
  {
    name: 'Drone Components',
    desc: 'Brushless motors, ESCs & frames',
    href: '/products?category=Drone%20Components',
    icon: <Wind size={16} className="text-teal-500" />,
    detail: {
      heading: 'Drone Components',
      body: 'Build custom FPV racing drones and autonomous quadcopters with Emax brushless motors, BLHeli ESCs, carbon fibre frames, flight controllers, and FPV cameras from trusted manufacturers.',
      links: [
        { label: 'Browse Drone Parts', href: '/products?category=Drone%20Components' },
      ],
    },
  },
  {
    name: 'Batteries & Power',
    desc: 'Li-ion, LiPo packs & BMS',
    href: '/products?category=Batteries',
    icon: <Battery size={16} className="text-emerald-500" />,
    detail: {
      heading: 'Batteries & Power Systems',
      body: 'High-discharge LiPo packs for drones, Li-ion cell arrays for EVs, BMS circuit boards, 18650 holders, XT60 connectors, SMPS power supplies and USB charging modules.',
      links: [
        { label: 'Browse Batteries', href: '/products?category=Batteries' },
        { label: 'Power Supplies', href: '/products?category=Power%20Supplies' },
      ],
    },
  },
  {
    name: '3D Printing',
    desc: 'Printers, filaments & nozzles',
    href: '/products?category=3D%20Printing',
    icon: <Printer size={16} className="text-purple-500" />,
    detail: {
      heading: '3D Printing',
      body: 'Creality, Bambu Lab, and Prusa FDM/SLA 3D printers, engineering-grade PLA, ABS, PETG, and TPU filaments, precision brass nozzles, glass beds, and print enclosures.',
      links: [
        { label: 'Browse 3D Printers', href: '/products?category=3D%20Printing' },
        { label: 'Request Print Quote', href: '/contact' },
      ],
    },
  },
  {
    name: 'DIY & STEM Kits',
    desc: 'Learning kits & project bundles',
    href: '/products?category=DIY%20Kits',
    icon: <Boxes size={16} className="text-pink-500" />,
    detail: {
      heading: 'DIY & STEM Kits',
      body: 'All-inclusive starter kits for school robotics clubs, college engineering labs, and hobbyist makers. Arduino starter packs, Raspberry Pi learning sets, soldering kits, and IoT project bundles.',
      links: [
        { label: 'Browse Kits', href: '/products?category=DIY%20Kits' },
      ],
    },
  },
  {
    name: 'EV Components',
    desc: 'Geared motors, chargers & controllers',
    href: '/products?category=EV%20Components',
    icon: <Car size={16} className="text-red-500" />,
    detail: {
      heading: 'EV Components',
      body: 'Brushless DC hub motors, planetary gearbox assemblies, BLDC controllers, regenerative charging units, smart BMS boards, and throttle sensors for electric bikes, scooters, and custom EV builds.',
      links: [
        { label: 'Browse EV Parts', href: '/products?category=EV%20Components' },
      ],
    },
  },
  {
    name: 'Measurement Tools',
    desc: 'Oscilloscopes & multimeters',
    href: '/products?category=Measurement%20Tools',
    icon: <Gauge size={16} className="text-yellow-600" />,
    detail: {
      heading: 'Measurement & Test Equipment',
      body: 'Digital oscilloscopes, USB logic analyzers, precision multimeters, LCR meters, function generators, and benchtop power supplies from Rigol, UNI-T, and OWON for hardware debugging.',
      links: [
        { label: 'Browse Test Gear', href: '/products?category=Measurement%20Tools' },
      ],
    },
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryItem>(CATEGORIES[0]);

  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegaOpen(true);
  };

  const closeMega = () => {
    closeTimer.current = setTimeout(() => setIsMegaOpen(false), 120);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Contact', href: '/contact' },
  ];

  const active = activeCategory;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-navbar shadow-md py-2' : 'bg-transparent py-2 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <Image src="/os_logo.png" alt="Ocean Student Projects" width={150} height={100} className="h-20 w-auto md:h-24" priority />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 z-50">

            {/* Home */}
            <Link
              href="/"
              className={`text-sm font-bold tracking-wide text-foreground/80 hover:text-foreground relative py-1 transition-colors ${pathname === '/' ? 'text-foreground' : ''}`}
            >
              Home
              {pathname === '/' && (
                <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
            </Link>

            {/* Products — Mega Menu Trigger */}
            <div
              ref={triggerRef}
              className="relative py-4"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <div className={`text-sm font-bold tracking-wide text-foreground/80 hover:text-foreground relative py-1 transition-all flex items-center gap-1 cursor-default select-none ${pathname.startsWith('/products') ? 'text-foreground' : ''}`}>
                <span>Products</span>
                <ChevronDown size={13} className={`transition-transform duration-300 ${isMegaOpen ? 'rotate-180 text-primary' : ''}`} />
                {pathname.startsWith('/products') && (
                  <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </div>

              {/* ── Mega Menu Panel ── */}
              <AnimatePresence>
                {isMegaOpen && (
                  <motion.div
                    ref={megaRef}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-card border border-border/40 rounded-2xl shadow-2xl overflow-hidden z-50 flex"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
                  >
                    {/* LEFT — Category List */}
                    <div className="w-64 flex-shrink-0 border-r border-border/30 py-4 px-3 flex flex-col gap-1 overflow-y-auto max-h-[480px] bg-background/50">
                      {CATEGORIES.map((cat) => {
                        const isActive = activeCategory.name === cat.name;
                        return (
                          <button
                            key={cat.name}
                            onMouseEnter={() => setActiveCategory(cat)}
                            onClick={() => { setIsMegaOpen(false); router.push(cat.href); }}
                            className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left transition-all group/cat ${
                              isActive
                                ? 'bg-primary shadow-md shadow-primary/20'
                                : 'hover:bg-muted/60'
                            }`}
                          >
                            {/* Large circular icon */}
                            <span className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border ${
                              isActive
                                ? 'bg-white/20 border-white/30'
                                : 'bg-muted/60 border-border/40 group-hover/cat:bg-primary/10 group-hover/cat:border-primary/20'
                            }`}>
                              {React.cloneElement(cat.icon as React.ReactElement<any>, {
                                size: 17,
                                className: isActive ? 'text-white' : (cat.icon as React.ReactElement<any>).props.className,
                              })}
                            </span>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className={`text-sm font-bold leading-snug truncate ${
                                isActive ? 'text-white' : 'text-foreground'
                              }`}>
                                {cat.name}
                              </span>
                              <span className={`text-[10px] leading-tight truncate mt-0.5 ${
                                isActive ? 'text-white/75' : 'text-muted-foreground'
                              }`}>
                                {cat.desc}
                              </span>
                            </div>
                            <ChevronRight size={13} className={`flex-shrink-0 transition-all ${
                              isActive ? 'text-white/80 translate-x-0.5' : 'text-muted-foreground/40 group-hover/cat:text-muted-foreground group-hover/cat:translate-x-0.5'
                            }`} />
                          </button>
                        );
                      })}
                    </div>                      {/* RIGHT — Detail Panel */}
                    <div className="flex-1 p-7 flex flex-col justify-between bg-card">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={active.name}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.18 }}
                          className="flex flex-col gap-5 h-full"
                        >
                          {/* Icon + Heading row */}
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                              {React.cloneElement(active.icon as React.ReactElement<{ size?: number }>, {
                                size: 22,
                              })}
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-foreground leading-tight">
                                {active.detail.heading}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                                {active.detail.body}
                              </p>
                            </div>
                          </div>

                          {/* 2-column action button grid */}
                          <div className="grid grid-cols-2 gap-2.5 mt-auto">
                            {active.detail.links.map((link, i) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMegaOpen(false)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all group/btn ${
                                  i === 0
                                    ? 'bg-primary/5 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary'
                                    : 'bg-muted/30 border-border/50 text-foreground/70 hover:bg-muted hover:text-foreground'
                                }`}
                              >
                                <ChevronRight size={13} className="transition-transform group-hover/btn:translate-x-0.5 flex-shrink-0" />
                                <span className="truncate">{link.label}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className={`text-sm font-bold tracking-wide text-foreground/80 hover:text-foreground relative py-1 transition-colors ${pathname === '/contact' ? 'text-foreground' : ''}`}
            >
              Contact
              {pathname === '/contact' && (
                <motion.div layoutId="navActiveLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer" title="Search">
              <Search size={18} />
            </button>

            <button onClick={() => setIsWishlistOpen(true)} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-rose-500 transition-all cursor-pointer relative" title="Wishlist">
              <Heart size={18} className={wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white font-extrabold text-[8px] rounded-full w-4 h-4 flex items-center justify-center border border-card">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button onClick={() => setIsCartOpen(true)} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-all cursor-pointer relative" title="Cart">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white font-extrabold text-[8px] rounded-full w-4 h-4 flex items-center justify-center border border-card">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer hidden sm:inline-flex" title="Account">
              <User size={18} />
            </button>

            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer md:hidden" aria-label="Open menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={navLinks} />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="w-full max-w-xl bg-card border border-border/40 rounded-2xl shadow-2xl p-6 relative text-left"
            >
              <button onClick={() => setIsSearchOpen(false)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <X size={18} />
              </button>
              <h3 className="text-sm font-black text-primary uppercase tracking-wider mb-1">Search Catalog</h3>
              <p className="text-xs text-muted-foreground mb-4">Type product name, SKU, brand, or category.</p>
              <SearchBar
                onSearch={(term) => {
                  setIsSearchOpen(false);
                  router.push(`/products?search=${encodeURIComponent(term)}`);
                }}
                placeholder="Search Arduino, Sensors, Stepper Motors..."
                className="w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
