import React, { useEffect, useRef } from 'react';
import { Palette, Monitor, Box, Play, BookOpen, PenTool } from 'lucide-react';
import { services } from '../../data/servicesData';
import SectionTitle from '../ui/SectionTitle';
import "../../styles/Services.css";

const iconMap = { Palette, Monitor, Box, Play, BookOpen, PenTool };

const Services = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('services__card--visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = cardsRef.current?.querySelectorAll('.services__card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services">
      <div className="container">
        <SectionTitle
          label="What We Do"
          title="Services built for brands that want to stand out."
          align="center"
        />

        <div className="services__grid" ref={cardsRef}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="services__card"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="services__icon">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-description">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
