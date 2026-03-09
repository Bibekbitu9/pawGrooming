import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Scissors, BedDouble, ShieldCheck, ArrowRight, PawPrint } from 'lucide-react';
import { BANGALORE_NEIGHBORHOODS } from '@/lib/neighborhoods';
import { getServiceSchema } from '@/lib/jsonld';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BANGALORE_NEIGHBORHOODS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = BANGALORE_NEIGHBORHOODS.find((n) => n.slug === slug);
  if (!neighborhood) return {};

  return {
    title: `Premium Dog Grooming & Boarding in ${neighborhood.name}`,
    description: `${neighborhood.description} Book premium pet care services in ${neighborhood.name}, Bangalore. BBMP-compliant, vet-approved.`,
    openGraph: {
      title: `Pet Care in ${neighborhood.name} | Guardians of Paws`,
      description: neighborhood.description,
    },
  };
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { slug } = await params;
  const neighborhood = BANGALORE_NEIGHBORHOODS.find((n) => n.slug === slug);

  if (!neighborhood) notFound();

  const groomingSchema = getServiceSchema({
    name: `Premium Pet Grooming in ${neighborhood.name}`,
    description: `Professional grooming services in ${neighborhood.name}, Bangalore`,
    price: '1499',
    area: `${neighborhood.name}, Bangalore`,
  });

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(groomingSchema) }}
      />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-sky/10 px-4 py-2 border border-accent-sky/20">
            <MapPin size={16} className="text-accent-sky" />
            <span className="text-sm font-medium text-accent-sky">{neighborhood.name}, Bangalore</span>
          </div>
          <h1 className="text-3xl font-bold md:text-5xl mb-3">
            Pet Care in <span className="gradient-text">{neighborhood.name}</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            {neighborhood.tagline}
          </p>
        </div>

        {/* Description */}
        <div className="glass-card p-8 mb-8">
          <p className="text-text-secondary leading-relaxed text-lg">
            {neighborhood.description}
          </p>
        </div>

        {/* Services */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[
            { icon: Scissors, title: 'Grooming', desc: 'Professional 1-hour sessions, 9 AM – 6 PM', href: '/grooming', color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
            { icon: BedDouble, title: 'Boarding', desc: 'Half-day & full-day luxury suites', href: '/boarding', color: 'text-accent-violet', bg: 'bg-accent-violet/10' },
            { icon: ShieldCheck, title: 'Pet Vault', desc: 'BBMP compliance & vaccination tracking', href: '/pet-vault', color: 'text-accent-emerald', bg: 'bg-accent-emerald/10' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.title} href={s.href} className="glass-card-hover p-6 group">
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${s.bg}`}>
                  <Icon size={22} className={s.color} />
                </div>
                <h3 className="font-bold mb-1">{s.title}</h3>
                <p className="text-xs text-text-secondary mb-3">{s.desc}</p>
                <span className="text-xs font-medium text-accent-amber flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Book Now <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center glass-card p-8">
          <PawPrint size={32} className="mx-auto mb-4 text-accent-amber" />
          <h2 className="text-2xl font-bold mb-3">
            Ready to book in {neighborhood.name}?
          </h2>
          <p className="text-text-secondary mb-6 text-sm">
            Convenient pickup and drop available across {neighborhood.name}.
          </p>
          <Link href="/grooming" className="gradient-btn inline-flex" id={`cta-${neighborhood.slug}`}>
            <span className="flex items-center gap-2">
              Book Now <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
