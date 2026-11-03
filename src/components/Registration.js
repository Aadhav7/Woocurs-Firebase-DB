import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const initialValues = { name: '', email: '', phone: '' };

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();

  if (name.length < 3) errors.name = 'Name must be at least 3 characters.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone must contain exactly 10 digits.';
  return errors;
}

function Registration() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    setSuccess('');
    setSubmitError('');
    if (touched[name]) setErrors({ ...errors, ...validate(updated) });
  };

  const handleBlur = (event) => {
    const field = event.target.name;
    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true });
    setSuccess('');
    setSubmitError('');

    if (Object.keys(validationErrors).length > 0) return;
    if (!db) {
      setSubmitError('Firebase is not configured. Add your Firebase web app settings to .env.local and restart the app.');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'users'), {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        timestamp: new Date()
      });
      setSuccess('Registration successful! Your details have been saved to Firebase Firestore.');
      setValues(initialValues);
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error adding document to Firestore:', error);
      setSubmitError('Error submitting the form. Please check your internet connection and Firestore configuration, then try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="content-card">
      <p className="eyebrow mb-2">Get started</p>
      <h1 className="h2 fw-bold mb-2">Register</h1>
      <p className="text-secondary mb-4">
        Enter your details. Your registration will be saved in the Firebase Firestore <code>users</code> collection.
      </p>

      {success && <div className="alert alert-success mt-3" role="alert">{success}</div>}
      {submitError && <div className="alert alert-danger mt-3" role="alert">{submitError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name" name="name" type="text" value={values.name}
            onChange={handleChange} onBlur={handleBlur}
            className={`form-control form-control-lg ${touched.name && errors.name ? 'is-invalid' : ''}`}
            placeholder="Enter your name" autoComplete="name" required
            aria-describedby="name-error"
          />
          {touched.name && errors.name && <div id="name-error" className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email" name="email" type="email" value={values.email}
            onChange={handleChange} onBlur={handleBlur}
            className={`form-control form-control-lg ${touched.email && errors.email ? 'is-invalid' : ''}`}
            placeholder="name@example.com" autoComplete="email" required
            aria-describedby="email-error"
          />
          {touched.email && errors.email && <div id="email-error" className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            id="phone" name="phone" type="tel" inputMode="numeric" value={values.phone}
            onChange={handleChange} onBlur={handleBlur}
            className={`form-control form-control-lg ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
            placeholder="10-digit phone number" autoComplete="tel" maxLength="10" required
            aria-describedby="phone-error"
          />
          {touched.phone && errors.phone && <div id="phone-error" className="invalid-feedback">{errors.phone}</div>}
        </div>

        <button type="submit" className="btn btn-success btn-lg" disabled={submitting}>
          {submitting ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...</> : 'Submit'}
        </button>
      </form>
    </section>
  );
}

export default Registration;
