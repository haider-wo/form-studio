import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import "../../styles/About.css";

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about--visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <span className="about__label">About Us</span>
            <h2 className="about__title">
              We believe design is the <span className="about__highlight">most powerful</span> form of communication.
            </h2>
            <p className="about__text">
              FORM Studio is a graphic design agency built for the modern era. We combine strategic thinking with bold visual execution to create brands, websites, and experiences that don't just look good — they perform.
            </p>
            <p className="about__text">
              From startups finding their voice to established brands seeking reinvention, we partner with ambitious clients who understand that great design is an investment, not an expense.
            </p>
            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">150+</span>
                <span className="about__stat-label">Projects Delivered</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">12</span>
                <span className="about__stat-label">Years of Experience</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">40+</span>
                <span className="about__stat-label">Industry Awards</span>
              </div>
            </div>
            <Button variant="primary" href="#contact">
              Work With Us
              <ArrowRight size={18} />
            </Button>
          </div>
          <div className="about__visual">
            <div className="about__image-stack">
              <div className="about__image about__image--back" />
              <div className="about__image about__image--front" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
