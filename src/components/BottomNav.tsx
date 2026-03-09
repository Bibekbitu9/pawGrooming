'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Scissors, BedDouble, ShieldCheck, Phone } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/grooming', label: 'Groom', icon: Scissors },
  // { href: '/boarding', label: 'Board', icon: BedDouble },  // Coming soon — after construction
  { href: '/pet-vault', label: 'Pet Vault', icon: ShieldCheck },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50 md:hidden" id="bottom-nav">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-all duration-300 ${
                isActive
                  ? 'bg-accent-amber/15 text-accent-amber'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_hsl(36_95%_55%_/_0.5)]' : ''}`}
              />
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0 h-[3px] w-6 rounded-full bg-accent-amber shadow-[0_0_8px_hsl(36_95%_55%_/_0.6)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
