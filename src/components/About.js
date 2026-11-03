import React from 'react';

function About() {
  return (
    <section className="content-card">
      <p className="eyebrow mb-2">About the project</p>
      <h1 className="h2 fw-bold">About Day 6 React + Firebase App</h1>
      <p className="text-secondary mt-3">
        This app is developed to demonstrate mobile app development skills using
        React and Firebase. It includes Home, Registration, and About screens,
        navigation with React Router, and a Firebase initialization module.
      </p>
      <hr className="my-4" />
      <h2 className="h5 fw-bold">What is included?</h2>
      <ul className="mb-0">
        <li>React components and a basic folder structure</li>
        <li>Navigation between the three screens</li>
        <li>A controlled registration form</li>
        <li>Firebase web app configuration setup</li>
      </ul>
    </section>
  );
}

export default About;
