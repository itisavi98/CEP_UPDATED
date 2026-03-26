// frontend/src/views/pages/MainSite.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import HeroSlider        from '../components/HeroSlider';
import About             from '../components/About';
import Commercial        from '../components/Commercial';
import Residential       from '../components/Residential';
import Plotting          from '../components/Plotting';
import OngoingProjects   from '../components/OngoingProjects';
import CompletedProjects from '../components/CompletedProjects';
import Clients           from '../components/Clients';
import Gallery           from '../components/Gallery';
import FAQ               from '../components/FAQ';
import Contact           from '../components/Contact';
import Footer            from '../components/Footer';
import WhatsAppButton    from '../components/WhatsAppButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import SEO, { StructuredData } from '../components/SEO';
import PropertyListings from '../components/PropertyListings';

function MainSite() {
  return (
    <>
      <SEO
        title="Premium Real Estate Properties | DreamLand Realty"
        description="Discover luxury residential and commercial properties with world-class amenities. Trusted real estate developer with 25+ years of experience. RERA approved projects."
        keywords="real estate, luxury homes, residential projects, apartments, villas, ongoing projects, completed projects, RERA approved"
      />
      <StructuredData />

      <Navbar />
      <HeroSlider />
      <About />
      <PropertyListings />
      <OngoingProjects />
      <CompletedProjects />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
}

export default MainSite;