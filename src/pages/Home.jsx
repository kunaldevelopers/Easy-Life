import React from "react";
import { Helmet } from "react-helmet-async";
import { useHomepageConfig } from "../context/HomepageConfigContext";
import Hero from "../components/home/Hero";
import CategoriesGrid from "../components/home/CategoriesGrid";
import TopRatedCarousel from "../components/home/TopRatedCarousel";
import FreshRecommendations from "../components/home/FreshRecommendations";
import ServiceSlider from "../components/home/ServiceSlider";
import CTASection from "../components/home/CTASection";

const Home = () => {
  const { homepageConfig } = useHomepageConfig();
  const { serviceSlider } = homepageConfig;

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
        <CategoriesGrid />
        <TopRatedCarousel />
        <FreshRecommendations />
        {serviceSlider.enabled && serviceSlider.showOnHomepage && (
          <ServiceSlider
            title={serviceSlider.title}
            description={serviceSlider.description}
            selectedCategory={serviceSlider.selectedCategory}
            maxItems={serviceSlider.maxItems}
            isRandomized={serviceSlider.isRandomized}
          />
        )}
        <CTASection />
      </main>
    </>
  );
};

export default Home;
