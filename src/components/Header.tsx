'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, PawPrint, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/grooming', label: 'Grooming' },
  // { href: '/boarding', label: 'Boarding' },  // Coming soon — after construction
  { href: '/pet-vault', label: 'Pet Vault' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-500 ${
        scrolled
          ? 'bg-[#1a1028]/70 backdrop-blur-2xl shadow-lg shadow-black/20 border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      id="desktop-header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="header-logo">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-amber/25 to-accent-coral/15 transition-all duration-300 group-hover:from-accent-amber/35 group-hover:to-accent-coral/25 group-hover:shadow-lg group-hover:shadow-accent-amber/20">
            <PawPrint size={22} className="text-accent-amber" />
            <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent-emerald animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight gradient-text">Guardians of Paws</h1>
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted">Bangalore</p>
          </div>
        </Link>

        {/* Desktop Nav — pill-shaped container */}
        <nav
          className={`flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 ${
            scrolled
              ? 'bg-white/[0.04] border border-white/[0.06]'
              : 'bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl'
          }`}
          id="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-accent-amber'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-accent-amber/12 border border-accent-amber/20" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/grooming"
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent-amber to-accent-coral px-6 py-2.5 text-sm font-bold text-[#1a1028] transition-all duration-300 hover:shadow-lg hover:shadow-accent-amber/30 hover:-translate-y-0.5"
          id="header-cta"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <Sparkles size={14} />
            Book Now
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-accent-coral to-accent-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#1a1028]/95 backdrop-blur-2xl md:hidden">
          <div className="flex items-center justify-between p-6">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <PawPrint size={24} className="text-accent-amber" />
              <span className="text-lg font-bold gradient-text">Guardians of Paws</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-text-primary">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-2 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-lg font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
