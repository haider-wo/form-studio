import React, { useEffect, useRef, useState } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    addInteractiveListeners();
    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    let rafId;
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? 'custom-cursor--visible' : ''} ${isHovering ? 'custom-cursor--hover' : ''} ${isClicking ? 'custom-cursor--click' : ''}`}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'custom-cursor-dot--visible' : ''} ${isHovering ? 'custom-cursor-dot--hover' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
