import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import '../styles/NotFound.css';
import CustomCursor from '../components/CustomCursor';

const NotFound = () => {
  return (
    <>
    <CustomCursor />
    <div className="not-found">
      <div className="not-found__content">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" href="/">
          <ArrowLeft size={18} />
          Back to Home
        </Button>
      </div>
    </div>
    </>
  );
};

export default NotFound;
