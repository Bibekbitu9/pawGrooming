import type { Metadata } from 'next';
import Link from 'next/link';
import { Scissors, BedDouble, ShieldCheck, Star, MapPin, Clock, Camera, Heart, Stethoscope, PawPrint, ArrowRight, Phone, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Premium Pet Boarding & Grooming in Bangalore',
  description:
    'Guardians of Paws offers premium pet boarding and grooming in Bangalore. BBMP-compliant, vet-supervised care with AI-powered health tracking. Serving Koramangala, Indiranagar, Whitefield & more.',
};

const services = [
  {
    icon: Scissors,
    title: 'Premium Grooming',
    description: 'Full spa treatment — bath, blow-dry, haircut, nail trim, ear cleaning & cologne. Your pup leaves looking and feeling like royalty.',
    price: 'From ₹1,499',
    href: '/grooming',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-accent-amber',
  },
  // Boarding — coming soon after construction
  // {
  //   icon: BedDouble,
  //   title: 'Luxury Boarding',
  //   description: 'Climate-controlled suites with webcam access, dedicated playtime, premium meals & bedtime stories. We mean it.',
  //   price: 'From ₹899/shift',
  //   href: '/boarding',
  //   gradient: 'from-violet-500/20 to-purple-500/20',
  //   iconColor: 'text-accent-violet',
  // },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'BBMP Compliant', description: 'Full municipal compliance' },
  { icon: Stethoscope, label: 'Vet-Approved', description: 'On-call veterinary support' },
  { icon: Camera, label: '24/7 CCTV', description: 'Live webcam access for parents' },
  { icon: Heart, label: 'Cage-Free', description: 'Open-play socialization zones' },
];

const testimonials = [
  {
    name: 'Priya Raghavan',
    area: 'Koramangala',
    pet: 'Milo, Golden Retriever',
    text: 'Milo comes back from Guardians of Paws smelling amazing and doing his happy wiggle. The Pupdate photos are the best part of my day!',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    area: 'Indiranagar',
    pet: 'Luna, Labrador',
    text: 'The BBMP compliance tracking saved us so much hassle. We got a renewal reminder 30 days before expiry. Genius.',
    rating: 5,
  },
  {
    name: 'Sneha Kulkarni',
    area: 'Whitefield',
    pet: 'Cooper, Beagle',
    text: 'Boarded Cooper for 3 days during our trip. The webcam access and daily report cards made us feel like we never left him.',
    rating: 5,
  },
];

const neighborhoods = [
  'Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout',
  'Jayanagar', 'Marathahalli', 'JP Nagar', 'Electronic City',
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-gradient relative min-h-[90vh] flex items-center justify-center px-4 py-20 md:py-32" id="hero-section">
        {/* Colorful gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent-violet/15 blur-[120px]" />
          <div className="absolute top-40 right-0 h-[350px] w-[350px] rounded-full bg-accent-amber/12 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-accent-coral/10 blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 h-[250px] w-[250px] rounded-full bg-accent-emerald/8 blur-[90px]" />
          {/* Floating paw prints */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: `${10 + i * 12}%`,
                left: `${3 + i * 12}%`,
                animationDelay: `${i * 0.7}s`,
                fontSize: `${18 + i * 4}px`,
                opacity: 0.12 + i * 0.02,
              }}
            >
              🐾
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-amber/15 px-4 py-2 border border-accent-amber/25 shadow-lg shadow-accent-amber/5">
            <PawPrint size={16} className="text-accent-amber" />
            <span className="text-sm font-medium text-accent-amber">Bangalore&apos;s #1 Pet Care Destination</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Where Every Paw Gets the
            <span className="block gradient-text">Royal Treatment</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-text-secondary leading-relaxed md:text-xl">
            Premium grooming for your furry family members.
            BBMP-compliant, vet-approved, and powered by an AI Pet Vault
            that keeps every vaccination and registration up to date.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/grooming" className="gradient-btn w-full sm:w-auto text-lg px-8 py-4" id="hero-cta-groom">
              <span className="flex items-center justify-center gap-2">
                <Scissors size={20} />
                Book Grooming
              </span>
            </Link>
            {/* Boarding CTA — coming soon after construction */}
            <div
              className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-text-muted text-center cursor-not-allowed opacity-60"
            >
              <span className="flex items-center justify-center gap-2">
                <BedDouble size={20} />
                Boarding — Coming Soon
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: '2,500+', label: 'Happy Pets' },
              { value: '4.9★', label: 'Rating' },
              { value: '3 Yrs', label: 'Trusted' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text md:text-3xl">{stat.value}</div>
                <div className="text-xs text-text-muted font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="section-glow-amber px-4 py-20 md:py-28 relative" id="services-section">
        <div className="absolute top-20 right-0 h-[300px] w-[300px] rounded-full bg-accent-amber/8 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 h-[250px] w-[250px] rounded-full bg-accent-violet/6 blur-[80px] pointer-events-none" />
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-accent-amber">Our Services</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Tailored Care for Every Tail</h2>
            <p className="mt-4 text-text-secondary max-w-xl mx-auto">
              From a quick glam session to extended luxury stays, we have your pup covered.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href} className="group" id={`service-${service.title.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="glass-card-hover p-8 h-full">
                    <div className={`mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} p-4`}>
                      <Icon size={32} className={service.iconColor} />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                    <p className="mb-6 text-text-secondary leading-relaxed">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold gradient-text">{service.price}</span>
                      <span className="flex items-center gap-1 text-sm font-medium text-accent-amber opacity-0 transition-opacity group-hover:opacity-100">
                        Book Now <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="section-glow-emerald px-4 py-20 md:py-28 relative" id="trust-section">
        <div className="absolute top-10 left-1/4 h-[280px] w-[280px] rounded-full bg-accent-emerald/8 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-accent-emerald">Why Choose Us</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built on Trust, Backed by Science</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="glass-card p-6 text-center group hover:border-accent-emerald/30 transition-all duration-300">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-emerald/10 group-hover:bg-accent-emerald/20 transition-colors">
                    <Icon size={26} className="text-accent-emerald" />
                  </div>
                  <h4 className="text-sm font-bold mb-1">{badge.label}</h4>
                  <p className="text-xs text-text-muted">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PET VAULT PROMO ===== */}
      <section className="section-glow-violet px-4 py-20 md:py-28 relative" id="vault-promo">
        <div className="absolute bottom-0 right-10 h-[300px] w-[300px] rounded-full bg-accent-violet/10 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-5xl">
          <div className="glass-card overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-amber/5 to-transparent pointer-events-none" />
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                <div className="flex-1 mb-8 md:mb-0">
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent-violet/10 px-3 py-1.5 border border-accent-violet/20 mb-4">
                    <Sparkles size={14} className="text-accent-violet" />
                    <span className="text-xs font-semibold text-accent-violet">AI-Powered</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 md:text-4xl">
                    The BBMP Pet Vault
                  </h2>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Upload your pet&apos;s vaccination certificates and BBMP registration documents.
                    Our AI extracts Rabies vaccine dates, tracks expiry, and sends you
                    WhatsApp reminders 30 days before renewal. Compliance made effortless.
                  </p>
                  <Link href="/pet-vault" className="gradient-btn inline-flex" id="vault-cta">
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={18} />
                      Open Pet Vault
                    </span>
                  </Link>
                </div>
                <div className="flex-shrink-0">
                  <div className="glass-card p-6 w-64 mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-accent-emerald/20 flex items-center justify-center">
                        <ShieldCheck size={20} className="text-accent-emerald" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">Rabies Vaccine</div>
                        <div className="text-xs text-accent-emerald">Verified ✓</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Vaccinated</span>
                        <span className="text-text-primary font-medium">15 Aug 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Expires</span>
                        <span className="text-accent-amber font-medium">15 Aug 2027</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-bg-tertiary mt-3">
                        <div className="h-1.5 rounded-full bg-accent-emerald w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-glow-amber px-4 py-20 md:py-28 relative" id="testimonials-section">
        <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-accent-coral/8 blur-[90px] pointer-events-none" />
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-accent-coral">Happy Tails</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What Pet Parents Say</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent-amber text-accent-amber" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent-amber/15 flex items-center justify-center text-sm font-bold text-accent-amber">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-text-muted flex items-center gap-1">
                      <MapPin size={10} /> {t.area} · {t.pet}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-glow-violet px-4 py-20 md:py-28 relative" id="final-cta">
        <div className="absolute top-10 left-1/3 h-[300px] w-[300px] rounded-full bg-accent-amber/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 h-[250px] w-[250px] rounded-full bg-accent-violet/8 blur-[90px] pointer-events-none" />
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Ready to Give Your Pet the
            <span className="gradient-text"> Best Day Ever?</span>
          </h2>
          <p className="mb-10 text-text-secondary text-lg">
            Join 2,500+ happy pet parents in Bangalore. Book in under 2 minutes.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/grooming" className="gradient-btn text-lg px-10 py-4 w-full sm:w-auto" id="final-cta-book">
              <span className="flex items-center justify-center gap-2">
                <PawPrint size={20} />
                Book Now
              </span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-2xl border border-glass-border px-8 py-4 text-lg font-semibold text-text-primary hover:bg-bg-tertiary transition-all w-full sm:w-auto"
              id="final-cta-contact"
            >
              <Phone size={20} />
              Call Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border/20 px-4 py-12" id="footer">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <PawPrint size={24} className="text-accent-amber" />
              <span className="text-lg font-bold gradient-text">Guardians of Paws</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
              <Link href="/grooming" className="hover:text-text-primary transition-colors">Grooming</Link>
              {/* <Link href="/boarding" className="hover:text-text-primary transition-colors">Boarding</Link> */}
              <Link href="/pet-vault" className="hover:text-text-primary transition-colors">Pet Vault</Link>
              <Link href="/contact" className="hover:text-text-primary transition-colors">Contact</Link>
            </div>
            <div className="text-sm text-text-muted">
              © 2026 Guardians of Paws. Made with 🐾 in Bangalore.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
