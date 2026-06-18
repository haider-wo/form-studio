import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonialsData';
import SectionTitle from '../ui/SectionTitle';
import "../../styles/Testimonials.css";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <SectionTitle
          label="Client Love"
          title="Don't take our word for it."
          align="center"
        />

        <div className="testimonials__slider">
          <button className="testimonials__nav testimonials__nav--prev" onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft size={24} />
          </button>

          <div className="testimonials__content">
            <Quote size={40} className="testimonials__quote-icon" />
            <blockquote className="testimonials__quote">
              {current.quote}
            </blockquote>
            <div className="testimonials__author">
              <div className="testimonials__avatar">{current.avatar}</div>
              <div className="testimonials__author-info">
                <span className="testimonials__author-name">{current.author}</span>
                <span className="testimonials__author-role">{current.role}</span>
              </div>
            </div>
          </div>

          <button className="testimonials__nav testimonials__nav--next" onClick={next} aria-label="Next testimonial">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials__dot ${index === activeIndex ? 'testimonials__dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
