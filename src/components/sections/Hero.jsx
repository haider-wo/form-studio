import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Button from '../components/ui/Button';
import "../../styles/Hero.css";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero__animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    [titleRef, subtitleRef, ctaRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToWork = () => {
    document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__diagonal-line" aria-hidden="true" />

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
        </div>
      </div>

      <div className="container hero__content">
        <div className="hero__label" ref={subtitleRef}>
          <span className="hero__label-text">Graphic Design Studio</span>
        </div>

        <h1 className="hero__title" ref={titleRef}>
          We design<br />
          <span className="hero__title-accent">brands</span> that<br />
          refuse to<br />
          blend in.
        </h1>

        <div className="hero__cta" ref={ctaRef}>
          <Button variant="primary" size="lg" onClick={scrollToWork}>
            View Our Work
            <ArrowRight size={20} />
          </Button>
          <Button variant="secondary" size="lg" href="#contact">
            Start a Project
          </Button>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;
