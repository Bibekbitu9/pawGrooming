'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, PawPrint } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/grooming', label: 'Grooming' },
  // { href: '/boarding', label: 'Boarding' },  // Coming soon — after construction
  { href: '/pet-vault', label: 'Pet Vault' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50 hidden md:block" id="desktop-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="header-logo">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-amber/15 transition-all duration-300 group-hover:bg-accent-amber/25">
            <PawPrint size={24} className="text-accent-amber" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight gradient-text">Guardians of Paws</h1>
            <p className="text-[10px] font-medium tracking-widest uppercase text-text-muted">Bangalore</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-1" id="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-accent-amber/15 text-accent-amber'
                    : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link href="/grooming" className="gradient-btn text-sm" id="header-cta">
          <span>Book Now</span>
        </Link>
      </div>

      {/* Mobile menu overlay (for tablet breakpoints) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-xl md:hidden">
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
                className="rounded-xl px-4 py-3 text-lg font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
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
