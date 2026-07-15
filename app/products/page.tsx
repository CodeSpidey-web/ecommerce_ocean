import React from 'react';
import ProductDetailView from '../components/ProductDetailView';
import ProductListingView from '../components/ProductListingView';

interface PageProps {
  searchParams: Promise<{
    id?: string;
    category?: string;
    brand?: string;
    search?: string;
  }>;
}

export const metadata = {
  title: 'Catalog & Gear | Antigravity Electronics',
  description: 'Browse our high-fidelity electronic portfolio. Filter by brand, category, ratings, and price, with real-time comparisons and interactive 360-degree views.'
};

export default async function ProductsPage({ searchParams }: PageProps) {
  // Await the searchParams promise as per Next.js 15 App Router requirements
  const resolvedParams = await searchParams;
  const productId = resolvedParams.id || '';
  const category = resolvedParams.category || '';
  const brand = resolvedParams.brand || '';
  const search = resolvedParams.search || '';

  // If a specific product ID is requested, show its dedicated detail layout
  if (productId) {
    return <ProductDetailView productId={productId} />;
  }

  // Otherwise, render the main product listing grid with filters
  return (
    <ProductListingView
      initialCategory={category}
      initialBrand={brand}
      initialSearch={search}
    />
  );
}
