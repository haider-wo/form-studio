import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import "../../styles/BlogPostCard.css";

const BlogPostCard = ({ post, variant = 'default' }) => {
  return (
    <article className={`blog-post-card blog-post-card--${variant}`}>
      <Link to={`/blog/${post.id}`} className="blog-post-card__image-link">
        <div className="blog-post-card__image-wrapper">
          <img src={post.image} alt={post.title} className="blog-post-card__image" loading="lazy" />
        </div>
      </Link>
      <div className="blog-post-card__content">
        <div className="blog-post-card__meta">
          <Link to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="blog-post-card__category-link">
            <Badge variant="outline">{post.category}</Badge>
          </Link>
          <span className="blog-post-card__date">{post.date}</span>
        </div>
        <Link to={`/blog/${post.id}`} className="blog-post-card__title-link">
          <h3 className="blog-post-card__title">{post.title}</h3>
        </Link>
        <p className="blog-post-card__excerpt">{post.excerpt}</p>
        <div className="blog-post-card__footer">
          <span className="blog-post-card__read-time">
            <Clock size={14} />
            {post.readTime}
          </span>
          <Link to={`/blog/${post.id}`} className="blog-post-card__read-more">
            Read More
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
