import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>LinguaTeach</h3>
            <p>Professional language teaching services for Turkish and English learners.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Me</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/booking">Book a Lesson</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📧 shanazartahyrov@gmail.com</p>
            <p>📱 +62 852-1020-9575</p>
            <p>📍 South Tangerang, Indonesia</p>
          </div>
          
          <div className="footer-section">
            <h4>Languages</h4>
            <p>🇹🇷 Turkish (Native)</p>
            <p>🇬🇧 English (Fluent)</p>
            <p>🇮🇩 Indonesian (Intermediate)</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 LinguaTeach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;