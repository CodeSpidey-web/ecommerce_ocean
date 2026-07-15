"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

interface CategoryItem {
  name: string;
  count: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'Development Boards',
    count: '6 Products',
    image: '/Raspberry%20Pi%205%20Single%20Board%20Computer%20(8GB).jpg',
    href: '/products?category=Development%20Boards'
  },
  {
    name: 'Sensors',
    count: '3 Products',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=300&auto=format&fit=crop',
    href: '/products?category=Sensors'
  },
  {
    name: 'Robotics',
    count: '3 Products',
    image: '/MG996R%20High%20Torque%20Metal%20Gear%20Servo.jpg',
    href: '/products?category=Robotics'
  },
  {
    name: 'Drone Components',
    count: '2 Products',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=300&auto=format&fit=crop',
    href: '/products?category=Drone%20Components'
  },
  {
    name: 'IoT Modules',
    count: '1 Product',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=300&auto=format&fit=crop',
    href: '/products?category=IoT%20Modules'
  },
  {
    name: 'Batteries',
    count: '2 Products',
    image: '/Panasonic%20NCR18650B%20Li-ion%20Cell%20(3.7V%203400mAh).jpg',
    href: '/products?category=Batteries'
  },
  {
    name: 'Power Supplies',
    count: '1 Product',
    image: '/Mean%20Well%20LRS-350-24%20Power%20Supply%20(24V%2014.6A).jpg',
    href: '/products?category=Power%20Supplies'
  },
  {
    name: '3D Printing',
    count: '3 Products',
    image: '/Creality%20Ender%203%20V3%20CoreXZ%203D%20Printer.jpg',
    href: '/products?category=3D%20Printing'
  }
];

export default function Categories() {
  return (
    <section className="py-20 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <SectionTitle
          title="Shop by Maker Category"
          subtitle="Explore our top-tier catalog of handpicked robotics, IoT, and custom fabrication components, engineered for maximum performance."
          badge="Browse Catalog"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative aspect-square rounded-[20px] overflow-hidden border border-border/40 group shadow-lg"
            >
              <Link href={item.href} className="relative block w-full h-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
                
                <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1 text-white">
                  <h3 className="font-extrabold text-base md:text-lg tracking-tight leading-none group-hover:text-primary transition-colors text-left">
                    {item.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300 block text-left">
                    {item.count}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
