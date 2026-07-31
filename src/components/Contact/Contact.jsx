import React from 'react';
import './Contact.css';
import Icon from '../Icon/Icon';

function Contact({ data, submit, formStatus, submitting }) {
  const { eyebrow, headingLine1, headingLine2, description, github, linkedin, email } = data || {};

  return (
    <section id="contact" className="section contact-section contact-section-wrapper">
      <div className="contact-card">
        <div className="contact-copy reveal">
          <p className="eyebrow">{eyebrow || "HAVE A PROJECT IN MIND?"}</p>
          <h2>{headingLine1 || "Let's build something"} <span className="gradient-text">{headingLine2 || "remarkable."}</span></h2>
          <p>{description || "Have an idea, design or project you'd like to bring to life? Let's talk about it and see how we can turn it into a responsive, engaging web experience."}</p>
          <div className="socials">
            <a href={github || "https://github.com/"} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href={linkedin || "https://linkedin.com/"} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={`mailto:${email || "at667448@gmail.com"}`} aria-label="Email"><Icon name="mail" /></a>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={submit}>
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Email<input type="email" name="email" required placeholder="you@example.com" /></label>
          <label>Message<textarea name="message" required minLength="10" placeholder="Tell me about your project..." /></label>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending message..." : "Let's work together"} <Icon name="arrow" />
          </button>
          {formStatus && <p className="form-status" role="status">{formStatus}</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;
