import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to the To-Do App</h1>
          <p>Organize your tasks and boost your productivity!</p>
          
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our To-Do App?</h2>
        <div className="features-grid">
          <div className="feature">
            <img src="https://cdn4.iconfinder.com/data/icons/online-shopping-landing-page-2/1200/2-2-512.png" alt="Simple Interface"  className="small-icon"  />
            <h3>Simple Interface</h3>
            <p>Our app is designed for ease of use and efficiency.</p>
          </div>
          <div className="feature">
            <img src="https://static.thenounproject.com/png/2436685-200.png" alt="Real-Time Sync" className="small-icon"  />
            <h3>Real-Time Sync</h3>
            <p>Work together in real-time with colleagues and friends.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.freepik.com/512/6103/6103172.png" alt="Detailed Reports" className="small-icon"  />
            <h3>Detailed Reports</h3>
            <p>Analyze task performance and productivity with our reports.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"This app has revolutionized the way I manage my tasks!"</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial">
            <p>"I love how I can collaborate with my team in real-time."</p>
            <span>- Jane Smith</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit" className="btn primary-btn">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2024 Valentina Jovanovic</p>
      </footer>
    </div>
  );
}

export default Home;
