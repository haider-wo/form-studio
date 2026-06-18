import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { blogPosts, getPostById, getPostsByCategory } from '../data/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Badge from '../components/ui/Badge';
import '../styles/SinglePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const post = getPostById(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!post) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <main className="single-post">
          <div className="container single-post__not-found">
            <h1>Post not found</h1>
            <Link to="/blog">
              <button className="single-post__back-btn">
                <ArrowLeft size={18} />
                Back to Blog
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = getPostsByCategory(post.category)
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="single-post">
        <div className="single-post__hero">
          <img src={post.image} alt={post.title} className="single-post__hero-image" />
        </div>

        <div className="container single-post__container">
          <div className="single-post__content">
            <div className="single-post__meta">
              <Link to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <Badge>{post.category}</Badge>
              </Link>
              <span className="single-post__meta-item">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="single-post__meta-item">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <h1 className="single-post__title">{post.title}</h1>

            <div className="single-post__author">
              <div className="single-post__author-avatar">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="single-post__author-info">
                <span className="single-post__author-name">{post.author}</span>
                <span className="single-post__author-role">{post.authorRole}</span>
              </div>
            </div>

            <div className="single-post__body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            <div className="single-post__navigation">
              {prevPost && (
                <Link to={`/blog/${prevPost.id}`} className="single-post__nav-link single-post__nav-link--prev">
                  <ArrowLeft size={18} />
                  <div>
                    <span className="single-post__nav-label">Previous</span>
                    <span className="single-post__nav-title">{prevPost.title}</span>
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link to={`/blog/${nextPost.id}`} className="single-post__nav-link single-post__nav-link--next">
                  <div>
                    <span className="single-post__nav-label">Next</span>
                    <span className="single-post__nav-title">{nextPost.title}</span>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              )}
            </div>
          </div>

          <aside className="single-post__sidebar">
            <div className="single-post__sidebar-section">
              <h3 className="single-post__sidebar-title">About the Author</h3>
              <div className="single-post__author-card">
                <div className="single-post__author-card-avatar">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="single-post__author-card-name">{post.author}</span>
                  <span className="single-post__author-card-role">{post.authorRole}</span>
                </div>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="single-post__sidebar-section">
                <h3 className="single-post__sidebar-title">Related Posts</h3>
                <div className="single-post__related-posts">
                  {relatedPosts.map(related => (
                    <Link 
                      key={related.id} 
                      to={`/blog/${related.id}`} 
                      className="single-post__related-post"
                    >
                      <img src={related.image} alt={related.title} className="single-post__related-image" />
                      <div className="single-post__related-info">
                        <span className="single-post__related-category">{related.category}</span>
                        <h4 className="single-post__related-title">{related.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SinglePost;
