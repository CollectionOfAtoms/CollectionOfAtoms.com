import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const payload = {
        to: 'CollectionOfAtoms@gmail.com',
        subject: `Contact Submission: ${formData.subject || 'No subject'}`,
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      // TODO: Replace '/api/contact' with your backend endpoint that sends email.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="page">
      <h1>Contact</h1>
      <p>Send a quick note and it will open in your mail client addressed to me.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Subject
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
        </label>
        <label>
          Message
          <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit" className="resume-link contact-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Submitting...' : 'Submit'}
        </button>
        {status === 'success' && <p className="form-status form-status--success">Thanks! Your message was sent.</p>}
        {status === 'error' && <p className="form-status form-status--error">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
