import React, { useEffect, useRef } from 'react';
import { team } from '../../data/teamData';
import SectionTitle from '../ui/SectionTitle';
import "../../styles/Team.css";

const Team = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('team__card--visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = cardsRef.current?.querySelectorAll('.team__card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="team">
      <div className="container">
        <SectionTitle
          label="The Crew"
          title="Small team. Big impact."
          align="center"
        />

        <div className="team__grid" ref={cardsRef}>
          {team.map((member, index) => (
            <div
              key={member.id}
              className="team__card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="team__image-wrapper">
                <img src={member.image} alt={member.name} className="team__image" />
                <div className="team__overlay" />
              </div>
              <div className="team__info">
                <h3 className="team__name">{member.name}</h3>
                <span className="team__role">{member.role}</span>
                <p className="team__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
