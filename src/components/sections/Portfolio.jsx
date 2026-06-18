import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowUpRight, Filter } from 'lucide-react';
import { projects, categories } from '../../data/projectsData';
import Badge from '../ui/Badge';
import "../../styles/Portfolio.css";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const gridRef = useRef(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, filteredProjects.length));
  };

  const openLightbox = (project) => {
    setSelectedProject(project);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('portfolio__item--visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const items = gridRef.current?.querySelectorAll('.portfolio__item');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [visibleProjects]);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio__header">
          <span className="portfolio__label">Selected Work</span>
          <h2 className="portfolio__title">Projects that<br />speak for themselves.</h2>
        </div>

        <div className="portfolio__filters">
          <Filter size={16} className="portfolio__filters-icon" />
          {categories.map(cat => (
            <button
              key={cat}
              className={`portfolio__filter ${activeCategory === cat ? 'portfolio__filter--active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(9);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio__grid" ref={gridRef}>
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio__item"
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => openLightbox(project)}
            >
              <div className="portfolio__image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="portfolio__image"
                  loading="lazy"
                />
                <div className="portfolio__overlay">
                  <span className="portfolio__overlay-icon">
                    <ArrowUpRight size={24} />
                  </span>
                </div>
              </div>
              <div className="portfolio__info">
                <div className="portfolio__meta">
                  <Badge>{project.category}</Badge>
                  <span className="portfolio__year">{project.year}</span>
                </div>
                <h3 className="portfolio__project-title">{project.title}</h3>
                <p className="portfolio__client">{project.client}</p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="portfolio__load-more">
            <button className="portfolio__load-btn" onClick={loadMore}>
              Load More Projects
            </button>
          </div>
        )}
      </div>

      <div className={`lightbox ${isLightboxOpen ? 'lightbox--open' : ''}`} onClick={closeLightbox}>
        <button className="lightbox__close" onClick={closeLightbox}>
          <X size={24} />
        </button>
        {selectedProject && (
          <div className="lightbox__content" onClick={e => e.stopPropagation()}>
            <img src={selectedProject.image} alt={selectedProject.title} className="lightbox__image" />
            <div className="lightbox__details">
              <Badge>{selectedProject.category}</Badge>
              <h3 className="lightbox__title">{selectedProject.title}</h3>
              <p className="lightbox__description">{selectedProject.description}</p>
              <div className="lightbox__meta">
                <span>Client: {selectedProject.client}</span>
                <span>Year: {selectedProject.year}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
