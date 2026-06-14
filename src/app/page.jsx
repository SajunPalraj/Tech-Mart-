

import React from 'react';
import ImageSlider from '@/components/ImageSlider.jsx';
import Categories from '@/components/Categories.jsx';
import DownSlider from '@/components/DownSlider.jsx';
import FeaturedProducts from '@/components/FeaturedProducts.jsx';
import BrandPanel from '@/components/BrandPanel.jsx';

export default function page() {
  return (
    <>
      <ImageSlider />
      <Categories />
      <DownSlider />
      <FeaturedProducts />
      <BrandPanel />
    </>
  );
}