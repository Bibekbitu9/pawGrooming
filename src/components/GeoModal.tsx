'use client';

import { useState, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';

export default function GeoModal() {
  const [show, setShow] = useState(false);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already dismissed the modal
    const dismissed = localStorage.getItem('geo-modal-dismissed');
    if (dismissed) return;

    // Read the city from the cookie set by middleware
    const cookies = document.cookie.split(';').reduce((acc, c) => {
      const [key, val] = c.trim().split('=');
      acc[key] = val;
      return acc;
    }, {} as Record<string, string>);

    const detectedCity = cookies['x-detected-city'];

    if (detectedCity && !['Bangalore', 'Bengaluru', 'bangalore', 'bengaluru'].includes(detectedCity)) {
      setCity(detectedCity);
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('geo-modal-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" id="geo-modal">
      <div className="glass-card w-full max-w-md p-8 text-center animate-fade-up">
        {/* Decorative icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-amber/15">
          <MapPin size={36} className="text-accent-amber" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-text-primary">
          Coming Soon to {city}! 🐾
        </h2>

        <p className="mb-6 text-text-secondary leading-relaxed">
          Guardians of Paws is currently serving pet parents in <span className="font-semibold text-accent-amber">Bangalore</span>.
          We&apos;re expanding fast — drop your email and we&apos;ll notify you when we launch in {city}.
        </p>

        {/* Email capture */}
        <div className="mb-4 flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-xl bg-bg-tertiary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors"
            id="geo-modal-email"
          />
          <button className="gradient-btn whitespace-nowrap text-sm" id="geo-modal-notify">
            <span>Notify Me</span>
          </button>
        </div>

        <button
          onClick={dismiss}
          className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          id="geo-modal-dismiss"
        >
          Continue browsing anyway →
        </button>

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 rounded-full p-2 text-text-muted hover:bg-bg-tertiary hover:text-text-primary transition-all"
          id="geo-modal-close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
