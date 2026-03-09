'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Scissors, BedDouble, ShieldCheck, Phone } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/grooming', label: 'Groom', icon: Scissors },
  // { href: '/boarding', label: 'Board', icon: BedDouble },  // Coming soon — after construction
  { href: '/pet-vault', label: 'Vault', icon: ShieldCheck },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden" id="bottom-nav">
      {/* Gradient fade above nav */}
      <div className="h-6 bg-gradient-to-t from-[#1a1028] to-transparent pointer-events-none" />
      <div className="bg-[#1a1028]/90 backdrop-blur-2xl border-t border-white/[0.06] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around px-1 py-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-0.5 rounded-2xl px-4 py-2 transition-all duration-300 ${
                  isActive
                    ? 'text-accent-amber'
                    : 'text-text-muted active:scale-95'
                }`}
                id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl bg-accent-amber/10 border border-accent-amber/15" />
                )}
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="relative z-10"
                />
                <span className={`relative z-10 text-[10px] font-semibold tracking-wide ${isActive ? '' : 'opacity-60'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
