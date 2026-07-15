"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Shop Catalog',
      links: [
        { label: 'Development Boards', href: '/products?category=Development%20Boards' },
        { label: 'Sensors', href: '/products?category=Sensors' },
        { label: 'Robotics', href: '/products?category=Robotics' },
        { label: 'IoT Modules', href: '/products?category=IoT%20Modules' },
        { label: '3D Printing', href: '/products?category=3D%20Printing' },
      ]
    },
    {
      title: 'Customer Services',
      links: [
        { label: 'Shipping Policy', href: '/contact' },
        { label: 'Returns & Warranties', href: '/contact' },
        { label: 'FAQs & Help', href: '/contact' },
        { label: 'GST Invoice Request', href: '/contact' },
      ]
    },
    {
      title: 'Company Info',
      links: [
        { label: 'About Ocean Student Projects', href: '/' },
        { label: 'Engineering Services', href: '/#services' },
        { label: 'PCB Manufacturing', href: '/contact' },
        { label: 'Contact Us', href: '/contact' },
      ]
    }
  ];

  const socialIcons = [
    { icon: <InstagramIcon />, href: 'https://instagram.com' },
    { icon: <TwitterIcon />, href: 'https://twitter.com' },
    { icon: <FacebookIcon />, href: 'https://facebook.com' },
    { icon: <GithubIcon />, href: 'https://github.com' }
  ];

  return (
    <footer className="bg-card border-t border-border/40 text-foreground pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/os_logo.png" alt="Ocean Student Projects" width={180} height={120} className="object-contain" />
            </Link>
            <p className="text-xs text-muted-foreground font-light max-w-sm leading-relaxed">
              India's trusted marketplace for electronics components, robotics hardware, IoT modules, development boards and rapid manufacturing services.
            </p>
            <div className="space-y-2 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                <span>No.12, Shop No.7, Narasingapuram Street, Mount Road, Chennai - 600 002.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary flex-shrink-0" />
                <a href="tel:7338975699" className="hover:text-primary transition-colors">+91 73389 75699</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary flex-shrink-0" />
                <a href="mailto:oceanstudentprojects@gmail.com" className="hover:text-primary transition-colors">oceanstudentprojects@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Links Sets */}
          {footerLinks.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary hover:underline transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="h-px bg-border/40 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-muted-foreground font-semibold">
            &copy; {currentYear} Ocean Student Projects. All rights reserved.
          </span>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialIcons.map((soc, idx) => (
              <motion.a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="w-8 h-8 rounded-full border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-primary flex items-center justify-center transition-all bg-muted/20"
              >
                {soc.icon}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
