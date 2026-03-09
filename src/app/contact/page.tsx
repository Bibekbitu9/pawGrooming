'use client';

import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-sky/10 px-4 py-2 border border-accent-sky/20">
            <Phone size={16} className="text-accent-sky" />
            <span className="text-sm font-medium text-accent-sky">Get in Touch</span>
          </div>
          <h1 className="text-3xl font-bold md:text-5xl mb-3">
            We&apos;d Love to <span className="gradient-text">Hear From You</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Questions about services, availability, or just want to say hi? Drop us a line.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Form */}
          <div className="glass-card p-6" id="contact-form">
            <h3 className="font-bold text-lg mb-6">Send us a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Your Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors"
                  id="contact-name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors"
                  id="contact-phone"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary mb-2 block">Message</label>
                <textarea
                  placeholder="Tell us about your furry friend and how we can help..."
                  rows={4}
                  className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors resize-none"
                  id="contact-message"
                />
              </div>
              <button type="submit" className="gradient-btn w-full" id="contact-submit">
                <span className="flex items-center justify-center gap-2">
                  <Send size={16} />
                  Send Message
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-4">Contact Details</h3>
              <div className="space-y-4">
                <a href="tel:+919876543210" className="flex items-center gap-3 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-amber/10 group-hover:bg-accent-amber/20 transition-colors">
                    <Phone size={18} className="text-accent-amber" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">+91 98765 43210</div>
                    <div className="text-xs text-text-muted">Mon-Sat, 8 AM – 7 PM</div>
                  </div>
                </a>
                <a href="https://wa.me/919876543210" className="flex items-center gap-3 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-emerald/10 group-hover:bg-accent-emerald/20 transition-colors">
                    <MessageCircle size={18} className="text-accent-emerald" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">WhatsApp Us</div>
                    <div className="text-xs text-text-muted">Quick replies, usually under 5 mins</div>
                  </div>
                </a>
                <a href="mailto:hello@guardiansofpaws.in" className="flex items-center gap-3 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-sky/10 group-hover:bg-accent-sky/20 transition-colors">
                    <Mail size={18} className="text-accent-sky" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">hello@guardiansofpaws.in</div>
                    <div className="text-xs text-text-muted">We respond within 24 hours</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-bold text-lg mb-4">Visit Our Flagship Center</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={18} className="text-accent-coral flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">42, 4th Cross Road</div>
                  <div className="text-sm text-text-secondary">Koramangala 5th Block, Bangalore 560095</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent-amber flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold mb-1">Operating Hours</div>
                  <div className="text-text-secondary">Mon – Sat: 8:00 AM – 7:00 PM</div>
                  <div className="text-text-secondary">Sun: 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-card overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.6245!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA3LjIiTiA3N8KwMzcnMjguMiJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Guardians of Paws Location"
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
