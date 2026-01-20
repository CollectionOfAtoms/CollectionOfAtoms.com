import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");

  const FORM_ENDPOINT = "https://formspree.io/f/xdaanwga";

  const isSending = status === "sending";
  const isSuccess = status === "success";
  const isDisabled = isSending || isSuccess;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    setEmailError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // 1) Honeypot check (client-side filter)
    const honeypot = String(data.get("company") || "").trim();
    if (honeypot) {
      // Pretend success so bots don't learn anything
      setStatus("success");
      form.reset();
      return;
    }

    // 2) Email validation (regex)
    const email = String(data.get("email") || "").trim();
    if (!EMAIL_REGEX.test(email)) {
      setStatus("error");
      const message = "Please, provide a valid email.";
      setEmailError(message);
      setErrorMsg(message);
      return;
    }

    // 3) Subject line formatting for your inbox
    const userSubject = String(data.get("subject") || "").trim();
    const finalSubject = userSubject
      ? `CollectionOfAtoms Contact Submission: ${userSubject}`
      : "CollectionOfAtoms Contact Submission";

    data.set("_subject", finalSubject);

    // Optional: make replying easy (often respected by form handlers)
    // Formspree usually uses the user's email field, but this doesn't hurt:
    data.set("_replyto", email);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(json?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  const handleEmailInvalid = (e) => {
    const message = "Please, provide a valid email.";
    e.target.setCustomValidity(message);
    setEmailError(message);
  };

  const handleEmailInput = (e) => {
    if (emailError) setEmailError("");
    e.target.setCustomValidity("");
  };

  return (
    <div className="page contact-page">
      <div className="page-title-band">
        <h1 className="page-title">Contact</h1>
      </div>

      <section className="standard-page-hero">
        <div className="standard-page-hero-image">
          <img src="/misc/VLA.jpg" alt="Very Large Array radio telescope" />
        </div>

        <div className="contact-top-content">
          <h2>Let’s connect.</h2>
          <p>I much prefer verbal communication.</p>
          <p>An openness to talking on the phone is welcomed.</p>
        </div>

        <div className="about-divider about-divider--hero">
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
        </div>
      </section>

      <form
        className={`contact-form ${isSuccess ? "contact-form--success" : ""}`}
        onSubmit={handleSubmit}
      >
        {/* Honeypot anti-spam field */}
        <div style={{ display: "none" }}>
          <label>
            Leave this field empty
            <input type="text" name="company" tabIndex="-1" autoComplete="off" />
          </label>
        </div>

        {/* Disable everything after success (and while sending) */}
        <fieldset className="contact-fieldset" disabled={isDisabled}>
          <label>
            Name
            <input name="name" type="text" required />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              onInvalid={handleEmailInvalid}
              onInput={handleEmailInput}
            />
          </label>

          {emailError && (
            <div className="form-status form-status--error">{emailError}</div>
          )}

          <label>
            Subject
            <input name="subject" type="text" placeholder="(Optional)" />
          </label>

          <label>
            Message
            <textarea name="message" rows="6" required />
          </label>

          <button className="contact-submit button-standard-glow" type="submit">
            {isSending ? "Sending…" : isSuccess ? "Sent" : "Send message"}
          </button>
        </fieldset>

        {isSuccess && (
          <p className="form-status form-status--success form-status--pop">
            Received. I’ll get back to you soon.
          </p>
        )}

        {status === "error" && (
          <p className="form-status form-status--error">
            {errorMsg || "Something went wrong. You can also email me at "}
            <a href="mailto:collectionOfAtoms@gmail.com">collectionOfAtoms@gmail.com</a>.
          </p>
        )}
      </form>
    </div>
  );
}
