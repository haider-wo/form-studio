import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts, blogCategories, getPostsByCategory } from '../data/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import BlogPostCard from '../components/ui/BlogPostCard';
import SectionTitle from '../components/ui/SectionTitle';
import '../styles/BlogPage.css';

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const { categorySlug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef(null);

  useEffect(() => {
    if (categorySlug) {
      const cat = blogCategories.find(c => 
        c.toLowerCase().replace(/\s+/g, '-') === categorySlug
      );
      setActiveCategory(cat || 'All');
    } else {
      setActiveCategory('All');
    }
    setCurrentPage(1);
  }, [categorySlug]);

  const filteredPosts = getPostsByCategory(activeCategory);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('blog-page__card--visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = gridRef.current?.querySelectorAll('.blog-page__card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [paginatedPosts]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategorySlug = (cat) => {
    return cat.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="blog-page">
        <div className="container blog-page__container">
          <div className="blog-page__main">
            <SectionTitle
              label={activeCategory === 'All' ? 'All Articles' : `${activeCategory} Articles`}
              title={activeCategory === 'All' 
                ? 'Insights on design, creativity, and culture.' 
                : `Posts about ${activeCategory}.`}
              align="left"
            />

            <div className="blog-page__grid" ref={gridRef}>
              {paginatedPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="blog-page__card"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="blog-page__pagination">
                <button
                  className="blog-page__page-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`blog-page__page-btn ${page === currentPage ? 'blog-page__page-btn--active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="blog-page__page-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <aside className="blog-page__sidebar">
            <div className="blog-page__sidebar-section">
              <h3 className="blog-page__sidebar-title">Categories</h3>
              <ul className="blog-page__category-list">
                {blogCategories.map(cat => {
                  const count = cat === 'All' 
                    ? blogPosts.length 
                    : blogPosts.filter(p => p.category === cat).length;
                  const isActive = activeCategory === cat;

                  return (
                    <li key={cat}>
                      <Link
                        to={cat === 'All' ? '/blog' : `/blog/category/${getCategorySlug(cat)}`}
                        className={`blog-page__category-link ${isActive ? 'blog-page__category-link--active' : ''}`}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        <span>{cat}</span>
                        <span className="blog-page__category-count">{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="blog-page__sidebar-section">
              <h3 className="blog-page__sidebar-title">Recent Posts</h3>
              <div className="blog-page__recent-posts">
                {blogPosts.slice(0, 3).map(post => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`} 
                    className="blog-page__recent-post"
                  >
                    <img src={post.image} alt={post.title} className="blog-page__recent-image" />
                    <div className="blog-page__recent-info">
                      <span className="blog-page__recent-category">{post.category}</span>
                      <h4 className="blog-page__recent-title">{post.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
