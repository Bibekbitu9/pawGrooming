'use client';

import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Heart, PawPrint } from 'lucide-react';

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

        {/* ===== ABOUT THE FOUNDERS ===== */}
        <div className="glass-card p-6 md:p-8 mb-10 relative overflow-hidden" id="about-founders">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-amber/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={18} className="text-accent-coral" />
              <span className="text-sm font-semibold tracking-widest uppercase text-accent-coral">Our Story</span>
            </div>
            <h2 className="text-2xl font-bold mb-5 md:text-3xl">
              Meet the <span className="gradient-text">Paw Parents</span> Behind It All
            </h2>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Founders Photo Placeholder */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative">
                  <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-accent-amber/20 via-accent-coral/15 to-accent-violet/20 flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <PawPrint size={36} className="text-accent-amber mx-auto mb-2" />
                      <div className="text-xs text-text-muted font-medium">Bishwas & Divya</div>
                      <div className="text-[10px] text-text-muted">with Toodle & Rio</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-2xl">🐾</div>
                </div>
              </div>

              {/* Story */}
              <div className="flex-1">
                <p className="text-text-secondary leading-relaxed mb-4">
                  <span className="font-bold text-text-primary">Bishwas Pattnaik</span> & <span className="font-bold text-text-primary">Divya Thawani</span> aren&apos;t
                  just the founders of Guardians of Paws — they&apos;re proud paw parents to <span className="font-semibold text-accent-amber">Toodle</span>, their golden retriever with
                  a heart of gold, and <span className="font-semibold text-accent-amber">Rio</span>, a pug whose snoring could drown out city traffic.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The idea for Guardians of Paws was born from frustration, not ambition. Every time Bishwas and Divya
                  had to leave Toodle and Rio at a grooming centre, the same worries crept in — <em className="text-accent-coral">were they
                  truly comfortable? Was the place hygienic? Were they stressed, scared, or just sitting in a cage
                  waiting for it to be over?</em> Too often, their babies came back anxious instead of happy.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Both working in IT, they knew technology could solve what empathy alone couldn&apos;t. So they built what
                  they wished had existed — a place where every pup is treated like their own, where hygiene is
                  non-negotiable, where the BBMP paperwork is handled by AI, and where parents get real-time
                  updates instead of radio silence.
                </p>
                <p className="text-text-primary leading-relaxed font-medium italic border-l-2 border-accent-amber/40 pl-4">
                  &ldquo;We didn&apos;t start a business. We built the place we wished Toodle and Rio already had.
                  Every paw that walks through our door gets the love we&apos;d want for our own.&rdquo;
                </p>
                <div className="mt-3 text-xs text-text-muted">
                  — Bishwas & Divya, Founders & Paw Parents 🐾
                </div>
              </div>
            </div>
          </div>
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
                    <div className="text-xs text-text-muted">Mon-Sat, 9 AM – 6 PM</div>
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
              <h3 className="font-bold text-lg mb-4">Visit Us</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={18} className="text-accent-coral flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">Kodathi Village</div>
                  <div className="text-sm text-text-secondary">Sarjapur Road, Bangalore 560035</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent-amber flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold mb-1">Operating Hours</div>
                  <div className="text-text-secondary">Mon – Sat: 9:00 AM – 6:00 PM</div>
                  <div className="text-text-secondary">Sun: 10:00 AM – 4:00 PM</div>
                </div>
              </div>
            </div>

            {/* Map — Kodathi Village, Sarjapur */}
            <div className="glass-card overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0!2d77.7!3d12.8850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae738100000001%3A0x1!2sKodathi%20Village!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Guardians of Paws — Kodathi Village, Sarjapur"
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
