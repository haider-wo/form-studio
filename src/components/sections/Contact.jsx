import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import Button from '../ui/Button';
import SectionTitle from '../ui/SectionTitle';
import "../../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionTitle
          label="Get in Touch"
          title="Let's create something extraordinary together."
          align="center"
        />

        <div className="contact__grid">
          <div className="contact__info">
            <h3 className="contact__info-title">Start a conversation</h3>
            <p className="contact__info-text">
              Have a project in mind? We'd love to hear about it. Tell us what you're building and we'll get back to you within 24 hours.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <Mail size={20} />
                <span>hello@formstudio.co</span>
              </div>
              <div className="contact__detail">
                <Phone size={20} />
                <span>+1 (555) 234-5678</span>
              </div>
              <div className="contact__detail">
                <MapPin size={20} />
                <span>Brooklyn, New York</span>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="project">Project Type</label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="branding">Brand Identity</option>
                <option value="web">Web Design</option>
                <option value="packaging">Packaging</option>
                <option value="motion">Motion Design</option>
                <option value="editorial">Editorial</option>
                <option value="other">Something Else</option>
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="message">Tell us about your project</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="What are you building? What's your timeline? Budget?"
              />
            </div>

            <Button variant="primary" size="lg" className="contact__submit">
              {isSubmitted ? 'Message Sent!' : 'Send Message'}
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
