import React from "react";
import { Helmet } from "react-helmet-async";
import { useWebsiteConfig } from "../context/WebsiteConfigContext";
import Hero from "../components/home/Hero";
import VideoSection from "../components/home/VideoSection";
import CategoryShopping from "../components/home/CategoryShopping";
import TopRatedCarousel from "../components/home/TopRatedCarousel";
import FreshRecommendations from "../components/home/FreshRecommendations";
import CTASection from "../components/home/CTASection";

const Home = () => {
  const { websiteConfig } = useWebsiteConfig();

  return (
    <>
      <Helmet>
        <title>Easy Life Gangtok - Your Local Business Directory</title>
        <meta
          name="description"
          content="Find the best local businesses, services, restaurants, and hotels in Gangtok. Your trusted directory for everything you need in Sikkim's capital."
        />
        <meta
          name="keywords"
          content="Gangtok businesses, local services, restaurants Gangtok, hotels Sikkim, electrician plumber Gangtok"
        />
        <meta
          property="og:title"
          content="Easy Life Gangtok - Your Local Business Directory"
        />
        <meta
          property="og:description"
          content="Find the best local businesses, services, restaurants, and hotels in Gangtok."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://easylife-gangtok.com" />
      </Helmet>

      <main>
        <Hero />
        <VideoSection />
        <CategoryShopping />
        <TopRatedCarousel />
        <FreshRecommendations />
        <CTASection />
      </main>
    </>
  );
};

export default Home;
