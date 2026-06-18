import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Button from '../ui/Button';
import "../../styles/TypewriterHero.css";

const WORDS = ['brands', 'websites', 'identities', 'experiences', 'products'];
const TYPING_SPEED = 120;
const DELETING_SPEED = 80;
const PAUSE_BEFORE_DELETE = 2000;
const PAUSE_BEFORE_TYPE = 400;

const TypewriterHero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const currentWord = WORDS[currentWordIndex];

    if (isPaused) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Word complete, pause before deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, PAUSE_BEFORE_DELETE);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Word fully deleted, move to next
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
          }, PAUSE_BEFORE_TYPE);
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentWordIndex]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = () => {
    document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="typewriter-hero" ref={containerRef}>
      <div className="typewriter-hero__diagonal-line" aria-hidden="true" />

      <div className="typewriter-hero__marquee" aria-hidden="true">
        <div className="typewriter-hero__marquee-track">
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
          <span>FORM STUDIO</span>
        </div>
      </div>

      <div className="container typewriter-hero__content">
        <div className="typewriter-hero__label">
          <span className="typewriter-hero__label-text">Graphic Design Studio</span>
        </div>

        <h1 className="typewriter-hero__title">
          <span className="typewriter-hero__static">We design</span>
          <br />
          <span className="typewriter-hero__typewriter">
            <span className="typewriter-hero__word">{displayText}</span>
            <span className={`typewriter-hero__cursor ${showCursor ? 'typewriter-hero__cursor--visible' : ''}`} />
          </span>
          <br />
          <span className="typewriter-hero__static">that refuse to</span>
          <br />
          <span className="typewriter-hero__static">blend in.</span>
        </h1>

        <div className="typewriter-hero__cta">
          <Button variant="primary" size="lg" onClick={scrollToWork}>
            View Our Work
            <ArrowRight size={20} />
          </Button>
          <Button variant="secondary" size="lg" href="#contact">
            Start a Project
          </Button>
        </div>
      </div>

      <div className="typewriter-hero__scroll-indicator">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default TypewriterHero;
