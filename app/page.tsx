import React from 'react';
import Hero from './components/Hero';

import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import ServicesSection from './components/ServicesSection';
import Features from './components/Features';
import BlogSection from './components/BlogSection';
import YoutubeSection from './components/YoutubeSection';

import CommunityHighlights from './components/CommunityHighlights';
import Testimonials from './components/Testimonials';
import SocialCards from './components/SocialCards';
import Newsletter from './components/Newsletter';

export const metadata = {
  title: 'Ocean Student Projects | Premium Robotics & Maker Marketplace',
  description: "India's largest marketplace for robotics, electronics components, IoT, PCB prototyping, and 3D printing services.",
  openGraph: {
    title: 'Ocean Student Projects | Premium Robotics & Maker Marketplace',
    description: 'Minimalist glassmorphism e-commerce experience showcasing top-tier robotics hardware and custom maker services.',
    type: 'website'
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Premium Hero Banner Slider */}
      <Hero />



      {/* Categories Grid */}
      <Categories />

      {/* Dynamic Product Showcase (Tabs) */}
      <FeaturedProducts />

      {/* Custom Engineering Services */}
      <ServicesSection />

      {/* Why Choose Us Features */}
      <Features />

      {/* Latest Tutorials Blog Section */}
      <BlogSection />

      {/* YouTube Technical Video Section */}
      <YoutubeSection />

      {/* Community Project Highlights */}
      <CommunityHighlights />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Social Media Community Gallery */}
      <SocialCards />

      {/* Engagement Newsletter Drawer */}
      <Newsletter />
    </main>
  );
}
