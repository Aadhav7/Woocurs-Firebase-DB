import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import About from './components/About';
import firebaseApp from './firebase';

function App() {
  // Confirms the Firebase app is available after a real config has been provided.
  console.log('Firebase app:', firebaseApp || 'Not configured yet. Add values to .env.local.');

  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand navbar-dark app-navbar">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">Day 7 App</Link>
            <div className="navbar-nav ms-auto flex-row gap-3">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/registration">Register</Link>
              <Link className="nav-link" to="/about">About</Link>
            </div>
          </div>
        </nav>

        <main className="container page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <section className="content-card text-center">
                <h2>Page not found</h2>
                <p>The page you requested does not exist.</p>
                <Link className="btn btn-primary" to="/">Back to Home</Link>
              </section>
            } />
          </Routes>
        </main>

        <footer className="text-center py-4 text-secondary small">
          React + Firebase Firestore · Woocurs Internship · Day 7
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
