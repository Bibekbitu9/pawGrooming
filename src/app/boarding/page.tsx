'use client';

import { useState } from 'react';
import { BedDouble, Clock, Calendar, Sun, Moon, ArrowRight, Check, Dog, Sunrise, Sunset } from 'lucide-react';
import { generateBoardingShifts, getAvailableDates, formatDate } from '@/lib/slot-engine';
import type { BoardingShift } from '@/lib/slot-engine';

const boardingPrices: Record<string, number> = {
  shift1: 899,
  shift2: 899,
  fullday: 1799,
};

const shiftIcons: Record<string, typeof Sun> = {
  shift1: Sunrise,
  shift2: Sunset,
  fullday: Sun,
};

const shiftColors: Record<string, string> = {
  shift1: 'text-accent-amber',
  shift2: 'text-accent-violet',
  fullday: 'text-accent-emerald',
};

const shiftBg: Record<string, string> = {
  shift1: 'bg-accent-amber/10',
  shift2: 'bg-accent-violet/10',
  fullday: 'bg-accent-emerald/10',
};

export default function BoardingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShift, setSelectedShift] = useState<BoardingShift | null>(null);
  const [step, setStep] = useState<'select' | 'details' | 'confirm'>('select');
  const [petDetails, setPetDetails] = useState({ name: '', breed: '', weight: '', food: '', instructions: '' });

  const availableDates = getAvailableDates(14);
  const shifts = selectedDate ? generateBoardingShifts(selectedDate) : [];

  const handleProceedToPayment = () => {
    // TODO: Integrate Razorpay
    alert(`Boarding booked (stub)!\n\nShift: ${selectedShift?.label}\nDate: ${selectedDate ? formatDate(selectedDate) : ''}\nPet: ${petDetails.name}\nAmount: ₹${selectedShift ? boardingPrices[selectedShift.shiftType] : 0}`);
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-violet/10 px-4 py-2 border border-accent-violet/20">
            <BedDouble size={16} className="text-accent-violet" />
            <span className="text-sm font-medium text-accent-violet">Luxury Boarding</span>
          </div>
          <h1 className="text-3xl font-bold md:text-5xl mb-3">
            A Home Away From <span className="gradient-text">Home</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Climate-controlled suites, webcam access, dedicated playtime, and premium meals. Your pet&apos;s comfort is our commitment.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {['Choose', 'Pet Info', 'Confirm'].map((s, i) => {
            const stepKeys = ['select', 'details', 'confirm'];
            const currentIdx = stepKeys.indexOf(step);
            const isActive = i === currentIdx;
            const isDone = i < currentIdx;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isDone ? 'bg-accent-emerald text-bg-primary' :
                  isActive ? 'bg-accent-violet text-bg-primary' :
                  'bg-bg-tertiary text-text-muted'
                }`}>
                  {isDone ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${isActive ? 'text-text-primary' : 'text-text-muted'}`}>{s}</span>
                {i < 2 && <div className={`h-px w-8 sm:w-12 ${isDone ? 'bg-accent-emerald' : 'bg-bg-tertiary'}`} />}
              </div>
            );
          })}
        </div>

        {/* Step 1: Date & Shift */}
        {step === 'select' && (
          <div className="animate-fade-up" id="boarding-select">
            {/* Date picker */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                <Calendar size={14} /> Select Check-in Date
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {availableDates.map((date) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => { setSelectedDate(date); setSelectedShift(null); }}
                      className={`flex-shrink-0 rounded-2xl px-5 py-3 text-center transition-all ${
                        isSelected
                          ? 'bg-accent-violet/15 border-2 border-accent-violet/50 text-accent-violet'
                          : 'glass-card hover:border-accent-violet/20'
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

            {/* Shift Selection */}
            {selectedDate && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                  <Clock size={14} /> Choose Boarding Shift — {formatDate(selectedDate)}
                </h3>
                <div className="grid gap-4 md:grid-cols-3" id="boarding-shift-grid">
                  {shifts.map((shift) => {
                    const isSelected = selectedShift?.id === shift.id;
                    const Icon = shiftIcons[shift.shiftType];
                    return (
                      <button
                        key={shift.id}
                        onClick={() => setSelectedShift(shift)}
                        className={`glass-card-hover p-6 text-left relative transition-all ${
                          isSelected ? 'border-accent-violet/50 bg-accent-violet/5' : ''
                        }`}
                        id={`shift-${shift.shiftType}`}
                      >
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${shiftBg[shift.shiftType]}`}>
                          <Icon size={24} className={shiftColors[shift.shiftType]} />
                        </div>
                        <h4 className="font-bold text-lg mb-1">{shift.label}</h4>
                        <p className="text-sm text-text-secondary mb-1">{shift.description}</p>
                        <p className="text-xs text-text-muted mb-4">{shift.duration}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold gradient-text">₹{boardingPrices[shift.shiftType]}</span>
                          {isSelected && <Check size={18} className="text-accent-emerald" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Timeline visualization */}
                <div className="mt-6 glass-card p-4">
                  <h4 className="text-xs font-semibold text-text-muted mb-3">Daily Schedule</h4>
                  <div className="relative h-8 rounded-full bg-bg-tertiary overflow-hidden">
                    {/* Night overlay */}
                    <div className="absolute left-0 top-0 h-full w-[33.3%] bg-accent-sky/10 rounded-l-full" />
                    {/* Shift 1 */}
                    <div className="absolute left-[33.3%] top-0 h-full w-[20.8%] bg-accent-amber/20 border-x border-accent-amber/30" />
                    {/* Gap */}
                    <div className="absolute left-[54.1%] top-0 h-full w-[4.2%] bg-accent-coral/10" />
                    {/* Shift 2 */}
                    <div className="absolute left-[58.3%] top-0 h-full w-[20.8%] bg-accent-violet/20 border-x border-accent-violet/30" />
                    {/* Night */}
                    <div className="absolute right-0 top-0 h-full w-[20.9%] bg-accent-sky/10 rounded-r-full" />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-text-muted">
                    <span>12 AM</span>
                    <span>8 AM</span>
                    <span>1 PM</span>
                    <span>2 PM</span>
                    <span>7 PM</span>
                    <span>12 AM</span>
                  </div>
                </div>
              </div>
            )}

            {selectedShift && (
              <button
                onClick={() => setStep('details')}
                className="gradient-btn w-full"
                id="boarding-proceed-details"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue <ArrowRight size={16} />
                </span>
              </button>
            )}
          </div>
        )}

        {/* Step 2: Pet Details */}
        {step === 'details' && (
          <div className="animate-fade-up" id="boarding-details">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Pet&apos;s Info</h2>
              <button onClick={() => setStep('select')} className="text-sm text-text-muted hover:text-text-primary">← Back</button>
            </div>

            <div className="glass-card p-6">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-text-secondary mb-2 block">Pet Name</label>
                  <input
                    type="text"
                    value={petDetails.name}
                    onChange={(e) => setPetDetails(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g., Bruno"
                    className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-violet/50 transition-colors"
                    id="boarding-pet-name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-text-secondary mb-2 block">Breed</label>
                    <input
                      type="text"
                      value={petDetails.breed}
                      onChange={(e) => setPetDetails(p => ({ ...p, breed: e.target.value }))}
                      placeholder="e.g., Labrador"
                      className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-violet/50 transition-colors"
                      id="boarding-pet-breed"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-secondary mb-2 block">Weight (kg)</label>
                    <input
                      type="number"
                      value={petDetails.weight}
                      onChange={(e) => setPetDetails(p => ({ ...p, weight: e.target.value }))}
                      placeholder="e.g., 30"
                      className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-violet/50 transition-colors"
                      id="boarding-pet-weight"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-text-secondary mb-2 block">Food & Diet Preferences</label>
                  <input
                    type="text"
                    value={petDetails.food}
                    onChange={(e) => setPetDetails(p => ({ ...p, food: e.target.value }))}
                    placeholder="e.g., Royal Canin Adult, 2 cups/meal"
                    className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-violet/50 transition-colors"
                    id="boarding-pet-food"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-text-secondary mb-2 block">Special Instructions</label>
                  <textarea
                    value={petDetails.instructions}
                    onChange={(e) => setPetDetails(p => ({ ...p, instructions: e.target.value }))}
                    placeholder="Medications, anxiety notes, favorite toys..."
                    rows={3}
                    className="w-full rounded-xl bg-bg-tertiary px-4 py-3 text-text-primary placeholder:text-text-muted outline-none border border-glass-border focus:border-accent-violet/50 transition-colors resize-none"
                    id="boarding-pet-instructions"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('confirm')}
              disabled={!petDetails.name || !petDetails.breed}
              className="gradient-btn w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
              id="boarding-proceed-confirm"
            >
              <span className="flex items-center justify-center gap-2">
                Review Booking <ArrowRight size={16} />
              </span>
            </button>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && selectedShift && selectedDate && (
          <div className="animate-fade-up" id="boarding-confirm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Confirm & Pay</h2>
              <button onClick={() => setStep('details')} className="text-sm text-text-muted hover:text-text-primary">← Back</button>
            </div>

            <div className="glass-card p-6 mb-6">
              <h3 className="font-bold mb-4 text-lg">Boarding Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Shift</span>
                  <span className="font-semibold">{selectedShift.label}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Schedule</span>
                  <span className="font-semibold">{selectedShift.description}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Date</span>
                  <span className="font-semibold">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border/20">
                  <span className="text-text-secondary">Pet</span>
                  <span className="font-semibold">{petDetails.name} ({petDetails.breed})</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-text-secondary font-medium">Total</span>
                  <span className="text-xl font-bold gradient-text">₹{boardingPrices[selectedShift.shiftType]}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 mb-6 flex items-start gap-3">
              <Moon size={20} className="text-accent-violet flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                Your pet will enjoy a climate-controlled suite with webcam access. You&apos;ll receive real-time
                <span className="font-semibold text-accent-amber"> Pupdates</span> on WhatsApp with photos and behavior notes.
              </p>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="gradient-btn w-full text-lg"
              id="boarding-pay-button"
            >
              <span className="flex items-center justify-center gap-2">
                Pay ₹{boardingPrices[selectedShift.shiftType]} via Razorpay
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
