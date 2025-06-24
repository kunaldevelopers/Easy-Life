import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import CategoriesGrid from '../components/home/CategoriesGrid';
import TopRatedCarousel from '../components/home/TopRatedCarousel';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Easy Life Gangtok - Your Local Business Directory</title>
        <meta name="description" content="Find the best local businesses, services, restaurants, and hotels in Gangtok. Your trusted directory for everything you need in Sikkim's capital." />
        <meta name="keywords" content="Gangtok businesses, local services, restaurants Gangtok, hotels Sikkim, electrician plumber Gangtok" />
        <meta property="og:title" content="Easy Life Gangtok - Your Local Business Directory" />
        <meta property="og:description" content="Find the best local businesses, services, restaurants, and hotels in Gangtok." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://easylife-gangtok.com" />
      </Helmet>
      
      <main>
        <Hero />
        <CategoriesGrid />
        <TopRatedCarousel />
        <CTASection />
      </main>
    </>
  );
};

export default Home;