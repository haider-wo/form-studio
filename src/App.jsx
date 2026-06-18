import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import SinglePost from './pages/SinglePost';
import NotFound from './pages/NotFound';
import './styles/tokens.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/category/:categorySlug" element={<BlogPage />} />
        <Route path="/blog/:id" element={<SinglePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
