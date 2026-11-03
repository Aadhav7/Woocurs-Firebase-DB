import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="content-card">
      <p className="eyebrow mb-2">Welcome</p>
      <h1 className="hero-title">Welcome to Day 6 React + Firebase App</h1>
      <p className="lead text-secondary my-4">
        Manage your data efficiently using our mobile app project. This starter app
        demonstrates basic React screens, navigation, and Firebase setup.
      </p>
      <Link to="/registration" className="btn btn-primary btn-lg">
        Register
      </Link>
      <Link to="/about" className="btn btn-outline-secondary btn-lg ms-2">
        About this app
      </Link>
      <div className="mt-4" aria-label="Project features">
        <span className="feature-pill">React</span>
        <span className="feature-pill">React Router</span>
        <span className="feature-pill">Firebase setup</span>
      </div>
    </section>
  );
}

export default Home;
