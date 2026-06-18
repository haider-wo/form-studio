import React, { useEffect, useRef } from 'react';
import { processSteps } from '../../data/processData';
import SectionTitle from '../ui/SectionTitle';
import "../../styles/Process.css";

const Process = () => {
  const stepsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('process__step--visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    const steps = stepsRef.current?.querySelectorAll('.process__step');
    steps?.forEach(step => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="process">
      <div className="container">
        <SectionTitle
          label="How We Work"
          title="A proven process for exceptional results."
          align="center"
        />

        <div className="process__steps" ref={stepsRef}>
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className="process__step"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <span className="process__number">{step.number}</span>
              <div className="process__content">
                <h3 className="process__title">{step.title}</h3>
                <p className="process__description">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="process__connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
