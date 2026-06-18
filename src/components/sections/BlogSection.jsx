import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogData';
import SectionTitle from '../ui/SectionTitle';
import BlogPostCard from '../ui/BlogPostCard';
import Button from '../ui/Button';
import '../../styles/BlogSection.css';

const BlogSection = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('blog-section__card--visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = cardsRef.current?.querySelectorAll('.blog-section__card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Show only first 3 posts on home
  const homePosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <SectionTitle
          label="Insights"
          title="Thoughts on design, creativity, and culture."
          align="center"
        />

        <div className="blog-section__grid" ref={cardsRef}>
          {homePosts.map((post, index) => (
            <div
              key={post.id}
              className="blog-section__card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>

        <div className="blog-section__cta">
          <Link to="/blog">
            <Button variant="outline" size="lg">
              View All Articles
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
