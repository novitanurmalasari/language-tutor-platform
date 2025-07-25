import React from 'react';
import './AboutPage.css';
import shanazarPhoto from '../assets/images/shanazar.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <section className="about-hero">
          <h1>About Me</h1>
          <p className="lead">
            Passionate language educator dedicated to making learning enjoyable and effective
          </p>
        </section>
        
        <section className="about-content">
          <div className="about-grid">
            <div className="about-image">
              <img 
                src={shanazarPhoto}
                alt="Teacher Profile" 
                className="profile-image"
              />
            </div>
            
            <div className="about-text">
              <h2>Hi, I'm Shanazar Tahyrov</h2>
              <p>
                With over 10 years of experience teaching Turkish and English, 
                I've helped hundreds of students achieve their language learning goals. 
                My journey in language education began when I realized the power of 
                communication in connecting cultures and opening opportunities.
              </p>
              
              <h3>My Teaching Philosophy</h3>
              <p>
                I believe that language learning should be an enjoyable journey, not a 
                tedious task. My approach combines traditional teaching methods with 
                modern interactive techniques, ensuring that each lesson is engaging, 
                practical, and tailored to your specific needs.
              </p>
              
              <div className="qualifications">
                <h3>Qualifications & Certifications</h3>
                <ul>
                  <li>🎓 Master's Degree in Applied Linguistics</li>
                  <li>📜 TESOL Certified (Teaching English to Speakers of Other Languages)</li>
                  <li>🏆 Turkish Language Teaching Certificate</li>
                  <li>💼 10+ years of professional teaching experience</li>
                  <li>🌍 Multicultural teaching experience in 5+ countries</li>
                </ul>
              </div>
              
              <div className="teaching-methods">
                <h3>My Teaching Methods</h3>
                <div className="method-cards">
                  <div className="method-card">
                    <h4>Communicative Approach</h4>
                    <p>Focus on real-life communication and practical usage</p>
                  </div>
                  <div className="method-card">
                    <h4>Task-Based Learning</h4>
                    <p>Learn through completing meaningful tasks</p>
                  </div>
                  <div className="method-card">
                    <h4>Cultural Integration</h4>
                    <p>Language learning with cultural context</p>
                  </div>
                  <div className="method-card">
                    <h4>Technology Enhanced</h4>
                    <p>Modern tools for effective learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="achievements">
          <h2>Achievements & Recognition</h2>
          <div className="achievements-grid">
            <div className="achievement">
              <div className="achievement-icon">🏅</div>
              <h3>Best Language Teacher Award</h3>
              <p>Regional Education Excellence Awards 2023</p>
            </div>
            <div className="achievement">
              <div className="achievement-icon">📚</div>
              <h3>Published Author</h3>
              <p>"Modern Methods in Language Teaching" - 2022</p>
            </div>
            <div className="achievement">
              <div className="achievement-icon">🌟</div>
              <h3>5-Star Rating</h3>
              <p>Maintained across all teaching platforms</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;