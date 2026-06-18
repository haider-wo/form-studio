import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { blogPosts } from '../../data/blogData';
import SectionTitle from '../ui/SectionTitle';
import Badge from '../ui/Badge';
import "../../styles/Blog.css";

const Blog = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('blog__card--visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = cardsRef.current?.querySelectorAll('.blog__card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" className="blog">
      <div className="container">
        <SectionTitle
          label="Insights"
          title="Thoughts on design, creativity, and culture."
          align="center"
        />

        <div className="blog__grid" ref={cardsRef}>
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="blog__card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="blog__image-wrapper">
                <img src={post.image} alt={post.title} className="blog__image" />
              </div>
              <div className="blog__content">
                <div className="blog__meta">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="blog__date">{post.date}</span>
                </div>
                <h3 className="blog__title">{post.title}</h3>
                <p className="blog__excerpt">{post.excerpt}</p>
                <div className="blog__footer">
                  <span className="blog__read-time">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                  <a href="#" className="blog__read-more">
                    Read More
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
