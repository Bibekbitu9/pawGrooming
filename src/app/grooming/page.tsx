'use client';

import { useState } from 'react';
import { Scissors, Clock, Calendar, Dog, ArrowRight, Check, Phone, Gift, AlertTriangle, Heart, ShieldCheck } from 'lucide-react';
import { generateGroomingSlots, getAvailableDates, formatDate } from '@/lib/slot-engine';
import type { Slot } from '@/lib/slot-engine';

const groomingPackages = [
  {
    name: 'Essential Pawdicure',
    price: 1499,
    duration: '1 hour',
    features: ['Bath & Shampoo', 'Blow Dry', 'Nail Trim', 'Ear Cleaning', 'Cologne Spritz'],
  },
  {
    name: 'Royal Spa Package',
    price: 2499,
    duration: '1 hour',
    features: ['Full Body Haircut', 'De-shedding Treatment', 'Teeth Brushing', 'Paw Moisturizing', 'Bow Tie Finish'],
    popular: true,
  },
  {
    name: 'Puppy First Timer',
    price: 999,
    duration: '1 hour',
    features: ['Gentle Bath', 'Light Trim', 'Nail Filing', 'Treat Reward', 'Socialization Session'],
  },
];

export default function GroomingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<typeof groomingPackages[0] | null>(null);
  const [step, setStep] = useState<'package' | 'schedule' | 'details' | 'confirm'>('package');
  const [petDetails, setPetDetails] = useState({
    name: '',
    breed: '',
    weight: '',
    parentPhone: '',
  });
  const [petChecks, setPetChecks] = useState({
    isFriendly: false,
    hasInjuries: false,
    hasAllergies: false,
    isVaccinated: false,
    firstGrooming: false,
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const availableDates = getAvailableDates(7);
  const slots = selectedDate ? generateGroomingSlots(selectedDate) : [];

  const handleSlotClick = (slot: Slot) => {
    if (slot.isBlocked || !slot.isAvailable) return;
    setSelectedSlot(slot);
  };

  const canProceedToConfirm =
    petDetails.name.trim() !== '' &&
    petDetails.breed.trim() !== '' &&
    petDetails.parentPhone.trim().length >= 10;

  const handleProceedToPayment = () => {
    // TODO: Integrate Razorpay checkout
    alert(`Booking confirmed (stub)!\n\nPackage: ${selectedPackage?.name}\nDate: ${selectedDate ? formatDate(selectedDate) : ''}\nSlot: ${selectedSlot?.label}\nPet: ${petDetails.name}\nPhone: ${petDetails.parentPhone}\nAmount: ₹${selectedPackage?.price}`);
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-amber/10 px-4 py-2 border border-accent-amber/20">
            <Scissors size={16} className="text-accent-amber" />
            <span className="text-sm font-medium text-accent-amber">Premium Grooming</span>
          </div>
          <h1 className="text-3xl font-bold md:text-5xl mb-3">
            Groom Your <span className="gradient-text">Paw</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Professional grooming sessions from 9:00 AM to 6:00 PM. Choose your package, pick a slot, and leave the rest to us.
          </p>
        </div>

        {/* Loyalty Banner */}
        <div className="glass-card p-4 mb-8 flex items-center gap-3 border-accent-amber/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-amber/15 flex-shrink-0">
            <Gift size={20} className="text-accent-amber" />
          </div>
          <div>
            <div className="text-sm font-bold text-accent-amber">🎉 Loyalty Reward</div>
            <p className="text-xs text-text-secondary">
              Get <span className="font-bold text-accent-emerald">50% OFF</span> your grooming session after every 10 baths! Your pup deserves it.
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {['Package', 'Schedule', 'Details', 'Confirm'].map((s, i) => {
            const stepKeys = ['package', 'schedule', 'details', 'confirm'];
            const currentIdx = stepKeys.indexOf(step);
            const isActive = i === currentIdx;
            const isDone = i < currentIdx;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isDone ? 'bg-accent-emerald text-bg-primary' :
                  isActive ? 'bg-accent-amber text-bg-primary' :
                  'bg-bg-tertiary text-text-muted'
                }`}>
                  {isDone ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${isActive ? 'text-text-primary' : 'text-text-muted'}`}>{s}</span>
                {i < 3 && <div className={`h-px w-6 sm:w-10 ${isDone ? 'bg-accent-emerald' : 'bg-bg-tertiary'}`} />}
              </div>
            );
          })}
        </div>

        {/* Step 1: Package Selection */}
        {step === 'package' && (
          <div className="animate-fade-up" id="grooming-packages">
            <h2 className="text-xl font-bold mb-6 text-center">Choose Your Package</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {groomingPackages.map((pkg) => (
                <button
                  key={pkg.name}
                  onClick={() => { setSelectedPackage(pkg); setStep('schedule'); }}
                  className={`glass-card-hover p-6 text-left relative ${
                    selectedPackage?.name === pkg.name ? 'border-accent-amber/50' : ''
                  }`}
                  id={`package-${pkg.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 right-4 rounded-full bg-accent-amber px-3 py-1 text-[10px] font-bold text-bg-primary uppercase tracking-wide">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold gradient-text">₹{pkg.price}</span>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Clock size={10} /> {pkg.duration}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check size={14} className="text-accent-emerald flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-amber">
                    Select <ArrowRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Schedule */}
        {step === 'schedule' && (
          <div className="animate-fade-up" id="grooming-schedule">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Pick a Date & Time</h2>
              <button onClick={() => setStep('package')} className="text-sm text-text-muted hover:text-text-primary">← Back</button>
            </div>

            {/* Date picker */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                <Calendar size={14} /> Select Date
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {availableDates.map((date) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                      className={`flex-shrink-0 rounded-2xl px-5 py-3 text-center transition-all ${
                        isSelected
                          ? 'bg-accent-amber/15 border-2 border-accent-amber/50 text-accent-amber'
                          : 'glass-card hover:border-accent-amber/20'
                      }`}
                    >
                      <div className="text-xs font-medium opacity-70">
                        {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                      <div className="text-xs opacity-50">
                        {date.toLocaleDateString('en-IN', { month: 'short' })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot grid */}
            {selectedDate && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                  <Clock size={14} /> Available Slots — {formatDate(selectedDate)}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" id="grooming-slot-grid">
                  {slots.map((slot) => {
                    const isSelected = selectedSlot?.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleSlotClick(slot)}
                        className={isSelected ? 'slot-selected' : 'slot-available'}
                        id={`slot-${slot.startHour}`}
                      >
                        <div className={`text-sm font-semibold ${
                          isSelected ? 'text-accent-emerald' : 'text-text-primary'
                        }`}>
                          {slot.label}
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-accent-emerald">
                            <Check size={10} /> Selected
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedSlot && (
              <button
                onClick={() => setStep('details')}
                className="gradient-btn w-full mt-4"
                id="proceed-to-details"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue <ArrowRight size={16} />
                </span>
              </button>
            )}
          </div>
        )}

        {/* Step 3: Pet Details */}
        {step === 'details' && (
          <div className="animate-fade-up" id="grooming-details">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Tell Us About Your Pet</h2>
              <button onClick={() => setStep('schedule')} className="text-sm text-text-muted hover:text-text-primary">← Back</button>
            </div>

            <div className="glass-card p-6">
              <div className="space-y-5">
                {/* Pet Name */}
                <div>
                  <label className="text-sm font-semibold text-text-secondary mb-2 block">Pet Name <span className="text-accent-coral">*</span></label>
                  <input
                    type="text"
                    value={petDetails.name}
                    onChange={(e) => setPetDetails(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g., Bruno"
                    className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors"
                    id="pet-name-input"
                  />
                </div>

                {/* Breed & Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-text-secondary mb-2 block">Breed <span className="text-accent-coral">*</span></label>
                    <input
                      type="text"
                      value={petDetails.breed}
                      onChange={(e) => setPetDetails(p => ({ ...p, breed: e.target.value }))}
                      placeholder="e.g., Golden Retriever"
                      className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors"
                      id="pet-breed-input"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-secondary mb-2 block">Weight (kg)</label>
                    <input
                      type="number"
                      value={petDetails.weight}
                      onChange={(e) => setPetDetails(p => ({ ...p, weight: e.target.value }))}
                      placeholder="e.g., 25"
                      className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors"
                      id="pet-weight-input"
                    />
                  </div>
                </div>

                {/* Parent Phone */}
                <div>
                  <label className="text-sm font-semibold text-text-secondary mb-2 block flex items-center gap-1">
                    <Phone size={14} /> Parent&apos;s Phone Number <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="tel"
                    value={petDetails.parentPhone}
                    onChange={(e) => setPetDetails(p => ({ ...p, parentPhone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-amber/50 transition-colors"
                    id="parent-phone-input"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-glass-border/30" />

                {/* Pet Behaviour Checkboxes */}
                <div>
                  <label className="text-sm font-bold text-text-primary mb-3 block">Pet Behaviour & Health</label>
                  <div className="space-y-3">
                    {[
                      { key: 'isFriendly' as const, label: 'My pet is friendly with other animals and people', icon: Heart, color: 'text-accent-emerald' },
                      { key: 'hasInjuries' as const, label: 'My pet has existing injuries or wounds', icon: AlertTriangle, color: 'text-accent-coral' },
                      { key: 'hasAllergies' as const, label: 'My pet has known allergies (skin, food, etc.)', icon: AlertTriangle, color: 'text-accent-amber' },
                      { key: 'isVaccinated' as const, label: 'My pet is up to date on vaccinations', icon: ShieldCheck, color: 'text-accent-emerald' },
                      { key: 'firstGrooming' as const, label: 'This is my pet\'s first grooming session', icon: Scissors, color: 'text-accent-violet' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <label
                          key={item.key}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all ${
                            petChecks[item.key]
                              ? 'bg-white/5 border border-white/15'
                              : 'bg-bg-tertiary border border-transparent hover:border-glass-border'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={petChecks[item.key]}
                            onChange={(e) => setPetChecks(p => ({ ...p, [item.key]: e.target.checked }))}
                            className="hidden"
                          />
                          <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all flex-shrink-0 ${
                            petChecks[item.key]
                              ? 'bg-accent-amber border-accent-amber'
                              : 'border-text-muted'
                          }`}>
                            {petChecks[item.key] && <Check size={12} className="text-bg-primary" />}
                          </div>
                          <Icon size={16} className={`${item.color} flex-shrink-0`} />
                          <span className="text-sm text-text-secondary">{item.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-glass-border/30" />

                {/* Terms & Conditions */}
                <label className={`flex items-start gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all ${
                  acceptedTerms
                    ? 'bg-accent-emerald/10 border border-accent-emerald/30'
                    : 'bg-bg-tertiary border border-transparent hover:border-glass-border'
                }`}>
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="hidden"
                    id="terms-checkbox"
                  />
                  <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all flex-shrink-0 mt-0.5 ${
                    acceptedTerms
                      ? 'bg-accent-emerald border-accent-emerald'
                      : 'border-text-muted'
                  }`}>
                    {acceptedTerms && <Check size={12} className="text-bg-primary" />}
                  </div>
                  <span className="text-sm text-text-secondary leading-relaxed">
                    I accept the <span className="text-accent-amber font-semibold underline cursor-pointer">Terms & Conditions</span> and acknowledge that Guardians of Paws is not liable for pre-existing health conditions not disclosed above.
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setStep('confirm')}
              disabled={!canProceedToConfirm || !acceptedTerms}
              className="gradient-btn w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
              id="proceed-to-confirm"
            >
              <span className="flex items-center justify-center gap-2">
                Review Booking <ArrowRight size={16} />
              </span>
            </button>
          </div>
        )}

        {/* Step 4: Confirm & Pay */}
        {step === 'confirm' && selectedPackage && selectedSlot && selectedDate && (
          <div className="animate-fade-up" id="grooming-confirm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Confirm & Pay</h2>
              <button onClick={() => setStep('details')} className="text-sm text-text-muted hover:text-text-primary">← Back</button>
            </div>

            <div className="glass-card p-6 mb-6">
              <h3 className="font-bold mb-4 text-lg">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Package</span>
                  <span className="font-semibold">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Date</span>
                  <span className="font-semibold">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Time</span>
                  <span className="font-semibold">{selectedSlot.label}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Pet</span>
                  <span className="font-semibold">{petDetails.name} ({petDetails.breed})</span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Phone</span>
                  <span className="font-semibold">{petDetails.parentPhone}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-text-secondary font-medium">Total</span>
                  <span className="text-xl font-bold gradient-text">₹{selectedPackage.price}</span>
                </div>
              </div>
            </div>

            {/* Loyalty reminder */}
            <div className="glass-card p-4 mb-6 flex items-start gap-3 border-accent-amber/20">
              <Gift size={20} className="text-accent-amber flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                Remember — every 10th bath gets you <span className="font-bold text-accent-emerald">50% OFF</span>! Keep grooming and keep saving.
              </p>
            </div>

            <div className="glass-card p-4 mb-6 flex items-start gap-3">
              <Dog size={20} className="text-accent-amber flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                After payment, you&apos;ll get access to the <span className="font-semibold text-accent-amber">BBMP Pet Vault</span> to upload vaccination and registration documents for compliance tracking.
              </p>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="gradient-btn w-full text-lg"
              id="pay-now-button"
            >
              <span className="flex items-center justify-center gap-2">
                Pay ₹{selectedPackage.price} via Razorpay
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
