import React from 'react';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import TypewriterHero from '../components/sections/TypewriterHero';
import Portfolio from '../components/sections/Portfolio';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import Team from '../components/sections/Team';
import BlogSection from '../components/sections/BlogSection';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <TypewriterHero />
        <Portfolio />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <Team />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
